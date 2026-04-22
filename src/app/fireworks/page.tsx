import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: "Best Disneyland Fireworks Viewing Spots (2026) — A Dad's Two Favorites",
  description:
    "Skip the Main Street crush. My two favorite Disneyland fireworks spots — Star Wars: Galaxy's Edge and It's a Small World — with maps showing exactly where to stand.",
  alternates: { canonical: `${SITE_URL}/fireworks` },
  openGraph: {
    url: `${SITE_URL}/fireworks`,
    title: 'Best Disneyland Fireworks Viewing Spots (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'Where is the best place to watch Disneyland fireworks with kids?',
    a: "My two favorites: Star Wars: Galaxy's Edge (same fireworks with John Williams music, way less crowded) and right by It's a Small World (open sky, easy exit, room for strollers). Both beat the Main Street crush for families.",
  },
  {
    q: 'Are Disneyland fireworks on every night?',
    a: 'No — fireworks do not run every night. The schedule changes by season and weather. Always check the official Disneyland calendar or the Disneyland app the day of your visit before building your evening plan around them.',
  },
  {
    q: "Do you see the castle projections from Galaxy's Edge or Small World?",
    a: "No. You trade the castle projections for a much calmer viewing experience. If you have 3 days, do Galaxy's Edge or Small World twice and save Main Street for your last night for the full projection show.",
  },
]

export default function FireworksPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Fireworks', path: '/fireworks' },
        ]}
      />
      <ArticleJsonLd
        path="/fireworks"
        headline={'Best Disneyland Fireworks Viewing Spots (2026)'}
        description={
          'Where to watch Disneyland fireworks with kids — the best viewing spots, timing, and what to do when the baby is asleep.'
        }
        datePublished="2026-04-15"
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🎆 Fireworks Viewing</div>
        <h1>The Two Best Fireworks Spots at Disneyland</h1>
        <p className="hero-sub">
          Main Street gets packed shoulder-to-shoulder an hour before showtime. With kids, it's
          miserable. These are the two spots I actually use — with maps so you know exactly where to
          stand.
        </p>
      </header>

      <section className="section">
        <div className="callout" style={{ marginBottom: '1.5rem' }}>
          <div className="callout-label">⚠️ Check the schedule</div>
          <p>
            Fireworks don't run every night — the schedule shifts with the season, events, and
            weather. Before you plan your evening around them, check the official Disneyland
            calendar or the Disneyland app the day you visit to confirm they're actually on.
          </p>
        </div>

        <div className="section-header">
          <span className="section-icon">🌟</span>
          <h2>Fav #1 — Star Wars: Galaxy's Edge</h2>
        </div>

        <div className="tip-card">
          <p>
            <strong>This is my top pick.</strong> You get the same fireworks as everyone on Main
            Street, but with <strong>John Williams music piped in</strong> over the land's speakers.
            Way less crowded, easier to manage with a stroller, and the Batuu skyline under the
            fireworks is genuinely something else. You give up the castle projections — totally
            worth it.
          </p>
          <div style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
            <Image
              src="/fireworks-galaxys-edge.jpg"
              alt="Map showing the fireworks viewing spot inside Star Wars: Galaxy's Edge at Disneyland"
              width={800}
              height={900}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', opacity: 0.8 }}>
            📍 Head into Galaxy's Edge about 20 minutes before showtime and post up near the open
            plaza (pink marker). You'll hear the music cue the moment it starts.
          </p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">🌍</span>
          <h2>Fav #2 — It's a Small World</h2>
        </div>

        <div className="tip-card">
          <p>
            <strong>The family-friendly pick.</strong> The plaza right in front of It's a Small
            World has
            <strong> open sky, room to breathe, and an easy exit</strong> afterward — critical when
            you're pushing a stroller against a wave of 30,000 people leaving Main Street. The view
            is clean, the crowd is chill, and you can sit on the edge of the planters while you
            wait.
          </p>
          <div style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden' }}>
            <Image
              src="/fireworks-small-world.jpg.png"
              alt="Map showing the fireworks viewing spot in front of It's a Small World at Disneyland"
              width={800}
              height={900}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', opacity: 0.8 }}>
            📍 Stand in the plaza in front of the Small World facade (pink marker). Arrive 15–20
            minutes early and you'll have your pick of spots.
          </p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pro move</div>
          <p>
            If you're doing 3 days, watch from Galaxy's Edge or Small World twice, then save Main
            Street for your last night — you'll appreciate the full castle projection show more
            after the calmer viewings, and you won't feel like you missed anything.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            More survival tips on the <Link href="/hidden-gems">Hidden Gems</Link> page, or head
            <Link href="/"> back to the guide hub</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="fireworks" />
    </>
  )
}
