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

const PAGE_FILE = 'src/app/itineraries/dca-2-day/page.tsx'
const PAGE_PATH = '/itineraries/dca-2-day'

export const metadata: Metadata = {
  title: 'DCA 2-Day Itinerary with Kids — Ages 2-8 (2026)',
  description:
    'Two-day DCA plan including Cars Land, Pixar Pier, World of Color, and the Lightning Lane math most blogs get wrong.',
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    url: `${SITE_URL}${PAGE_PATH}`,
    title: 'DCA 2-Day Itinerary with Kids — Ages 2-8 (2026)',
    description:
      'Two days at California Adventure: Day 1 marquee, Day 2 deep cuts, World of Color both nights.',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const initialDayStates: DayConfig[] = [
  { park: 'DCA', lightningLane: true, nap: true, pace: 'relaxed' },
  { park: 'DCA', lightningLane: true, nap: true, pace: 'relaxed' },
]

const faqs = [
  {
    q: 'Why would you do two days at California Adventure?',
    a: 'Most families do one DCA day and one Disneyland day. But for families with kids 7+ who want Incredicoaster, Guardians: BREAKOUT!, plus all the Multi Pass headliners and Pixar Pier deep cuts — two DCA days makes sense. Day 1 marquee, Day 2 picks up everything Day 1 missed.',
  },
  {
    q: 'Is DCA Multi Pass worth it for a 2-day visit?',
    a: "On a 2-day DCA visit, Multi Pass works on Day 1 (Soarin', Toy Story Midway Mania, WEB SLINGERS) but is harder to justify Day 2 — most of the second-tier Pixar Pier and Cars Land rides are standby-only anyway. Most families buy it for Day 1 only.",
  },
  {
    q: 'Should we ride Grizzly River Run on a 2-day DCA trip?',
    a: 'Yes, on Day 2 only — and pack a poncho. 42" minimum. You will get soaked. Save it for the warmer of your two days; the AC-rides break right after warms you back up.',
  },
  {
    q: 'When should we book Lamplight Lounge for a 2-day DCA trip?',
    a: 'Lamplight Lounge (Pixar Pier) opens reservations 60 days out via the Disneyland app. Book it the moment your booking window opens — it sells out within days. Tuna nachos and lobster nachos are the move. Book it for Day 1 dinner so you can talk through Day 2 priorities over food.',
  },
  {
    q: 'Can you do World of Color two nights in a row?',
    a: 'Yes — join the virtual queue at 12:00 PM each day. Show typically plays 9:00 PM with a second show at 10:15 on busy nights. Front-row areas get soaked; bring rain ponchos.',
  },
]

export default function DcaTwoDayPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
          { name: 'DCA 2-Day', path: PAGE_PATH },
        ]}
      />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="California Adventure 2-Day Itinerary for Families (2026)"
        description="Two days at DCA with kids — Day 1 marquee headliners, Day 2 Pixar Pier deep cuts and World of Color."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏎️ DCA 2-Day Plan</div>
        <h1>California Adventure 2-Day Itinerary for Families (2026)</h1>
        <p className="hero-sub">
          Two days at DCA covers everything — Cars Land, Pixar Pier, Avengers Campus, Hollywood
          Land, two nights of World of Color. Day 1 is marquee. Day 2 is the deep cuts plus Grizzly
          River Run.
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
            Read the <Link href="/lightning-lane">Lightning Lane Multi Pass math at DCA</Link>,
            cross-check rides with the <Link href="/rides">age-by-age Disneyland rides guide</Link>,
            mobile-order from the <Link href="/food">DCA food spots worth your money</Link>, and
            pack with the <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries-dca-2day" />
    </>
  )
}
