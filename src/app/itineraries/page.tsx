import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'
import ItineraryConfigurator from '@/components/ItineraryConfigurator'
import DeferredMount from '@/components/DeferredMount'
import PrintButton from '@/components/PrintButton'

const PAGE_FILE = 'src/app/itineraries/page.tsx'

export const metadata: Metadata = {
  title: 'Disneyland Itineraries for Families — 1, 2 & 3 Day Plans with Kids (2026)',
  description:
    'Hour-by-hour Disneyland and DCA itineraries built around nap windows, Lightning Lane timing, and real-parent reality. Pick your trip length and pace.',
  alternates: { canonical: `${SITE_URL}/itineraries` },
  openGraph: {
    url: `${SITE_URL}/itineraries`,
    title: 'Disneyland Itineraries for Families — 1, 2 & 3 Day Plans with Kids (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'How many days do you need at Disneyland with kids?',
    a: 'Two days is the sweet spot for families with young kids — one day per park with a long midday break on each day. One day is possible but brutal; three days is luxurious and lets you re-ride favorites.',
  },
  {
    q: 'What time should I arrive at Disneyland?',
    a: 'Be in line 30 minutes before the official opening time. Rope-drop gets you 60-90 minutes of short lines before the crowds build. Eat breakfast before you arrive.',
  },
  {
    q: 'Should we take a midday break at Disneyland?',
    a: 'Yes — it is non-negotiable with young kids. Leave the park from roughly 12:30 to 3:00 PM for a nap or hotel pool. Kids who skip the break melt down by 4 PM and the rest of the day falls apart.',
  },
]

export default function ItinerariesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Itineraries', path: '/itineraries' },
        ]}
      />
      <ArticleJsonLd
        path="/itineraries"
        headline={'Disneyland Itineraries with Kids (2026)'}
        description={
          'Hour-by-hour Disneyland itineraries for families — 1-day, 2-day, and 3-day plans built around kids ages 2–8.'
        }
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero hero--home">
        <Image
          src="/itineraries.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-content">
          <div className="hero-badge">🗓 Hour-by-Hour Plans</div>
          <h1>Disneyland Itineraries with Kids — Hour-by-Hour</h1>
          <p className="hero-sub">
            Three plans built around nap schedules and meltdown prevention. The #1 mistake families
            make is trying to do everything — these plans tell you exactly what to skip.
          </p>
        </div>
      </header>

      <section className="section">
        <PrintButton label="Print / Save plan as PDF" />

        <p className="print-brand print-only">
          Your Disneyland Itinerary · rideornaptime.com/itineraries
        </p>

        <Suspense
          fallback={
            <div className="configurator-placeholder">
              <div className="callout">
                <div className="callout-label">Loading</div>
                <p>Loading your trip configurator…</p>
              </div>
            </div>
          }
        >
          <DeferredMount minHeight={1000}>
            <ItineraryConfigurator />
          </DeferredMount>
        </Suspense>

        <div className="callout pro">
          <div className="callout-label">Pair With</div>
          <p>
            First trip? Start with the{' '}
            <Link href="/first-visit">rookie-mistake roundup for first-time families</Link> before
            working through these plans. Decide which rides you'll prioritize using the{' '}
            <Link href="/rides">age-based ride guide</Link>, pre-book{' '}
            <Link href="/lightning-lane">Lightning Lane</Link> for the rides worth it, and mobile
            order from the <Link href="/food">food spots</Link> 30 minutes before each meal. And
            don't pack the night before — use the{' '}
            <Link href="/packing-list">Disneyland packing list for kids</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries" />
    </>
  )
}
