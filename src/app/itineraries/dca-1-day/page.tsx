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

const PAGE_FILE = 'src/app/itineraries/dca-1-day/page.tsx'
const PAGE_PATH = '/itineraries/dca-1-day'

export const metadata: Metadata = {
  title: 'DCA 1-Day Itinerary with Kids — Ages 2-8 (2026)',
  description:
    'Disney California Adventure single-day plan for families with young kids. Rope drop Radiator Springs, Lightning Lane math, and World of Color timing.',
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    url: `${SITE_URL}${PAGE_PATH}`,
    title: 'DCA 1-Day Itinerary with Kids — Ages 2-8 (2026)',
    description:
      'One day at California Adventure: Radiator Springs rope drop, Cars Land, Pixar Pier, World of Color.',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const initialDayStates: DayConfig[] = [
  { park: 'DCA', lightningLane: true, nap: true, pace: 'relaxed' },
]

const faqs = [
  {
    q: 'Is one day enough for California Adventure?',
    a: "For most families with young kids, one full day at DCA covers it. The marquee rides — Radiator Springs Racers, Soarin', Toy Story Midway Mania, Monsters Inc., Little Mermaid — fit comfortably in a day with a nap break. If your kids are 7+ and want Incredicoaster and Guardians: BREAKOUT!, two days makes more sense.",
  },
  {
    q: 'Is DCA Lightning Lane Multi Pass worth it for a 1-day visit?',
    a: "It's the only Multi Pass at the resort that's genuinely debatable. DCA's pass only covers 3 useful rides for kids 2–8, and one (WEB SLINGERS) is intense for under-6. On a weekday it's often skippable; rope drop Radiator Springs Racers and you've already saved $60–120 in Single Pass costs without needing Multi Pass at all.",
  },
  {
    q: 'How do you join the World of Color virtual queue?',
    a: 'The virtual queue opens at 12:00 PM sharp in the Disneyland app. You must be tapped into DCA (or Disneyland with a Park Hopper) to qualify. Kids 3+ each need their own virtual queue slot; under 3 do not. Have the app open at 11:59 and tap refresh — slots can run out in under a minute on busy days.',
  },
  {
    q: 'Should you rope drop Radiator Springs Racers?',
    a: 'Yes. RSR standby is 15 minutes at 8:00 AM vs. 75–90 minutes by 11. This single move saves a family of 4 the $60–120 you\'d otherwise spend on Single Pass. Kid under 40"? One parent rides Single Rider while the other takes the kid to The Little Mermaid (walk-on, air-conditioned).',
  },
  {
    q: 'When does Cars Land light up at night?',
    a: "Cars Land's neon comes on at sunset — typically 7:30–8:00 PM in summer. Walking Route 66 at night with the kids is one of the visual highlights of DCA. Time dinner so you're in Cars Land at sunset, then move toward your World of Color viewing area for the 9:00 PM show.",
  },
]

export default function DcaOneDayPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
          { name: 'DCA 1-Day', path: PAGE_PATH },
        ]}
      />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="California Adventure 1-Day Itinerary for Families (2026)"
        description="One day at DCA with kids — RSR rope drop, Cars Land, Pixar Pier, World of Color."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏎️ DCA 1-Day Plan</div>
        <h1>California Adventure 1-Day Itinerary for Families (2026)</h1>
        <p className="hero-sub">
          One day at DCA with young kids works if you rope drop Radiator Springs Racers, do the
          Multi Pass math honestly, and join the World of Color virtual queue at noon sharp. Here's
          the plan.
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
            Read the <Link href="/lightning-lane">Lightning Lane Multi Pass math at DCA</Link>{' '}
            before deciding, cross-check rides with the{' '}
            <Link href="/rides">age-by-age Disneyland rides guide</Link>, plan meals from the{' '}
            <Link href="/food">DCA food spots worth your money</Link>, and pack with the{' '}
            <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries-dca-1day" />
    </>
  )
}
