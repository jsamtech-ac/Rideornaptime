import type { Metadata } from 'next'
import Link from 'next/link'
import RideMatrix from '@/components/RideMatrix'
import FaqJsonLd from '@/components/FaqJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Rides for Kids: Age-by-Age Guide (2026)',
  description: 'Age-based ride ratings for Disneyland & DCA — which rides are worth it for ages 2, 4, 6, and 8. Honest takes from a real parent. See the full list.',
  alternates: { canonical: `${SITE_URL}/rides` },
  openGraph: {
    url: `${SITE_URL}/rides`,
    title: 'Disneyland Rides for Kids: Age-by-Age Guide (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Disneyland rides for kids' }],
  },
}

const faqs = [
  {
    q: 'What Disneyland rides are best for toddlers (age 2)?',
    a: "Dumbo, It's a Small World, Buzz Lightyear Astro Blasters, Mickey & Minnie's Runaway Railway, Monsters Inc., The Little Mermaid, and Inside Out Emotional Whirlwind. None have height requirements and all are gentle.",
  },
  {
    q: 'What is the best first roller coaster for kids at Disneyland?',
    a: 'Big Thunder Mountain Railroad. The 40" height requirement fits most 6-year-olds, and it\'s fast without being scary — more like a bumpy train ride than a real coaster.',
  },
  {
    q: 'Which Disneyland rides should I skip with young kids?',
    a: 'Autopia (long line, bad payoff under age 6) and Incredicoaster (48" height requirement rules out most kids under 8). Haunted Mansion is a maybe — depends on whether your kid handles mild scary content.',
  },
]

export default function RidesPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🎢 Age-by-Age Ratings</div>
        <h1>Disneyland Rides for Kids: An Age-by-Age Guide</h1>
        <p className="hero-sub">
          Forget height requirements — here's whether each ride is actually worth your time
          at ages 2, 4, 6, and 8. Honest opinions from a real parent, not a marketing team.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎢</span>
          <h2>The Ride Matrix</h2>
          <p className="section-intro">
            Filter by park. Each ride shows a verdict (must-do / maybe / skip) for every
            age bracket, plus a parent's take on what actually matters.
          </p>
        </div>

        <RideMatrix />

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pro Tip</div>
          <p>Watch POV ride videos on YouTube with your kids before the trip. It helps them pick what they want to ride and cures fear for some kids who are nervous about the dark or loud noises.</p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Plan Your Day</div>
          <p>Once you know what you're riding, build the day around it. See the <Link href="/itineraries">hour-by-hour itineraries</Link> and decide which rides are worth a <Link href="/lightning-lane">Lightning Lane</Link> booking.</p>
        </div>
      </section>

      <TicketsCTA />
    </>
  )
}
