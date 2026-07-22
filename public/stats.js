// Live stats fetcher — pulls public data from GitHub + LeetCode.
// Each fetch resolves to either {ok:true, data} or {ok:false}.
// Exposed as window.VarshithStats.

(function () {
  const GITHUB = 'Varshith07827';
  const LEETCODE = 'QJxTr21cFq';
  const CODECHEF = 'vince7827';

  const STATIC_FALLBACK = {
    github: { repos: 35, followers: 48, name: 'Varshith Sandaka', bio: 'IIT Madras • Building & Competing', avatar: null, stars: 0 },
    leetcode: { totalSolved: 353, easySolved: 199, mediumSolved: 117, hardSolved: 37, ranking: 0, rating: 1679 },
    codechef: { stars: 5, rating: 1964, highest: 2192 },
    linkedin: { followers: 1727 },
    aggregate: { problems: 4503, hackathons: 10, projects: 15, certs: 17 }
  };

  async function fetchJSON(url, timeoutMs = 6000) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const r = await fetch(url, { signal: ctrl.signal });
      clearTimeout(t);
      if (!r.ok) throw new Error('http ' + r.status);
      return await r.json();
    } catch (e) {
      clearTimeout(t);
      throw e;
    }
  }

  async function github() {
    try {
      const u = await fetchJSON(`https://api.github.com/users/${GITHUB}`);
      let stars = 0;
      try {
        const repos = await fetchJSON(`https://api.github.com/users/${GITHUB}/repos?per_page=100`);
        if (Array.isArray(repos)) stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
      } catch (_) {}
      return {
        ok: true,
        data: {
          repos: u.public_repos || 0,
          followers: u.followers || 0,
          following: u.following || 0,
          name: u.name || 'Varshith',
          bio: u.bio || '',
          avatar: u.avatar_url || null,
          stars,
          createdAt: u.created_at,
        }
      };
    } catch (e) {
      return { ok: false, data: STATIC_FALLBACK.github };
    }
  }

  async function leetcode() {
    // Try a couple of community APIs; fall back gracefully.
    const endpoints = [
      `https://leetcode-stats-api.herokuapp.com/${LEETCODE}`,
      `https://alfa-leetcode-api.onrender.com/${LEETCODE}/solved`,
    ];
    for (const url of endpoints) {
      try {
        const d = await fetchJSON(url, 5000);
        if (d && (d.totalSolved || d.solvedProblem)) {
          return {
            ok: true,
            data: {
              totalSolved: d.totalSolved || d.solvedProblem || 0,
              easySolved: d.easySolved || d.easySolved || 0,
              mediumSolved: d.mediumSolved || 0,
              hardSolved: d.hardSolved || 0,
              ranking: d.ranking || 0,
              rating: STATIC_FALLBACK.leetcode.rating,
            }
          };
        }
      } catch (_) { /* try next */ }
    }
    return { ok: false, data: STATIC_FALLBACK.leetcode };
  }

  async function codechef() {
    try {
      const d = await fetchJSON(`https://codechef-api.vercel.app/handle/${CODECHEF}`, 5000);
      if (d && d.currentRating) {
        return {
          ok: true,
          data: {
            rating: d.currentRating,
            highest: d.highestRating || d.currentRating,
            stars: d.stars ? parseInt(String(d.stars).replace(/[^0-9]/g, '')) || 3 : 3,
          }
        };
      }
    } catch (_) {}
    return { ok: false, data: STATIC_FALLBACK.codechef };
  }

  async function loadAll() {
    const [g, l, c] = await Promise.all([github(), leetcode(), codechef()]);
    const total = (l.data.totalSolved || 0);
    return {
      github: g.data, github_live: g.ok,
      leetcode: l.data, leetcode_live: l.ok,
      codechef: c.data, codechef_live: c.ok,
      linkedin: STATIC_FALLBACK.linkedin,
      aggregate: {
        ...STATIC_FALLBACK.aggregate,
        problems: Math.max(total + 280, STATIC_FALLBACK.aggregate.problems),
      }
    };
  }

  window.VarshithStats = { loadAll, github, leetcode, codechef, fallback: STATIC_FALLBACK };
})();
