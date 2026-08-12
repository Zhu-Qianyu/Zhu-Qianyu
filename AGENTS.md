# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static personal academic portfolio site (Vue 3 + Vite). No backend, database, lint, or test tooling is configured.

- Dependencies are installed automatically by the update script (`npm ci`). Node 22 is expected (matches CI in `.github/workflows/deploy.yml`).
- Run the dev server with `npm run dev` (Vite, serves at `http://localhost:5173/`, base path `/`). Use this for local development and end-to-end manual testing.
- Production build: `npm run build` (outputs to `dist/`). Note the build sets `base: '/Zhu-Qianyu/'` (see `vite.config.js`), so the built site is served under that subpath. `npm run preview` serves the built output at `http://localhost:4173/Zhu-Qianyu/`.
- All site content (bilingual EN/中文) is static and lives in `src/data/profile.js`; the entire UI is in `src/App.vue`. There is no API to run.
- No lint or test scripts exist; CI only runs install + build + deploy to GitHub Pages.
