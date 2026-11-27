---
name: weekly-roundup
description: Research, write, check and publish the Sunday Disneyland news roundup for rideornaptime.com end to end (MDX post, ticker JSON, ride statuses, review log, PR with auto-merge). Use when asked to run or publish the weekly roundup.
---

# Weekly roundup (Sundays)

You are publishing this week's "Disneyland News for Families" roundup with no human in the loop. Auto-merge ships whatever passes CI, so accuracy is your job, not a reviewer's. When in doubt, leave it out and flag it for Ashu.

Run date = today in America/Los_Angeles (`TZ=America/Los_Angeles date +%F`). Call it `RUN_DATE`. The week covered is the 7 days ending today plus anything already announced for the next 2 to 3 weeks.

## 0. Setup

```bash
git fetch origin main && git checkout -B auto/news-$RUN_DATE origin/main
npm ci
```

Check for open automated PRs first: `gh pr list --state open --search "head:auto/"`. If last week's roundup PR is still open, do not touch it. Note it in your final summary and continue.

Read before writing:

- `content/news/README.md` (format) and the three most recent posts in `content/news/posts/` (voice, what's already been said, open threads in "What We're Watching").
- `content/news/weekly-news.json`.
- The `RIDES` array in `src/lib/content.ts` (current statuses you may need to flip).
- `content/review-log.json`, last two runs (what the Monday audit found).

## 1. Research

Use web search and fetch. Cover: ride closures, refurbs and reopenings; new or ending shows, parades, seasonal events; character meet changes; Lightning Lane price or rule changes; park hours; ticket prices, deals, Magic Key; food openings and seasonal menus; crowd outlook for the next 2 to 3 weeks; anything Downtown Disney or hotel related that affects families.

Source standard (this is what replaces human review):

- **Publish a fact** only if it's on an official Disney source (disneyland.disney.go.com, disneyparks.disney.go.com/blog, Disneyland press releases) or confirmed by **two independent** reputable outlets (OC Register, LA Times, Disneyland News Today, MiceChat, Touring Plans, WDWNT/DLR coverage, etc.).
- **It must be Disneyland Resort, Anaheim.** Walt Disney World, Paris, Tokyo and cruise news get mixed into search results constantly. A past roundup reported the Magic Kingdom Tiana's reopening as a Disneyland event. Check the park name on every source.
- **Dates and prices** must match the source exactly. Never round, never guess a year.
- Single-source items or rumors go only in "What We're Watching", explicitly labeled as unconfirmed, or get skipped.
- If you find an error in a previous roundup, open the post with a `## ✍️ Corrections From Prior Roundups` section (see `2026-11-10.mdx`) and fix the old post's text only if the error could mislead a family planning now (do not change its slug or date).

Keep a list of every URL you relied on. You need it for the PR and the review log.

## 2. Write the post

File: `content/news/posts/$RUN_DATE.mdx`. Frontmatter exactly:

```yaml
---
title: 'Disneyland News for Families — Week of <Month D, YYYY>'
slug: 'disneyland-news-families-week-of-<month>-<d>-<yyyy>'
date: '<RUN_DATE>'
description: '<one or two sentences, under 300 chars, leads with the top story, ends with "What this week''s Disneyland news means if you''re visiting with young kids.">'
heroImage: '/images/news/<RUN_DATE>.jpg'
---
```

`Week of` uses today's Sunday date. Escape apostrophes in single-quoted YAML by doubling them, or use double quotes like recent posts.

Structure:

1. Intro paragraph, direct voice. **Lead with the single most family-relevant story**, not an equal-weight list.
2. `## 🚨 Trip-Planning Impact`: what changes for families booking or already booked. Bold lead sentence per item.
3. `## 🎢 Ride Status This Week`: markdown table, columns `Ride | Status | What Parents Should Know`. Every row must have exactly 3 cells. Only rides with something worth saying.
4. A seasonal section when relevant (e.g. `## 🎄 Holidays Season: ...`).
5. `## 🍿 Food Worth Knowing`
6. `## 💰 Deals & Tickets` with `<AffiliateCTA partner="getawaytoday" campaign="news_YYYY_MM_DD" />` placed where it fits. Mention promo code RIDETIME only if Get Away Today still honors it.
7. `## 👀 What We're Watching`
8. `---` then a closing line linking 1 to 3 relevant site pages (`/itineraries`, `/lightning-lane`, `/rides`, `/characters`, etc.).

Voice rules: written by a dad of two young girls for tired parents scanning on phones. Opinionated and specific ("skip with kids under 6", "works for kids 2+", wait times, heights in inches). Never use "magical". No influencer gush, no filler, no "in this post". Target 1,000 to 1,600 words. Markdown only. The only allowed JSX is `<AffiliateCTA ... />` and `<TicketsCTA location="..." />`, self-closing. No H1 (`#`) in the body, no HTML, no inline styles.

Do not invent firsthand experience ("we rode it last weekend"). If a story would be much better with Ashu's own experience, write it factually and add it to the needs-Ashu list.

## 3. Ticker

Update `content/news/weekly-news.json`: `weekOf` = RUN_DATE, `lastUpdated` = current UTC ISO time with `Z`, `currentPostSlug` = new slug, and exactly 5 `ticker` items (ids "1" to "5", priorities 1 to 5 with 1 = lead story, headlines under ~80 chars with no trailing period, links `/news/<slug>`, short emoji tag like existing ones).

## 4. Ride statuses

If research confirms a status change for a ride in `RIDES` (`src/lib/content.ts`), update that ride's fields and set `RIDES_LAST_REVIEWED` to RUN_DATE. Factual edits only. Do not change verdicts, ratings or takes. Do the same for `characters.ts` / `CHARACTERS_LAST_REVIEWED` only for a confirmed change you reported in the post. Any date bump needs a matching review-log entry (next step).

## 5. Review log

Append one entry to `content/review-log.json` `runs`:

```json
{
  "date": "<RUN_DATE>",
  "job": "weekly-roundup",
  "post": "content/news/posts/<RUN_DATE>.mdx",
  "pagesReviewed": [
    { "page": "/news/<slug>", "sources": ["https://..."] },
    { "page": "/rides", "dateField": "RIDES_LAST_REVIEWED", "sources": ["https://..."] }
  ],
  "changes": ["Short plain-English line per change"],
  "needsAshu": ["Items you could not verify, or firsthand notes worth adding"]
}
```

Only include `/rides` (or `/characters`) if you actually edited and bumped them.

## 6. Check locally

```bash
npm run qa:format:fix
AUTOMATION=1 npm run qa:content
npm run qa:types
npm run qa:lint
```

Fix every FAIL. Warnings about missing heroImage files are known and fine. `npm run build` may fail in your sandbox only because Google Fonts is unreachable. CI runs the real build, so don't fight that.

## 7. Publish

```bash
git add content/ src/lib/content.ts src/data/
git commit -m "news: weekly roundup for week of <Month D, YYYY>"
git push -u origin auto/news-$RUN_DATE
gh pr create --base main --title "news: weekly roundup, week of <Month D, YYYY>" --body-file <body.md>
gh pr merge --auto --squash --delete-branch
gh pr checks --watch
```

PR body: 3 to 5 line summary of the lead stories, the ride/character data changes, the source list, and the needs-Ashu list.

If checks fail: read `gh run view --log-failed`, fix, push. Up to two fix attempts. If it still fails, or the fix would require touching a locked file, stop: `gh pr merge --disable-auto`, add label `needs-ashu` (create it if missing), comment what failed, and say so in your final message.

## 8. Needs-Ashu inbox

If you have any needs-Ashu items, add a comment to the open issue titled "Needs Ashu" (create it once if it doesn't exist, label `needs-ashu`) with the date, the post link, and the items as checkboxes.

## 9. Final message

End with a short summary for Ashu's phone: published or not, the lead story, data changes, and needs-Ashu items. Nothing else.
