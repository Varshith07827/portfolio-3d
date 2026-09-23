// Pulls live LeetCode + CodeChef numbers and writes them to assets/stats.json.
// Run by .github/workflows/update-stats.yml on a schedule; safe to run locally too.
const fs = require("fs");
const path = require("path");

const LEETCODE_USERNAME = "Vince7827";
const CODECHEF_USERNAME = "vince7827";
const OUT_PATH = path.join(__dirname, "..", "assets", "stats.json");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// CodeChef's public star bands (codechef.com/ratings) — used instead of
// scraping the star icons, which are rendered as image spans with no clean marker.
function starsForRating(rating) {
  if (rating >= 2500) return 7;
  if (rating >= 2200) return 6;
  if (rating >= 2000) return 5;
  if (rating >= 1800) return 4;
  if (rating >= 1600) return 3;
  if (rating >= 1400) return 2;
  return 1;
}

async function fetchLeetCode() {
  const statsQuery = {
    query: `query userProfile($username: String!) {
      matchedUser(username: $username) {
        submitStatsGlobal { acSubmissionNum { difficulty count } }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        topPercentage
      }
    }`,
    variables: { username: LEETCODE_USERNAME },
  };

  const historyQuery = {
    query: `query history($username: String!) {
      userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        contest { title startTime }
      }
    }`,
    variables: { username: LEETCODE_USERNAME },
  };

  const [statsRes, historyRes] = await Promise.all([
    fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": UA },
      body: JSON.stringify(statsQuery),
    }),
    fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": UA },
      body: JSON.stringify(historyQuery),
    }),
  ]);

  const stats = await statsRes.json();
  const history = await historyRes.json();

  if (stats.errors || !stats.data.matchedUser) {
    throw new Error(`LeetCode stats query failed: ${JSON.stringify(stats.errors)}`);
  }

  const counts = {};
  for (const { difficulty, count } of stats.data.matchedUser.submitStatsGlobal.acSubmissionNum) {
    counts[difficulty.toLowerCase()] = count;
  }

  const attended = (history.data?.userContestRankingHistory || []).filter((h) => h.attended);
  const maxRating = attended.length
    ? Math.max(...attended.map((h) => h.rating))
    : stats.data.userContestRanking?.rating ?? null;
  const last = attended[attended.length - 1];

  return {
    username: LEETCODE_USERNAME,
    totalSolved: counts.all ?? null,
    easySolved: counts.easy ?? null,
    mediumSolved: counts.medium ?? null,
    hardSolved: counts.hard ?? null,
    contestRating: stats.data.userContestRanking ? Math.round(stats.data.userContestRanking.rating) : null,
    maxContestRating: maxRating !== null ? Math.round(maxRating) : null,
    contestsAttended: stats.data.userContestRanking?.attendedContestsCount ?? attended.length,
    topPercentage: stats.data.userContestRanking?.topPercentage ?? null,
    mostRecentContest: last
      ? {
          title: last.contest.title,
          date: new Date(last.contest.startTime * 1000).toISOString().slice(0, 10),
          rank: last.ranking,
        }
      : null,
  };
}

async function fetchCodeChef() {
  const res = await fetch(`https://www.codechef.com/users/${CODECHEF_USERNAME}`, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) throw new Error(`CodeChef profile fetch failed: HTTP ${res.status}`);
  const html = await res.text();

  // The profile's rating history is embedded as a JSON object passed to
  // jQuery.extend(Drupal.settings, {...}); brace-match it out rather than
  // regexing individual fields, since the surrounding markup is unescaped.
  const marker = "jQuery.extend(Drupal.settings, ";
  const startIdx = html.indexOf(marker);
  if (startIdx === -1) throw new Error("CodeChef page layout changed: Drupal.settings block not found");
  const braceStart = html.indexOf("{", startIdx);
  let depth = 0;
  let endIdx = -1;
  for (let i = braceStart; i < html.length; i++) {
    if (html[i] === "{") depth++;
    else if (html[i] === "}") {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }
  if (endIdx === -1) throw new Error("CodeChef page layout changed: could not parse Drupal.settings block");
  const settings = JSON.parse(html.slice(braceStart, endIdx));

  const history = settings.date_versus_rating?.all || [];
  const ratings = history.map((h) => parseInt(h.rating, 10)).filter((n) => !Number.isNaN(n));
  const currentRating = ratings.length ? ratings[ratings.length - 1] : null;
  const highestRating = ratings.length ? Math.max(...ratings) : null;
  const last = history[history.length - 1];

  const globalRankMatch = html.match(/class=['"]global-rank['"]>(\d+)</);

  return {
    username: CODECHEF_USERNAME,
    currentRating,
    highestRating,
    stars: currentRating !== null ? starsForRating(currentRating) : null,
    contestsAttended: history.length,
    globalRank: globalRankMatch ? parseInt(globalRankMatch[1], 10) : null,
    mostRecentContest: last
      ? {
          title: last.name,
          date: `${last.getyear}-${String(last.getmonth).padStart(2, "0")}-${String(last.getday).padStart(2, "0")}`,
          rank: parseInt(last.rank, 10),
        }
      : null,
  };
}

async function main() {
  const [leetcode, codechef] = await Promise.all([fetchLeetCode(), fetchCodeChef()]);

  const out = {
    generatedAt: new Date().toISOString(),
    leetcode,
    codechef,
  };

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`Wrote ${OUT_PATH}`);
  console.log(JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
