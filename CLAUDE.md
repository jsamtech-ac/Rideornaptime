# CLAUDE.md

Ride or Naptime (rideornaptime.com) — a content-heavy guide site for visiting
Disneyland with young kids: age-based ride/character verdicts, itineraries,
packing lists, food, and a weekly news roundup.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript (strict) · plain CSS. Package
manager is **npm** (package-lock.json). Deploys to Vercel automatically on push
to `main`.

## Commands (verified)

- `npm run dev` — local dev server on :3000 (not run here).
- `npm run build` — production build. ✅ passes.
- `npm run lint` — `next lint` (ESLint, core-web-vitals + jsx-a11y). ✅ passes clean.
- `npm run qa:types` — `tsc --noEmit` typecheck. ✅ passes.
- `npm run qa:format` — `prettier --check .`. ✅ passes. Use `npm run qa:format:fix` to auto-format.
- `npm run qa` — full pre-push gate (`scripts/qa/run.mjs`): types, lint, format, build, then links/a11y/Lighthouse. The last three (`qa:links`, `qa:a11y`, `qa:lhci`) require a running server on :3000 — not run/verified here.

Tests: **no unit-test runner** (no Jest/Vitest). Only Playwright a11y/E2E in
`tests/qa/a11y.spec.ts`, which needs a live server.

## Layout

- `src/app/` — App Router pages, layouts, route-level `metadata`/`*image` files.
- `src/components/` — flat PascalCase `.tsx` components (incl. `*JsonLd.tsx` SEO schema, `AffiliateLink.tsx`).
- `src/data/` — TS data sources (`rides.ts`, `characters.ts`, `itineraries.ts`).
- `src/lib/` — content loaders/helpers (`content.ts`, `news.ts`, `affiliate.ts`).
- `content/news/posts/*.mdx` — news articles (gray-matter frontmatter); `weekly-news.json` is the ticker.
- `src/app/globals.css` — single global stylesheet.
- `public/` — static images/assets. `scripts/qa/` — QA orchestrator. `tests/qa/` — Playwright specs.

## Conventions & gotchas

- **Do not run `npm run build` while `npm run dev` is running** — it corrupts `.next/` (chunk 404s). Stop dev, `rm -rf .next`, restart.
- Content is file-based: structured TS in `src/data`/`src/lib`, news as MDX. No database.
- Design system is CSS custom properties in `globals.css` (`--sun`, `--sky`, `--space-*`, `--radius-*`); no Tailwind. Fonts via `next/font`.
- Age-keyed data uses `age2/age4/age6/age8` with `Verdict` unions (`'must-do' | 'maybe' | 'skip'`).
- Affiliate links go through `AffiliateLink.tsx`/`AffiliateCTA.tsx`: `rel="sponsored nofollow noopener"`, `target="_blank"`, and a GTM `affiliate_click` dataLayer push. Keep FTC disclosure intact.
- Path alias `@/*` → `src/*`.
- Only env var is `RESEND_API_KEY` (in `.env.local`, uncommitted); GTM/GA IDs are hardcoded in `src/app/layout.tsx`.
- `main` is PR-only; Vercel auto-deploys it. `next.config.js` uses `output: 'standalone'` and redirects www → apex.
