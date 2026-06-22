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

const PAGE_FILE = 'src/app/itineraries/park-hopper-3-day/page.tsx'
const PAGE_PATH = '/itineraries/park-hopper-3-day'

export const metadata: Metadata = {
  title: 'Disneyland Park Hopper 3-Day Itinerary — Ages 2-8 (2026)',
  description:
    'Three-day Park Hopper plan with full ride coverage, World of Color, fireworks, and breakfast at Plaza Inn.',
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    url: `${SITE_URL}${PAGE_PATH}`,
    title: 'Disneyland Park Hopper 3-Day Itinerary — Ages 2-8 (2026)',
    description:
      'Three-day Park Hopper: full ride coverage, both nighttime shows, character breakfast finale.',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const initialDayStates: DayConfig[] = [
  { park: 'HOPPER', lightningLane: true, nap: true, pace: 'relaxed' },
  { park: 'HOPPER', lightningLane: true, nap: true, pace: 'relaxed' },
  { park: 'HOPPER', lightningLane: true, nap: true, pace: 'relaxed' },
]

const faqs = [
  {
    q: 'Is a 3-day Park Hopper worth it?',
    a: "Three Park Hopper days is the most flexible Disneyland resort trip you can do — you can chase whatever the kids want on any given day. Day 1 hits marquee headliners across both parks. Day 2 picks up second-tier rides and deep cuts. Day 3 is the kid's pick: re-rides, character breakfast, fireworks finale.",
  },
  {
    q: 'How do you book Lightning Lanes across both parks on a Park Hopper day?',
    a: 'You can only book a Lightning Lane in your second park if the first available return window is 11:00 AM or later — practically meaning you can book around 10:00 AM. Always Modify, never Cancel — Cancel resets your 2-hour clock from scratch.',
  },
  {
    q: 'Which park do you start at each day on a 3-day Park Hopper?',
    a: "Start DCA on Day 1 for Radiator Springs Racers (saves $60–120). Day 2 starts at Disneyland for Fantasyland rope drop. Day 3 is the kid's pick — whatever they loved most.",
  },
  {
    q: 'Should you do character breakfast on a 3-day Park Hopper trip?',
    a: 'Plaza Inn character breakfast (8:00 AM seating) is the perfect Day 3 anchor — Minnie + rotating Disney friends visit the table for 4–5 character meets without separate lines. Book 60 days out via the Disneyland app. It replaces rope drop on Day 3 and gives you a relaxed closing day.',
  },
  {
    q: 'How do you split the nighttime shows across three Park Hopper nights?',
    a: "Day 1: World of Color at DCA. Day 2: Disneyland fireworks from Main Street for the full castle projection show. Day 3: Disneyland fireworks from Galaxy's Edge — same fireworks with John Williams music, way easier exit with tired kids.",
  },
]

export default function ParkHopperThreeDayPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
          { name: 'Park Hopper 3-Day', path: PAGE_PATH },
        ]}
      />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="Disneyland Park Hopper 3-Day Itinerary for Families (2026)"
        description="Three-day Park Hopper plan: marquee, deep cuts, re-rides, World of Color, and castle fireworks finale."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🎢 Hopper 3-Day Plan</div>
        <h1>Disneyland Park Hopper 3-Day Itinerary for Families (2026)</h1>
        <p className="hero-sub">
          Three Park Hopper days is the most flexible trip you can plan. Day 1 marquee. Day 2 deep
          cuts. Day 3 is the kid's pick — character breakfast, re-rides, and the castle fireworks
          finale.
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
            Read <Link href="/lightning-lane">Lightning Lane + Park Hopper rules</Link> before
            booking, cross-check rides with the{' '}
            <Link href="/rides">age-by-age Disneyland rides guide</Link>, mobile-order from the{' '}
            <Link href="/food">Disneyland food spots worth your money</Link>, and pack via the{' '}
            <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries-hopper-3day" />
    </>
  )
}
