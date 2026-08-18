import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { lastUpdatedFor } from '@/lib/pages'
import ItineraryConfigurator, { type DayConfig } from '@/components/ItineraryConfigurator'

// Single source of truth for this page's freshness — feeds the meta tag,
// the JSON-LD dateModified and any visible "Updated" UI.
const UPDATED = lastUpdatedFor('/itineraries/disneyland-3-day')
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
    modifiedTime: UPDATED.iso,
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
    a: 'Three days is the luxury plan, and worth it if you can swing it. Day 1 hits the marquee headliners. Day 2 picks up the second-tier Fantasyland dark rides (Snow White, Pinocchio, Mr. Toad, Storybook Land) plus character meets. Day 3 is the flex day — re-rides of kid favorites, parade, character breakfast, and the castle fireworks finale.',
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
    a: "Day 1: full castle projection show from Main Street. Day 2: easier view from Galaxy's Edge with John Williams music. Day 3: castle again from Main Street as the closing send-off. The two viewing experiences are genuinely different — do both.",
  },
  {
    q: 'Are three full park days too much for young kids?',
    a: 'Yes, if you skip the midday naps. No, if you take them seriously. Out of the park 12:30–3:30 PM every day, with a real hotel reset. Kids running on naps can do 8 PM fireworks three nights in a row. Kids who skip the nap break down by 4 PM Day 2.',
  },
]

export default function DisneylandThreeDayPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/itineraries/disneyland-3-day" />
      <ArticleJsonLd
        path={PAGE_PATH}
        headline="Disneyland 3-Day Itinerary for Families (2026)"
        description="Three days at Disneyland with kids — marquee Day 1, deep cuts Day 2, re-rides and fireworks Day 3."
        datePublished="2026-04-15"
        dateModified={UPDATED.date}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏰 3-Day Plan</div>
        <h1>Disneyland 3-Day Itinerary for Families (2026)</h1>
        <p className="hero-sub">
          Three days is the luxury Disneyland plan. Day 1 builds the foundation. Day 2 hits the deep
          cuts. Day 3 is the kid's pick — re-rides, character breakfast, and the castle fireworks
          finale.
        </p>
      </header>

      <section className="section">
        <ItineraryConfigurator initialDayStates={initialDayStates} allowDayCountChange={false} />

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

      <section className="section">
        <div className="section-header">
          <span className="section-icon">❓</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <p className="section-intro">
          The questions families ask us most about a three-day Disneyland plan.
        </p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <TicketsCTA location="itineraries-dl-3day" />
    </>
  )
}
