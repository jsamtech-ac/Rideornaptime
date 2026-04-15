import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Top 6 Disneyland-Friendly Strollers for Families (2026) — 3 Single, 3 Double',
  description: 'The best Disneyland-approved strollers — under the 31" x 52" size rule, fast-folding, and parent-tested. A ranked Top 6 for families with kids ages 2–8: 3 singles and 3 doubles.',
  alternates: { canonical: `${SITE_URL}/best-strollers` },
  openGraph: {
    url: `${SITE_URL}/best-strollers`,
    title: 'Top 6 Disneyland-Friendly Strollers for Families (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Top 6 Disneyland-friendly strollers' }],
  },
}

const faqs = [
  {
    q: 'What size stroller is allowed at Disneyland?',
    a: "Disneyland's stroller rule is 31 inches wide by 52 inches long (79 cm x 132 cm) or smaller. Wagons and stroller-wagons are not permitted. Any stroller on this list fits well inside the limit.",
  },
  {
    q: 'Single or double stroller for Disneyland?',
    a: 'If you have two kids under 6, bring a double. The mid-day nap is the whole point of a stroller at Disneyland, and two kids rarely nap on the same schedule in a single. If your kids are further apart in age, a single with a buggy board attachment usually wins.',
  },
  {
    q: 'Should I rent or bring my own stroller?',
    a: "Bring your own if you're driving or have a compact travel stroller that fits in a car trunk or checked bag. Park rentals are expensive, basic, and must be returned each night — a real hassle if you're leaving at 10 PM after fireworks.",
  },
  {
    q: 'Can you take a stroller on Disneyland rides?',
    a: "No — you'll park your stroller in designated stroller parking areas near each ride entrance. Bring a bright ribbon or tag so you can spot yours in a sea of black strollers. Never leave valuables in the stroller.",
  },
]

type Pick = {
  rank: number
  category: 'single' | 'double'
  name: string
  tagline: string
  pros: string[]
  cons: string[]
  bestFor: string
  link?: string
}

const picks: Pick[] = [
  {
    rank: 1,
    category: 'single',
    name: 'Single Pick #1 — Coming Soon',
    tagline: 'Top single-stroller pick — details coming.',
    pros: ['Pro point coming', 'Pro point coming', 'Pro point coming'],
    cons: ['Con point coming'],
    bestFor: 'Best for: coming soon',
  },
  {
    rank: 2,
    category: 'single',
    name: 'Single Pick #2 — Coming Soon',
    tagline: 'Runner-up single pick — details coming.',
    pros: ['Pro point coming', 'Pro point coming', 'Pro point coming'],
    cons: ['Con point coming'],
    bestFor: 'Best for: coming soon',
  },
  {
    rank: 3,
    category: 'single',
    name: 'Single Pick #3 — Coming Soon',
    tagline: 'Details coming.',
    pros: ['Pro point coming', 'Pro point coming'],
    cons: ['Con point coming'],
    bestFor: 'Best for: coming soon',
  },
  {
    rank: 1,
    category: 'double',
    name: 'Double Pick #1 — Coming Soon',
    tagline: 'Top double-stroller pick — details coming.',
    pros: ['Pro point coming', 'Pro point coming', 'Pro point coming'],
    cons: ['Con point coming'],
    bestFor: 'Best for: coming soon',
  },
  {
    rank: 2,
    category: 'double',
    name: 'Double Pick #2 — Coming Soon',
    tagline: 'Runner-up double pick — details coming.',
    pros: ['Pro point coming', 'Pro point coming', 'Pro point coming'],
    cons: ['Con point coming'],
    bestFor: 'Best for: coming soon',
  },
  {
    rank: 3,
    category: 'double',
    name: 'Double Pick #3 — Coming Soon',
    tagline: 'Details coming.',
    pros: ['Pro point coming', 'Pro point coming'],
    cons: ['Con point coming'],
    bestFor: 'Best for: coming soon',
  },
]

