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

const PAGE_FILE = 'src/app/itineraries/park-hopper-2-day/page.tsx'
const PAGE_PATH = '/itineraries/park-hopper-2-day'

export const metadata: Metadata = {
  title: 'Disneyland Park Hopper 2-Day Itinerary — Ages 2-8 (2026)',
  description:
    'Two-day Park Hopper plan. Start DCA, rope drop Radiator Springs, hop to Disneyland after lunch. Built around nap windows.',
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    url: `${SITE_URL}${PAGE_PATH}`,
    title: 'Disneyland Park Hopper 2-Day Itinerary — Ages 2-8 (2026)',
    description:
      'Two-day Park Hopper plan: rope drop DCA, hop to Disneyland after lunch, end with fireworks.',
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
]

const faqs = [
  {
    q: 'Is a Park Hopper worth it for a 2-day trip?',
    a: 'Often yes. Park Hopper lets you start at DCA each morning for Radiator Springs Racers (the highest-value rope drop at the resort), then hop to Disneyland after lunch for Fantasyland and fireworks. Two parks in two days without dedicating a full day to either.',
  },
  {
    q: 'What time can you hop on a Park Hopper at Disneyland?',
    a: 'Any time of day. Disneyland dropped the old 11:00 AM hopping restriction on June 9, 2026 — you now just pick a starting park, and you can cross to the other whenever you like. The Lightning Lane bonus: you can also book a Multi Pass ride in your second park as soon as you scan into your first one, with no 11:00 AM return-window floor anymore.',
  },
  {
    q: 'Which park should you start at on a Park Hopper day?',
    a: "Start at DCA for Radiator Springs Racers — rope drop saves $60–120 in Single Pass costs and gives you a 15-minute wait instead of 90. Disneyland's Peter Pan you can ride via Lightning Lane after the hop. The math favors DCA-first for almost every family.",
  },
  {
    q: 'Should we nap between parks on a Park Hopper trip?',
    a: "Yes — even more important on a hopper day because you're walking more between parks. Aim to be back at the hotel by 1:30 PM, return to the second park around 4:00 PM. Hopper days are long; the nap is the difference between fireworks and an early exit.",
  },
  {
    q: 'Where do you watch the nighttime shows on a Park Hopper day?',
    a: "Day 1: World of Color at DCA (join the virtual queue at 12:00 PM). Day 2: Disneyland fireworks — Main Street if you want the castle projection show, Galaxy's Edge for the easier exit with a stroller. Don't try to do both shows in one night.",
  },
]

export default function ParkHopperTwoDayPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
          { name: 'Park Hopper 2-Day', path: PAGE_PATH },
        ]}
      />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="Disneyland Park Hopper 2-Day Itinerary for Families (2026)"
        description="Two-day Park Hopper plan: rope drop DCA, hop to Disneyland after lunch, fireworks at night."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🎢 Hopper 2-Day Plan</div>
        <h1>Disneyland Park Hopper 2-Day Itinerary for Families (2026)</h1>
        <p className="hero-sub">
          Two-day Park Hopper plan. Rope drop DCA for Radiator Springs Racers, hop to Disneyland
          after lunch for Fantasyland and fireworks. The most efficient way to cover both parks
          without losing the nap window.
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
            Read up on <Link href="/lightning-lane">Lightning Lane + Park Hopper rules</Link> before
            you go, check the <Link href="/rides">age-by-age Disneyland rides guide</Link>, plan
            meals from the <Link href="/food">Disneyland food spots worth your money</Link>, and
            pack with the <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries-hopper-2day" />
    </>
  )
}
