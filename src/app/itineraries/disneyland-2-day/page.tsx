import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'
import ItineraryConfigurator, {
  type DayConfig,
} from '@/components/ItineraryConfigurator'

const PAGE_FILE = 'src/app/itineraries/disneyland-2-day/page.tsx'
const PAGE_PATH = '/itineraries/disneyland-2-day'

export const metadata: Metadata = {
  title: 'Disneyland 2-Day Itinerary with Kids — Ages 2-8 (2026)',
  description:
    "Two-day Disneyland plan with nap breaks, Lightning Lane stacking, and a real-parent's ride order. No fluff.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    url: `${SITE_URL}${PAGE_PATH}`,
    title: 'Disneyland 2-Day Itinerary with Kids — Ages 2-8 (2026)',
    description:
      'Two-day Disneyland plan for families. Marquee headliners on Day 1, second-tier rides on Day 2, full naps both days.',
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
]

const faqs = [
  {
    q: 'Is two days enough for Disneyland with kids?',
    a: 'Two days is the sweet spot for families with young kids. Day 1 hits the marquee rides (Peter Pan, Mickey & Minnie\'s Runaway Railway, Big Thunder, Haunted Mansion) plus a real midday nap. Day 2 picks up second-tier Fantasyland dark rides (Snow White, Pinocchio, Mr. Toad) plus character meets and the rides you missed.',
  },
  {
    q: 'Should we visit one park or two on a 2-day Disneyland trip?',
    a: 'Most families with kids 2–8 should do two full Disneyland days, not split between Disneyland and DCA. Disneyland has more universally-loved rides for young kids. If you want both parks, look at the Park Hopper 2-day plan instead.',
  },
  {
    q: 'What time should we arrive at Disneyland each day?',
    a: 'Day 1: park 45 minutes before posted open. Day 2: you\'ve earned 30 minutes — park 30 minutes early. Rope drop is the single most valuable hour of each day; you can ride 4 rides in the first 45 minutes that would take 2 hours later.',
  },
  {
    q: 'Do we need Lightning Lane Multi Pass on both days?',
    a: 'Yes on Day 1 — you\'ll burn through 6–8 Lightning Lane bookings on the marquee rides. Day 2 is closer to a coin flip; the second-tier Fantasyland dark rides are mostly standby-only. Weekday Day 2 with kids 2–4? You can skip it.',
  },
  {
    q: 'Where should we watch Disneyland fireworks on a 2-day trip?',
    a: "Day 1: from Main Street for the full castle projection show. Day 2: from Star Wars: Galaxy's Edge — same fireworks with John Williams music, way less crowded, easier exit. The two viewing experiences are genuinely different.",
  },
]

export default function DisneylandTwoDayPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
          { name: 'Disneyland 2-Day', path: PAGE_PATH },
        ]}
      />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="Disneyland 2-Day Itinerary for Families (2026)"
        description="Two days at Disneyland with kids — marquee rides, deep cuts, naps, parades, fireworks."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏰 2-Day Plan</div>
        <h1>Disneyland 2-Day Itinerary for Families (2026)</h1>
        <p className="hero-sub">
          Two days at Disneyland is the sweet spot with young kids. Day 1 is for the headliners
          everyone-can-do. Day 2 is for the second-tier rides one-day visitors miss. Both days
          include a real nap and end with fireworks.
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
          <ItineraryConfigurator
            initialDayStates={initialDayStates}
            allowDayCountChange={false}
          />
        </Suspense>

        <div className="callout pro">
          <div className="callout-label">Pair With</div>
          <p>
            Dial in <Link href="/lightning-lane">Lightning Lane strategy</Link>, cross-check
            heights with the <Link href="/rides">age-by-age Disneyland rides guide</Link>,
            mobile-order from the <Link href="/food">Disneyland food spots worth your money</Link>,
            and pack with the <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries-dl-2day" />
    </>
  )
}
