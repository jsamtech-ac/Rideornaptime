# Weekly Disneyland News — Publish Workflow

This directory powers the homepage news ticker and the `/news/` archive on rideornaptime.com.

## Directory layout

```
content/news/
  weekly-news.json          ← drives the homepage ticker
  posts/
    YYYY-MM-DD.mdx          ← one MDX file per weekly roundup
  README.md                 ← this file
```

## Sunday publishing — three steps

### 1. Write the new post

Create a new MDX file in `content/news/posts/`. **Filename**: `YYYY-MM-DD.mdx` using the Sunday of the week being covered (e.g. `2026-05-11.mdx`).

Frontmatter shape:

```yaml
---
title: 'Disneyland News for Families — Week of May 11, 2026'
slug: 'disneyland-news-families-may-11-2026'
date: '2026-05-11'
description: 'One sentence summary used for SEO and social previews.'
heroImage: '/images/news/2026-05-11.jpg'
---
```

- `slug` is the URL segment — the post will live at `/news/{slug}`.
- `slug` should be unique, lowercase, dash-separated, and stable (don't rename it after publishing).
- `heroImage` is a path under `public/`. If the image isn't ready yet, point at an existing image — it's used for the OG card and JSON-LD.

Body sections we typically include (don't hardcode them — let the week dictate what's worth saying):

- 🚨 **Trip-Planning Impact** — what changes for families booking or already booked
- 🎢 **Ride Status** — closures, refurbs, reopenings, slow-load issues
- 🍿 **Food Worth Knowing** — new menu items, returning favorites, things to skip
- 💰 **Deals & Tickets** — promo codes, price changes, reseller deals
- 👀 **What We're Watching** — soft rumors, upcoming announcements, schedule shifts

You can drop `<AffiliateCTA partner="getawaytoday" campaign="news_YYYY_MM_DD" />` mid-article. Other partners: `undercovertourist`, `amazon`. Anchors are auto-tagged `rel="sponsored noopener" target="_blank"`.

### 2. Update the ticker JSON

Edit `content/news/weekly-news.json`:

- Bump `weekOf` to the new Sunday (`YYYY-MM-DD`)
- Bump `lastUpdated` to the publish moment (ISO 8601 with `Z`, e.g. `2026-05-11T19:30:00Z`)
- Set `currentPostSlug` to the new post's slug
- Replace the `ticker` array with **5 headlines** for the new week, each with:
  - `id` — string, unique within the week
  - `headline` — short, scannable, no period at end
  - `tag` — optional category pill (e.g. "Plan Update", "Ride Status", "Food", "Deal", "Watching")
  - `link` — typically `/news/{currentPostSlug}` (deep-linking to a section is fine)
  - `priority` — 1 (most important) to 5; the ticker sorts ascending

### 3. Commit & push

```bash
git add content/news/
git commit -m "news: weekly roundup for week of May 11, 2026"
git push
```

Vercel auto-deploys on push to `main`. The ticker, the index page, the post page, the sitemap, and the RSS feed all update automatically — nothing else to touch.

---

## Claude Code prompt for Sunday publishing

Paste this into Claude Code each Sunday after gathering your notes for the week:

```
Publish this week's Disneyland news roundup for rideornaptime.com.

Week covered: Sunday <SUNDAY DATE> through Saturday <SATURDAY DATE>.
Target Sunday filename: content/news/posts/<YYYY-MM-DD>.mdx
Target slug: disneyland-news-families-<month>-<day>-<year>

Notes from my week of monitoring (reorder/edit as needed):
- <bullet 1>
- <bullet 2>
- <bullet 3>
- <bullet 4>
- <bullet 5>
…

Tasks:
1. Write the MDX post at content/news/posts/<YYYY-MM-DD>.mdx with the
   frontmatter shape from content/news/README.md and exactly the five
   sections used in 2026-05-04.mdx (Trip-Planning Impact, Ride Status,
   Food Worth Knowing, Deals & Tickets, What We're Watching). Match the
   existing voice — direct, dad-tested, no fluff, opinionated, kid-2-to-8
   focused. Drop one <AffiliateCTA partner="getawaytoday" campaign="news_<YYYYMMDD>" />
   in a section where it fits naturally.
2. Update content/news/weekly-news.json: bump weekOf, lastUpdated,
   currentPostSlug, and replace the ticker array with 5 headlines drawn
   from the post (priority 1 = lead).
3. Show me the diffs. Do not commit.
```
