---
name: content-audit
description: Monday fact-check and refresh of rideornaptime.com pages against current Disneyland news. Rides, Characters and Itineraries every week, plus a rotating pair of other pages; updates review dates and the review log, then opens an auto-merging PR. Use when asked to run the content audit.
---

# Content audit (Mondays)

You are checking the site's evergreen pages against what's true at Disneyland Resort today, fixing what's out of date, and stamping the review dates. Nobody reviews this PR before it ships. The rule is the same as the weekly roundup: if you can't confirm it, don't publish it, flag it.

Run date = `TZ=America/Los_Angeles date +%F` (`RUN_DATE`).

## 0. Setup

```bash
git fetch origin main && git checkout -B auto/audit-$RUN_DATE origin/main
npm ci
```

Read: `CLAUDE.md`, the latest 2 posts in `content/news/posts/` (fresh facts you can reuse, already sourced), and the last 3 entries in `content/review-log.json` (what was checked recently and what's still open).

## 1. Scope this week

**Every week (the best-performing pages; protect them):**

| Page                            | Data                                                                           | Date field                                   |
| ------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------- |
| `/rides`                        | `RIDES` in `src/lib/content.ts`, `src/app/rides/page.tsx`                      | `RIDES_LAST_REVIEWED` (content.ts)           |
| `/characters`                   | `src/data/characters.ts`, `src/app/characters/page.tsx`                        | `CHARACTERS_LAST_REVIEWED` (characters.ts)   |
| `/itineraries` + its sub-routes | `dayTemplates` in `src/data/itineraries.ts`, `src/app/itineraries/**/page.tsx` | `ITINERARIES_LAST_REVIEWED` (itineraries.ts) |

**Rotation**: pick the pair by ISO week number mod 5 (`date +%V`):

| mod 5 | Pages                                                                                                         |
| ----- | ------------------------------------------------------------------------------------------------------------- |
| 0     | `/lightning-lane`, `/saving-money`                                                                            |
| 1     | `/food` (`FOOD_SPOTS`), `/packing-list` (`PACKING_LIST`)                                                      |
| 2     | `/seasonal` (`EVENTS_2026`, `SEASONS`, date `SEASONAL_LAST_REVIEWED`), `/holidays` (`HOLIDAYS_LAST_REVIEWED`) |
| 3     | `/first-visit`, `/fireworks`                                                                                  |
| 4     | `/hidden-gems`, `/best-strollers`, `/bluey-at-disneyland` (`BLUEY_LAST_REVIEWED` in its page)                 |

During Oct to early Jan, also check `/holidays` and `/seasonal` every week, since that's when they change fastest.

## 2. What to check

For each page in scope, read the page and its data, then verify against current sources:

- Open/closed/refurb status, reopening dates, height requirements, Lightning Lane tier (MP/SP/standby) and prices.
- Character locations, meet times, dining, seasonal appearances, retired or new characters.
- Itinerary blocks that reference closed rides, changed show times, park hours patterns, LL rules, or removed perks. An itinerary that sends a family to a closed ride is the worst error this site can make.
- Prices, dates, deals and promo codes on rotation pages. Expired deals come out.
- Anything phrased "as of <date>" that is now stale.

Source standard: official Disney sources, or two independent reputable outlets. Disneyland Resort in Anaheim only. Watch for Walt Disney World results. Never guess a date or price.

## 3. Edit rules

What CI enforces (it will fail the PR otherwise):

- Only content files: `src/lib/content.ts` data blocks (`RIDES`, `FOOD_SPOTS`, `PACKING_LIST`, `EVENTS_2026`, `SEASONS`, the `*_LAST_REVIEWED` lines), `src/data/characters.ts` (`characters`, land intros), `src/data/itineraries.ts` (`dayTemplates`), `src/app/**/page.tsx` copy, `content/`. Never styling, `globals.css`, layouts, components, config, scripts, privacy or API routes.
- In `.tsx`/`.ts` files: no import or export changes, no `style={{}}`, no new CSS class names. Reuse the markup patterns already on the page when adding an item (copy a sibling element).
- Characters/Rides/Itineraries: 160 changed lines max combined, H1 and metadata title unchanged. These pages rank. Fix facts, don't rewrite.
- Any edit to content covered by a date field requires that date field = RUN_DATE.
- Never use "magical". No placeholders.

What CI can't enforce, so you must:

- On the three protected pages, factual updates only. Don't change verdicts (`age2`..`age8`), ratings, opinions or structure unless the underlying fact changed (a ride closing is a fact; "I think it's overrated" is not your call).
- Don't touch metadata, H1s, FAQ question wording, or JSON-LD on any page. SEO changes are a separate decision.
- Keep the voice: direct, real-parent, specific, ages 2 to 8.
- No invented firsthand experience.
- If a page needs more than a factual fix (thin, structurally outdated, a big new attraction deserves its own section), don't do it. Put it in needs-Ashu with a one-line proposal.

## 4. Stamp the dates

For every page you fully reviewed, set its date field to RUN_DATE **even if nothing changed**. That's the point of the field: it tells families when someone last checked. For pages with no date field, the "last modified" date comes from git and only moves when you edit; that's fine.

Don't stamp a page you only skimmed.

## 5. Review log

Append to `content/review-log.json` `runs`:

```json
{
  "date": "<RUN_DATE>",
  "job": "content-audit",
  "rotation": ["/lightning-lane", "/saving-money"],
  "pagesReviewed": [
    { "page": "/rides", "dateField": "RIDES_LAST_REVIEWED", "sources": ["https://..."] },
    { "page": "/characters", "dateField": "CHARACTERS_LAST_REVIEWED", "sources": ["https://..."] },
    {
      "page": "/itineraries",
      "dateField": "ITINERARIES_LAST_REVIEWED",
      "sources": ["https://..."]
    },
    { "page": "/lightning-lane", "sources": ["https://..."] }
  ],
  "changes": ["Plain-English line per change, with page"],
  "needsAshu": ["Unverified items, firsthand gaps, bigger rewrites worth doing"]
}
```

Every bumped date field must appear as a `dateField` here with at least one source. CI checks this.

## 6. Check, publish, follow through

```bash
npm run qa:format:fix
AUTOMATION=1 npm run qa:content
npm run qa:types
npm run qa:lint
git add -A src content
git commit -m "content: weekly audit $RUN_DATE (<pages>)"
git push -u origin auto/audit-$RUN_DATE
gh pr create --base main --title "content: weekly audit $RUN_DATE" --body-file <body.md>
gh pr merge --auto --squash --delete-branch
gh pr checks --watch
```

`npm run build` may fail locally only because Google Fonts is unreachable from the sandbox; CI builds for real. PR body: changes by page, sources, needs-Ashu list.

If nothing at all needed changing, still open the PR. The date stamps and log entry are the deliverable.

If checks fail: `gh run view --log-failed`, fix, push, up to two attempts. Still failing, or the fix needs a locked file: `gh pr merge --disable-auto`, label `needs-ashu`, comment why, and stop.

Add any needs-Ashu items as a dated comment with checkboxes on the open "Needs Ashu" issue (create it once if missing, label `needs-ashu`).

## 7. Final message

Short summary for Ashu's phone: merged or blocked, what changed by page, needs-Ashu items.
