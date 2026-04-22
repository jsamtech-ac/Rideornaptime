import type { Metadata } from 'next'
import Link from 'next/link'
import ItineraryTabs from '@/components/ItineraryTabs'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Itinerary with Kids: Hour-by-Hour Plans (2026)',
  description:
    'Three Disneyland itineraries built around nap schedules and meltdown prevention — 1-day blitz, 2-day relaxed, and 3-day complete. Start planning your trip.',
  alternates: { canonical: `${SITE_URL}/itineraries` },
  openGraph: {
    url: `${SITE_URL}/itineraries`,
    title: 'Disneyland Itinerary with Kids: Hour-by-Hour Plans (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
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
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🗓 Hour-by-Hour Plans</div>
        <h1>Disneyland Itineraries with Kids — Hour-by-Hour</h1>
        <p className="hero-sub">
          Three plans built around nap schedules and meltdown prevention. The #1 mistake families
          make is trying to do everything — these plans tell you exactly what to skip.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🗓</span>
          <h2>Pick Your Plan</h2>
          <p className="section-intro">
            Tap a tab to switch between the 1-day blitz, 2-day relaxed, and 3-day complete plans.
          </p>
        </div>

        <ItineraryTabs />

        <div className="callout warning">
          <div className="callout-label">Real Talk</div>
          <p>
            Your plan will fall apart by 11 AM. That's fine. These itineraries give you a framework
            so you're not wandering aimlessly. The most important thing on here is the midday break
            — skip it and you'll pay for it at 4 PM.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Pair With</div>
          <p>
            Decide which rides you'll prioritize using the{' '}
            <Link href="/rides">age-based ride guide</Link>, pre-book{' '}
            <Link href="/lightning-lane">Lightning Lane</Link> for the rides worth it, and mobile
            order from the <Link href="/food">food spots</Link> 30 minutes before each meal.
          </p>
        </div>
      </section>

      <TicketsCTA location="itineraries" />
    </>
  )
}
