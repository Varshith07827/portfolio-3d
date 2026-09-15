# portfolio-3d

Personal portfolio for Venkata Sai Varshith — AI / Systems / Automation.

Plain static HTML/CSS/JS, no build step:

- [`index.html`](index.html) — home page: intro, six selected projects, experience, stack, competitive-programming stats, about, contact.
- [`case.html`](case.html) — case-study page for each project, rendered client-side from a `PROJECTS` array based on the URL hash (e.g. `case.html#digitwin`).
- [`assets/`](assets) — project screenshots and placeholder cover images (used where a real screenshot isn't available yet — swap the file in `assets/` and the `image` field in `case.html` once one is).

## Running locally

No build tooling required — serve the folder with any static file server, e.g.

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deployment

Served via GitHub Pages from the `main` branch. Custom domain configured through the `CNAME` file.
