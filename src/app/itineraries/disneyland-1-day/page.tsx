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

const PAGE_FILE = 'src/app/itineraries/disneyland-1-day/page.tsx'
const PAGE_PATH = '/itineraries/disneyland-1-day'

export const metadata: Metadata = {
  title: 'Disneyland 1-Day Itinerary with Kids — Ages 2-8 (2026)',
  description:
    'Hour-by-hour 1-day Disneyland plan built for families with young kids. Rope drop sequence, Lightning Lane booking cadence, nap window, and fireworks plan.',
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    url: `${SITE_URL}${PAGE_PATH}`,
    title: 'Disneyland 1-Day Itinerary with Kids — Ages 2-8 (2026)',
    description:
      'Hour-by-hour 1-day Disneyland plan for families. Rope drop, Lightning Lane, nap break, fireworks.',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const initialDayStates: DayConfig[] = [
  { park: 'DL', lightningLane: true, nap: true, pace: 'relaxed' },
]

const faqs = [
  {
    q: 'Is one day enough for Disneyland with kids?',
    a: "One day at Disneyland with young kids is doable but tight. You can hit Peter Pan's Flight, Mickey & Minnie's Runaway Railway, the major Fantasyland rides, plus Adventureland or Tomorrowland — but you'll skip some headliners. Rope drop, Lightning Lane Multi Pass, and a real midday nap break are the three things that make it work.",
  },
  {
    q: 'What time should we arrive at Disneyland on a 1-day trip?',
    a: "Park 45 minutes before the posted gate open. If gates open at 8:00 AM, you're parking at 7:00 AM. Tram + security + esplanade walk eats 30–45 minutes of friction. Eat breakfast before you leave the hotel — don't waste rope-drop time eating inside.",
  },
  {
    q: 'Do you need Lightning Lane Multi Pass for a 1-day Disneyland trip?',
    a: "On a 1-day trip with kids, Multi Pass almost always pays off — $34/person buys you 7–8 line skips on rides like Peter Pan, Mickey & Minnie's Runaway Railway, Big Thunder, and Haunted Mansion. The exception is a quiet weekday with kids under 4 — most of the rides they love are standby-only anyway.",
  },
  {
    q: 'Should we take a midday break on a 1-day Disneyland trip?',
    a: 'Yes — even on a 1-day trip. Leave the park from roughly 12:30 to 3:00 PM for a nap or hotel pool. Without the break, kids melt down by 4 PM and you miss the fireworks. Book your next 2 Lightning Lanes from the hotel during the break.',
  },
  {
    q: "Where's the best place to watch Disneyland fireworks with kids on a 1-day visit?",
    a: "Star Wars: Galaxy's Edge — same fireworks with John Williams music piped in over the speakers, way less crowded than Main Street, and an easier exit with a stroller. You give up the castle projection show; you keep your sanity on a long day.",
  },
]

export default function DisneylandOneDayPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
          { name: 'Disneyland 1-Day', path: PAGE_PATH },
        ]}
      />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="Disneyland 1-Day Itinerary for Families with Kids (2026)"
        description="One day at Disneyland with kids — rope drop, Lightning Lane, nap, and fireworks, hour-by-hour."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏰 1-Day Plan</div>
        <h1>Disneyland 1-Day Itinerary for Families with Kids (2026)</h1>
        <p className="hero-sub">
          One day to do Disneyland with little kids. It's tight but it works if you rope drop, book
          Lightning Lane the second you tap in, and accept that some headliners aren't getting
          ridden. Here's the plan.
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
            Set up your <Link href="/lightning-lane">Lightning Lane strategy</Link> before you go,
            pick rides with the <Link href="/rides">age-by-age Disneyland rides guide</Link>,
            mobile-order from the <Link href="/food">Disneyland food spots worth your money</Link>,
            and pack with the <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries-dl-1day" />
    </>
  )
}
