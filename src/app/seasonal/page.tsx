import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SEASONS, SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Best Time to Visit Disneyland with Kids (2026)',
  description: 'Month-by-month Disneyland crowd guide for families — when to go, what to avoid, and where the secret low-crowd windows are hiding. Plan your trip.',
  alternates: { canonical: `${SITE_URL}/seasonal` },
  openGraph: {
    url: `${SITE_URL}/seasonal`,
    title: 'Best Time to Visit Disneyland with Kids (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'When is the best time to go to Disneyland with kids?',
    a: 'September, early May, and late January are the best value windows — low crowds, manageable weather, and no school-break surge. October is a must-go if you can handle medium crowds: Halloween decorations, Haunted Mansion overlay, and pumpkin beignets.',
  },
  {
    q: 'What months should I avoid Disneyland?',
    a: 'July and August (peak heat, peak crowds, peak prices) and all of March (spring break). Dec 20 to Jan 1 hits capacity and the parks physically stop letting people in.',
  },
  {
    q: 'Is Disneyland crowded in September?',
    a: 'No — September is the best-kept secret. Schools are back in session, Halloween decorations go up mid-month, and crowds are the lowest they get outside of January.',
  },
]

export default function SeasonalPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: "Best Time to Visit", path: '/seasonal' },
        ]}
      />
      <ArticleJsonLd
        path="/seasonal"
        headline={"Best Time to Visit Disneyland (2026)"}
        description={"Month-by-month breakdown of crowds, weather, and events at Disneyland — when to go and when to avoid with kids."}
        datePublished="2026-04-15"
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🌤 Month-by-Month</div>
        <h1>Best Time to Visit Disneyland with Kids</h1>
        <p className="hero-sub">
          Not all months are created equal. Here's the honest breakdown of
          crowds, weather, and whether it's worth the trip.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🌤</span>
          <h2>Month-by-Month Guide</h2>
        </div>

        <div className="season-grid">
          {SEASONS.map((s, i) => (
            <div key={i} className="season-card">
              <div className="season-month">{s.month}</div>
              <div className={`season-verdict ${s.verdict === 'must-go' ? 'go' : s.verdict}`}>
                {s.verdict === 'go' || s.verdict === 'must-go' ? '👍 ' : s.verdict === 'avoid' ? '👎 ' : '🤷 '}
                {s.crowds} crowds
              </div>
              <div className="season-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pair With</div>
          <p>Once you've picked a month, lock in your <Link href="/itineraries">day-by-day plan</Link> and check the <Link href="/saving-money">money-saving tips</Link> — off-peak trips let you stretch the budget into a second day.</p>
        </div>
      </section>

      <TicketsCTA location="seasonal" />
    </>
  )
}