const singlePicks = picks.filter(p => p.category === 'single')
const doublePicks = picks.filter(p => p.category === 'double')

export default function BestStrollersPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">👶 Top 6 Strollers</div>
        <h1>Top 6 Disneyland-Friendly Strollers</h1>
        <p className="hero-sub">
          Three singles and three doubles that fit Disneyland's 31" x 52" size
          rule, fold fast for security and ride lines, and survive a 12-hour
          day on Anaheim pavement. Ranked for families with kids ages 2–8.
        </p>
      </header>

      <section className="section">
        <div className="callout" style={{ marginBottom: '1.5rem' }}>
          <div className="callout-label">📏 The rule</div>
          <p>
            Disneyland allows strollers up to <strong>31" wide by 52" long</strong> (79 x 132 cm).
            Wagons and stroller-wagons are not permitted. Every pick on this list fits comfortably
            inside the limit.
          </p>
        </div>

        <div className="section-header">
          <span className="section-icon">🚼</span>
          <h2>Top 3 Single Strollers</h2>
          <p className="section-intro">
            Best for one kid, or one kid plus a buggy-board sibling. Lightweight, compact fold, easy to steer through crowds.
          </p>
        </div>

        {singlePicks.map(p => (
          <div key={`single-${p.rank}`} className="tip-card">
            <div className="tip-card-header">
              <div className="tip-card-icon sky">#{p.rank}</div>
              <div>
                <h3>{p.name}</h3>
                <p style={{ margin: 0, opacity: 0.8 }}>{p.tagline}</p>
              </div>
            </div>

            <p style={{ marginTop: '0.75rem' }}><strong>Pros:</strong></p>
            <ul>
              {p.pros.map((pro, i) => <li key={i}>{pro}</li>)}
            </ul>

            <p><strong>Cons:</strong></p>
            <ul>
              {p.cons.map((con, i) => <li key={i}>{con}</li>)}
            </ul>

            <p style={{ marginTop: '0.75rem' }}><em>{p.bestFor}</em></p>

            {p.link && (
              <a href={p.link} target="_blank" rel="sponsored noopener" className="tickets-cta-btn primary" style={{ marginTop: '0.75rem', display: 'inline-block' }}>
                Check price →
              </a>
            )}
          </div>
        ))}

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">👯</span>
          <h2>Top 3 Double Strollers</h2>
          <p className="section-intro">
            Best for two kids under 6. Side-by-side vs tandem tradeoffs, with fold speed and park-maneuverability front of mind.
          </p>
        </div>

        {doublePicks.map(p => (
          <div key={`double-${p.rank}`} className="tip-card">
            <div className="tip-card-header">
              <div className="tip-card-icon castle">#{p.rank}</div>
              <div>
                <h3>{p.name}</h3>
                <p style={{ margin: 0, opacity: 0.8 }}>{p.tagline}</p>
              </div>
            </div>

            <p style={{ marginTop: '0.75rem' }}><strong>Pros:</strong></p>
            <ul>
              {p.pros.map((pro, i) => <li key={i}>{pro}</li>)}
            </ul>

            <p><strong>Cons:</strong></p>
            <ul>
              {p.cons.map((con, i) => <li key={i}>{con}</li>)}
            </ul>

            <p style={{ marginTop: '0.75rem' }}><em>{p.bestFor}</em></p>

            {p.link && (
              <a href={p.link} target="_blank" rel="sponsored noopener" className="tickets-cta-btn primary" style={{ marginTop: '0.75rem', display: 'inline-block' }}>
                Check price →
              </a>
            )}
          </div>
        ))}

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pair With</div>
          <p>
            Pair your stroller pick with the full <Link href="/packing-list">packing list</Link> (stroller fans, rain covers, labels)
            and the <Link href="/hidden-gems">hidden gems</Link> page for why a stroller is non-negotiable at Disneyland — even
            for kids who've "outgrown" one at home.
          </p>
        </div>
      </section>

      <TicketsCTA />
    </>
  )
}
