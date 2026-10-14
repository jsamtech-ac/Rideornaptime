import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'
import ItineraryConfigurator, { type DayConfig } from '@/components/ItineraryConfigurator'

const PAGE_FILE = 'src/app/itineraries/disneyland-3-day/page.tsx'
const PAGE_PATH = '/itineraries/disneyland-3-day'

export const metadata: Metadata = {
  title: 'Disneyland 3-Day Itinerary with Kids — Ages 2-8 (2026)',
  description:
    'Three-day Disneyland plan: marquee headliners on day 1, second-tier rides on day 2, re-rides and fireworks on day 3.',
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    url: `${SITE_URL}${PAGE_PATH}`,
    title: 'Disneyland 3-Day Itinerary with Kids — Ages 2-8 (2026)',
    description:
      'Three-day Disneyland family plan: Day 1 marquee, Day 2 deep cuts, Day 3 re-rides and fireworks.',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const initialDayStates: DayConfig[] = [
  { park: 'DL', lightningLane: true, nap: true, pace: 'relaxed' },
  { park: 'DL', lightningLane: true, nap: true, pace: 'relaxed' },
  { park: 'DL', lightningLane: true, nap: true, pace: 'relaxed' },
]

const faqs = [
  {
    q: 'Is three days too much for Disneyland with kids?',
    a: 'Three days is the luxury plan, and worth it if you can swing it. Day 1 hits the marquee headliners. Day 2 picks up the second-tier Fantasyland dark rides (Snow White, Pinocchio, Mr. Toad, Storybook Land) plus character meets. Day 3 is the flex day — re-rides of kid favorites, a seasonal parade if one is running, character breakfast, and the castle fireworks finale on a show night.',
  },
  {
    q: "What's a character breakfast and is it worth it for a 3-day trip?",
    a: 'Plaza Inn character breakfast (8:00 AM seating) is the perfect Day 3 anchor — Minnie + rotating Disney friends visit the table for 4–5 character meets in one sitting. Book 60 days out via the Disneyland app. It replaces rope drop on Day 3 and gives you a relaxed start to the closing day.',
  },
  {
    q: 'Do we need Lightning Lane on all three days?',
    a: "Day 1 yes (marquee headliners). Day 2 it's a judgment call — the second-tier dark rides are mostly standby. Day 3 yes if you want to lock in re-rides of the kid's favorites. Most families buy it for all three; weekday Day 2 with kids 2–4 you can skip.",
  },
  {
    q: 'How should we split fireworks viewing across three nights?',
    a: "Fireworks aren't nightly right now, so check the app calendar for which of your nights have a show (Halloween Screams Fri–Sun through Oct 31; Believe… in Holiday Magic Nov 13 – Jan 6; Remember… Dreams Come True from Feb 2027). First show night: castle view from Main Street. Next: the easier Galaxy's Edge view. Last: castle again as the send-off. Heads-up for 2027: Remember… also projects onto the it's a small world facade, so that mall becomes a show surface, not a quiet side view.",
  },
  {
    q: 'Are three full park days too much for young kids?',
    a: 'Yes, if you skip the midday naps. No, if you take them seriously. Out of the park 12:30–3:30 PM every day, with a real hotel reset. Kids running on naps can handle late evenings three nights in a row. Kids who skip the nap break down by 4 PM Day 2.',
  },
]

export default function DisneylandThreeDayPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
          { name: 'Disneyland 3-Day', path: PAGE_PATH },
        ]}
      />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="Disneyland 3-Day Itinerary for Families (2026)"
        description="Three days at Disneyland with kids — marquee Day 1, deep cuts Day 2, re-rides and fireworks Day 3."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏰 3-Day Plan</div>
        <h1>Disneyland 3-Day Itinerary for Families (2026)</h1>
        <p className="hero-sub">
          Three days is the luxury Disneyland plan. Day 1 builds the foundation. Day 2 hits the deep
          cuts. Day 3 is the kid's pick — re-rides, character breakfast, and the castle fireworks
          finale on a show night.
        </p>
      </header>

      <section className="section">
        <Suspense
          fallback={
            <div className="callout">
              <div className="callout-label">Loading</div>
              <p>Loading your trip configurator…</p>
            </div>
          }
        >
          <ItineraryConfigurator initialDayStates={initialDayStates} allowDayCountChange={false} />
        </Suspense>

        <div className="callout pro">
          <div className="callout-label">Pair With</div>
          <p>
            Read up on <Link href="/lightning-lane">Lightning Lane strategy</Link>, cross-check the{' '}
            <Link href="/rides">age-by-age Disneyland rides guide</Link>, plan meals from the{' '}
            <Link href="/food">Disneyland food spots worth your money</Link>, and pack the right
            stuff via the <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries-dl-3day" />
    </>
  )
}
