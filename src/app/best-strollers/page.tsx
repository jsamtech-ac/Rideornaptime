import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Best Strollers for Disneyland 2026 — Budget to Best Picks for Families',
  description:
    'Our top 6 Disney stroller picks for families with young kids — 3 single, 3 double, from budget to best. Tested opinions from a real park parent, not a gear blog.',
  alternates: { canonical: `${SITE_URL}/best-strollers` },
  openGraph: {
    url: `${SITE_URL}/best-strollers`,
    title: 'Best Strollers for Disneyland 2026 — Budget to Best Picks',
    type: 'article',
    siteName: 'Ride or Naptime',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Best Disneyland strollers 2026' }],
  },
}

const faqs = [
  {
    q: 'What size stroller is allowed at Disneyland?',
    a: "Disneyland's stroller rule is 31 inches wide by 52 inches long (79 cm x 132 cm) or smaller. Wagons and stroller-wagons are not permitted. Every pick on this page fits inside the limit.",
  },
  {
    q: 'Should I bring a stroller or rent one at Disneyland?',
    a: "Bring your own if you're driving or can pack a compact travel stroller in a car trunk or checked bag. Park rentals (~$18/day single, $36/day double) are basic hard-plastic models that can't leave the park and must be re-rented each day — a real hassle if you're staying multiple days or leaving late after fireworks.",
  },
  {
    q: "What's the best stroller for Disneyland with a toddler?",
    a: 'For a single toddler, the Baby Jogger City Mini GT2 is the best all-around pick — all-terrain tires, near-flat recline for mid-day naps, UV 50+ canopy, and a one-hand fold for security and trams. If budget matters more than features, the Kolcraft Cloud Plus gives you the most usable features per dollar.',
  },
]

type Pick = {
  rank: string
  tier: 'Budget Pick' | 'Mid-Range Pick' | 'Best Pick'
  tierClass: 'sky' | 'sun' | 'castle'
  category: 'single' | 'double'
  name: string
  price: string
  weight: string
  capacity: string
  features: string[]
  honest: string
  link: string
  image: string
}

const picks: Pick[] = [
  {
    rank: '#1',
    tier: 'Budget Pick',
    tierClass: 'sky',
    category: 'single',
    name: 'Summer Infant 3Dlite',
    price: '~$70–90',
    weight: '13 lbs',
    capacity: '50 lb',
    features: [
      '4-position recline',
      'Compact fold with carry strap',
      'Lightweight aluminum frame',
    ],
    honest:
      "Won't handle rough terrain well and the canopy is small, but it's unbeatable for the price.",
    link: 'https://amzn.to/4vClnKU',
    image: '/single-1.jpg',
  },
  {
    rank: '#2',
    tier: 'Mid-Range Pick',
    tierClass: 'sun',
    category: 'single',
    name: 'Kolcraft Cloud Plus',
    price: '~$70–80',
    weight: '~12 lbs',
    capacity: '50 lb',
    features: [
      '3-tier extended canopy',
      'Parent + child trays',
      'All-terrain wheels with front suspension',
    ],
    honest:
      'Best feature-to-price ratio on the list. Slightly better sun protection and ride than the 3Dlite.',
    link: 'https://amzn.to/3QpS9i2',
    image: '/single-2.jpg',
  },
  {
    rank: '#3',
    tier: 'Best Pick',
    tierClass: 'castle',
    category: 'single',
    name: 'Baby Jogger City Mini GT2',
    price: '~$300–400',
    weight: '~22 lbs',
    capacity: '65 lb',
    features: [
      'Forever-air rubber tires',
      'All-wheel suspension',
      'One-hand fold',
      'Near-flat recline',
      'UV 50+ canopy',
    ],
    honest:
      'What the rental companies use, for a reason. Handles everything. Storage basket is tight.',
    link: 'https://amzn.to/4tfzVyw',
    image: '/single-3.jpg',
  },
  {
    rank: '#1',
    tier: 'Budget Pick',
    tierClass: 'sky',
    category: 'double',
    name: 'Kolcraft Cloud Plus Double',
    price: '~$170–200',
    weight: '23 lbs',
    capacity: '40 lb/seat',
    features: [
      'Disney-size approved 31" wide',
      'Dual canopies',
      'Parent + child trays',
      'Two storage baskets',
    ],
    honest:
      'Basic wheels struggle on rough surfaces and the recline is limited, but insane value for a double.',
    link: 'https://amzn.to/4dVpwmR',
    image: '/double-1.jpg',
  },
  {
    rank: '#2',
    tier: 'Mid-Range Pick',
    tierClass: 'sun',
    category: 'double',
    name: 'Summer Infant 3Dlite Double',
    price: '~$130–160',
    weight: 'under 22 lbs',
    capacity: '50 lb/seat',
    features: [
      'Individually reclining seats',
      'Anti-shock front wheels',
      'Compact fold with carry handle',
    ],
    honest:
      'Lightest double on this list. Small wheels and a basic ride, but easy to carry and travel with.',
    link: 'https://amzn.to/4cnfUPa',
    image: '/double-2.jpg',
  },
  {
    rank: '#3',
    tier: 'Best Pick',
    tierClass: 'castle',
    category: 'double',
    name: 'Baby Jogger City Mini GT2 Double',
    price: '~$550–650',
    weight: '~36 lbs',
    capacity: '50 lb/seat',
    features: [
      'All-terrain forever-air tires',
      'Fits through standard doorways',
      'One-step fold',
      'Near-flat recline on both seats',
      'UV 50+ canopies',
    ],
    honest:
      'Heavy, but pushes effortlessly. The best double for all-day park use. Undersized basket.',
    link: 'https://amzn.to/4mu4AVY',
    image: '/double-3.jpg',
  },
]

