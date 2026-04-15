import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Ride or Naptime — The Disneyland Family Guide That Actually Helps',
  description: 'The no-fluff Disneyland guide for families with kids ages 2–8 — ride ratings, itineraries, Lightning Lane, food, packing, seasons, saving money, and more.',
  alternates: { canonical: SITE_URL },
  openGraph: { url: SITE_URL, title: 'Ride or Naptime — The Disneyland Family Guide That Actually Helps' },
}

const faqs = [
  {
    q: 'Is Disneyland worth it with a 2-year-old?',
    a: 'Yes — if you plan around naps. Toddlers love Dumbo, It\'s a Small World, Buzz Lightyear, Runaway Railway, and Monsters Inc. The key is a non-negotiable midday break and a realistic 5-hour day, not a 12-hour sprint.',
  },
  {
    q: 'How many days at Disneyland with kids is best?',
    a: 'Two days hits the sweet spot — one at Disneyland, one at DCA, with a long midday break on each day. Three days is ideal if you can swing it because you get a flex day to re-ride favorites and catch what you missed.',
  },
  {
    q: 'What is the best month to go to Disneyland with young kids?',
    a: 'September, early May, and late January. Low crowds, decent weather, lowest prices. October is a must-go for Halloween decorations if you can handle medium crowds.',
  },
]

const sections = [
  {
    href: '/rides',
    icon: '🎢',
    title: 'Age-Based Ride Guide',
    summary: 'Is your 4-year-old ready for Pirates? Should your 2-year-old try Dumbo? A verdict on every major ride for ages 2, 4, 6, and 8 — from a real parent.',
    cta: 'See the ride matrix →',
  },
  {
    href: '/itineraries',
    icon: '🗓',
    title: 'Hour-by-Hour Itineraries',
    summary: 'Three plans — 1-day blitz, 2-day relaxed, 3-day complete — built around nap schedules, meal timing, and the midday break that saves your trip.',
    cta: 'Plan your day →',
  },
  {
    href: '/lightning-lane',
    icon: '⚡',
    title: 'Lightning Lane Strategy',
    summary: 'Multi Pass or Premier? What to book the second the gates open, which rides are worth it with little kids, and where families waste hundreds of dollars.',
    cta: 'Book smart →',
  },
  {
    href: '/food',
    icon: '🍽',
    title: 'Where to Eat',
    summary: 'Plaza Inn fried chicken. Dole Whip. Birria tacos at San Fransokyo. Ronto Wraps. The dad-tested list of food worth your time plus the mobile-order trick.',
    cta: 'See the food list →',
  },
  {
    href: '/packing-list',
    icon: '🎒',
    title: 'Packing List for Kids',
    summary: 'Everything under $15 that saves money, time, or tears — from the right phone charger to stroller fans to why you cannot wear new shoes. Tap to check off.',
    cta: 'Start packing →',
  },
  {
    href: '/seasonal',
    icon: '🌤',
    title: 'Best Time to Visit',
    summary: 'Month-by-month crowd and weather verdict. Which weeks to absolutely avoid, and the low-crowd secret window most families miss.',
    cta: 'Pick a month →',
  },
  {
    href: '/saving-money',
    icon: '💰',
    title: 'Save Real Money',
    summary: 'Cheaper tickets from authorized resellers, parking for free at Downtown Disney, off-site hotels with walkable access, and free celebration buttons.',
    cta: 'Cut costs →',
  },
  {
    href: '/hidden-gems',
    icon: '✨',
    title: 'Hidden Gems & Survival Tips',
    summary: 'The fireworks spot locals use. The AC-cooled afternoon reset. Rider Switch. The toddler playground with only one exit. Stuff the big blogs skip.',
    cta: 'See the secrets →',
  },
  {
    href: '/top-5',
    icon: '⭐',
    title: 'Top 5 Gear Picks',
    summary: 'Best Disney-friendly strollers, phone chargers, stroller fans, kid water bottles, and parent backpacks — parent-tested Top 5 lists.',
    cta: 'See the picks →',
  },
]

export default function Home() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏰 Updated for 2026 Season</div>
        <h1>
          The Disneyland Guide for Families Who Don't Have Time for <span className="highlight">50 Blog Posts</span>
        </h1>
        <p className="hero-sub">
          Every tip you need — ride-by-ride ratings for ages 2–8,
          hour-by-hour itineraries built around nap schedules, and food
          strategy from a dad who's done this dozens of times.
        </p>
        <div className="hero-author">
          ✍️ Written by a real parent, not a Disney influencer
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">📖</span>
          <h2>Start Here — The Guide Hub</h2>
          <p className="section-intro">
            Pick a topic. Every page is standalone, scannable, and built for the phone in your hand while you plan (or while you're already in line).
          </p>
        </div>

        <div className="hub-grid">
          {sections.map(s => (
            <Link key={s.href} href={s.href} className="hub-card">
              <div className="hub-card-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
              <div className="hub-card-cta">{s.cta}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
