# Ride or Naptime 🎢

The Disneyland family guide that actually helps. One dense, opinionated page for families with kids ages 2–8.

## Tech Stack

- **Framework:** Next.js 14 (React)
- **Hosting:** Vercel
- **DNS:** Cloudflare
- **Domain:** rideornaptime.com

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

Push to `main` branch — Vercel auto-deploys.

## Project Structure

```
src/
  app/
    layout.tsx    — Root layout + SEO metadata
    page.tsx      — The entire single-page guide (all sections)
    globals.css   — Design system + all styles
```

## Content Sections

1. Age-Based Ride Ratings (ages 2/4/6/8)
2. Hour-by-Hour Itineraries (1-day, 2-day, 3-day)
3. Lightning Lane Strategy
4. Food Guide
5. Packing Checklist (interactive)
6. Seasonal Calendar
7. Money-Saving Tips
8. Parent Survival Tips

## Owner

JSAM Tech LLC — Ashu Chohan