const singlePicks = picks.filter((p) => p.category === 'single')
const doublePicks = picks.filter((p) => p.category === 'double')

function PickCard({ p }: { p: Pick }) {
  return (
    <div className="tip-card">
      <div className="tip-card-header">
        <div className={`tip-card-icon ${p.tierClass}`}>{p.rank}</div>
        <div>
          <h3>
            {p.tier}: {p.name}
          </h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            {p.price} · {p.weight} · {p.capacity} capacity
          </p>
        </div>
      </div>

      <a
        href={p.link}
        target="_blank"
        rel="sponsored noopener"
        style={{
          display: 'block',
          marginTop: '1rem',
          background: '#fff',
          borderRadius: '12px',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <img
          src={p.image}
          alt={`${p.name} stroller`}
          loading="lazy"
          style={{ maxWidth: '100%', height: 'auto', maxHeight: '260px' }}
        />
      </a>

      <p style={{ marginTop: '0.75rem' }}>
        <strong>Key callouts:</strong>
      </p>
      <ul>
        {p.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <p style={{ marginTop: '0.5rem' }}>
        <strong>Honest take:</strong> {p.honest}
      </p>

      <a
        href={p.link}
        target="_blank"
        rel="sponsored noopener"
        className="tickets-cta-btn primary"
        style={{ marginTop: '0.75rem', display: 'inline-block' }}
      >
        Check Price on Amazon →
      </a>
    </div>
  )
}

export default function BestStrollersPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">👶 Top 6 Strollers</div>
        <h1>Best Strollers for Disneyland 2026</h1>
        <p className="hero-sub">
          Six real picks — three singles, three doubles, budget to best — from a
          parent who's pushed strollers through Disneyland a few times before.
          Not a gear-blog listicle.
        </p>
      </header>

      <section className="section">
        <p>
          Your stroller is the single most important piece of Disney gear you'll
          bring. It's a nap pod, a snack cart, a shade tent, a diaper bag on
          wheels, and — on hour 11 — a lifeboat. Get this one thing right and
          the rest of the day gets easier.
        </p>
        <p>
          Disneyland's rule:{' '}
          <strong>strollers must be 31" wide by 52" long or smaller</strong>{' '}
          (79 × 132 cm). Wagons and stroller-wagons are not allowed. Every pick
          below fits comfortably inside the limit.
        </p>

        <div className="section-header">
          <span className="section-icon">🚼</span>
          <h2>Single Strollers</h2>
          <p className="section-intro">
            Best for one kid, or one kid plus a buggy-board sibling. Lightweight,
            compact fold, easy to steer through crowds.
          </p>
        </div>

        {singlePicks.map((p) => (
          <PickCard key={`single-${p.rank}`} p={p} />
        ))}

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">👯</span>
          <h2>Double Strollers</h2>
          <p className="section-intro">
            Best for two kids under 6. Two nap schedules, one stroller — don't
            underestimate how much easier this makes the day.
          </p>
        </div>

        {doublePicks.map((p) => (
          <PickCard key={`double-${p.rank}`} p={p} />
        ))}

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">📊</span>
          <h2>Quick Comparison</h2>
          <p className="section-intro">
            Scan all six picks side by side. Prices fluctuate — tap through for
            live Amazon pricing.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.95rem',
              minWidth: '640px',
            }}
          >
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--ink)' }}>
                <th style={{ padding: '0.6rem 0.5rem' }}>Stroller</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Price</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Weight</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Capacity</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Fold</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Terrain</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '0.6rem 0.5rem' }}><strong>Summer Infant 3Dlite</strong></td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~$70–90</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>13 lbs</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>50 lb</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Compact, carry strap</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Basic</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Cheapest single that works</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '0.6rem 0.5rem' }}><strong>Kolcraft Cloud Plus</strong></td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~$70–80</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~12 lbs</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>50 lb</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Compact</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Good</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Best features per dollar</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '0.6rem 0.5rem' }}><strong>Baby Jogger City Mini GT2</strong></td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~$300–400</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~22 lbs</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>65 lb</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>One-hand fold</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>All-terrain</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>The do-everything single</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '0.6rem 0.5rem' }}><strong>Kolcraft Cloud Plus Double</strong></td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~$170–200</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>23 lbs</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>40 lb/seat</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Compact</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Basic</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Cheapest double worth buying</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <td style={{ padding: '0.6rem 0.5rem' }}><strong>Summer Infant 3Dlite Double</strong></td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~$130–160</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>&lt; 22 lbs</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>50 lb/seat</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Compact, carry handle</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Basic</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Best travel double</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem 0.5rem' }}><strong>City Mini GT2 Double</strong></td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~$550–650</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>~36 lbs</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>50 lb/seat</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>One-step fold</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>All-terrain</td>
                <td style={{ padding: '0.6rem 0.5rem' }}>Best double, period</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">💡</span>
          <h2>Disney Stroller Tips</h2>
          <p className="section-intro">
            Five things I wish someone had told me before our first trip.
          </p>
        </div>

        <ul>
          <li>
            <strong>Slap an AirTag on it.</strong> Cast members re-arrange
            stroller parking constantly — an AirTag saves 20 frustrated minutes
            when yours has been moved.
          </li>
          <li>
            <strong>Label it visibly.</strong> A bright ribbon, luggage tag, or
            puffy sticker. There are hundreds of identical black strollers in
            the parks at any moment.
          </li>
          <li>
            <strong>Bring a clip-on fan and a rain cover</strong> regardless of
            the forecast. Anaheim weather flips fast.
          </li>
          <li>
            <strong>Strollers must fold</strong> for the Toy Story trams, ART
            buses, and the monorail — factor fold speed into your pick.
          </li>
          <li>
            <strong>Free tire air station</strong> near the stroller rental shop
            at the Disneyland entrance — pump up soft tires before you start
            the day.
          </li>
        </ul>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pair With</div>
          <p>
            Pair your stroller pick with the full{' '}
            <Link href="/packing-list">packing list</Link> (fans, rain covers,
            labels, AirTags) and the{' '}
            <Link href="/saving-money">saving money guide</Link> for why bringing
            your own beats renting at the park gate.
          </p>
        </div>
      </section>

      <TicketsCTA />
    </>
  )
}
