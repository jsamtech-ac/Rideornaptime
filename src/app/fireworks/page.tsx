import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'

const PAGE_FILE = 'src/app/fireworks/page.tsx'

export const metadata: Metadata = {
  title: "Disneyland Fireworks 2026–2027: Best Viewing Spots & What's Showing",
  description:
    "Skip the Main Street crush. My two favorite Disneyland fireworks spots — Star Wars: Galaxy's Edge and It's a Small World — with maps showing exactly where to stand.",
  alternates: { canonical: `${SITE_URL}/fireworks` },
  openGraph: {
    url: `${SITE_URL}/fireworks`,
    title: "Disneyland Fireworks 2026–2027: Best Viewing Spots & What's Showing",
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
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
    a: 'No. Right now fireworks are seasonal: Halloween Screams runs Fridays through Sundays through Oct 31, 2026 (some nights are projection-only), and Believe… in Holiday Magic runs during the holidays, Nov 13, 2026 – Jan 6, 2027. Remember… Dreams Come True returns in February 2027. Weather can cancel any show, so check the Disneyland app the day of your visit.',
  },
  {
    q: 'What fireworks show is playing at Disneyland right now?',
    a: "Through Oct 31, 2026: Halloween Screams (Fri–Sun). From Nov 13, 2026 to Jan 6, 2027: Believe… in Holiday Magic, with snow on Main Street. From February 2027: Remember… Dreams Come True, with new projections on Main Street, the it's a small world facade, and the Rivers of America. The 70th-anniversary Wondrous Journeys show ended Aug 20, 2026.",
  },
  {
    q: "Do you see the castle projections from Galaxy's Edge or Small World?",
    a: "From Galaxy's Edge, no — you trade the castle projections for a much calmer viewing experience. Small World is changing: when Remember… Dreams Come True returns in February 2027, the small world facade itself becomes a projection screen, so that plaza turns into a real show spot (and gets busier). If you have 3 days, mix the calm spots and save Main Street for your last night.",
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
        headline={"Disneyland Fireworks 2026–2027: Best Viewing Spots & What's Showing"}
        description={
          'Where to watch Disneyland fireworks with kids — the best viewing spots, timing, and what to do when the baby is asleep.'
        }
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero hero--home">
        <Image src="/fireworks.jpg" alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-content">
          <div className="hero-badge">🎆 Fireworks Viewing</div>
          <h1>Best Disneyland Fireworks Viewing Spots for Families</h1>
          <p className="hero-sub">
            Main Street gets packed shoulder-to-shoulder an hour before showtime. With kids, it's
            miserable. These are the two spots I actually use — with maps so you know exactly where
            to stand.
          </p>
        </div>
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
          <span className="section-icon">🗓️</span>
          <h2>What's Showing (Late 2026 – 2027)</h2>
        </div>

        <div className="tip-card">
          <p>
            <strong>Through Oct 31, 2026 — Halloween Screams.</strong> Fridays through Sundays only,
            and some nights run projections without fireworks. Villain-heavy and loud — great for
            6+, a lot for nervous toddlers.
          </p>
          <p>
            <strong>Nov 13, 2026 – Jan 6, 2027 — Believe… in Holiday Magic.</strong> The gentle one:
            carols, a short show, and snow falling on Main Street afterward. The best
            first-fireworks show for little kids.
          </p>
          <p>
            <strong>Early January – February 2027 — the quiet stretch.</strong> Expect few or no
            fireworks between the holiday show ending and the new lineup starting.
          </p>
          <p>
            <strong>From February 2027 — Remember… Dreams Come True.</strong> The classic returns
            with new projections on Main Street, the it's a small world facade, and the Rivers of
            America. Exact start date TBA.
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
            worth it. Book a post-fireworks ride from the app while you wait — see the{' '}
            <Link href="/lightning-lane">Lightning Lane playbook for families</Link>.
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
            wait. First trip? Pair this with the{' '}
            <Link href="/first-visit">first-time Disneyland family guide</Link>.
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
            minutes early and you'll have your pick of spots. Heads up for 2027: once Remember…
            Dreams Come True returns, the facade gets its own projections — great show, bigger
            crowd, so arrive 30+ minutes early. (Small World is also closed Oct 30 – Nov 12 for its
            holiday overlay, though the plaza stays open.)
          </p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pro move</div>
          <p>
            If you're doing 3 days, watch from Galaxy's Edge or Small World twice, then save Main
            Street for your last night — you'll appreciate the full castle projections more after
            the calmer viewings, and you won't feel like you missed anything.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            Slot fireworks into the evening with the{' '}
            <Link href="/itineraries">hour-by-hour Disneyland itineraries</Link>. More survival tips
            on the <Link href="/hidden-gems">Hidden Gems</Link> page, or head
            <Link href="/"> back to the guide hub</Link>.
          </p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">🐉</span>
          <h2>Fantasmic! and World of Color</h2>
        </div>

        <div className="tip-card">
          <p>
            <strong>Fantasmic! (Disneyland, Rivers of America)</strong> currently runs weekends only
            (Friday–Sunday) and has been missing some effects. The dragon and fire scenes scare a
            lot of under-5s — sit toward the back of the viewing area so you can slip out.
          </p>
          <p>
            <strong>World of Color (DCA, Paradise Bay)</strong> is World of Color – ONE through Oct
            31, then <strong>World of Color – Season of Light</strong> for the holidays (Nov 13 –
            Jan 6). An updated version of the original returns in February 2027. Get a spot through
            the free virtual queue in the Disneyland app, or book a dining package. Front rows get
            wet — bring a poncho for the kids.
          </p>
        </div>
      </section>

      <TicketsCTA location="fireworks" />
    </>
  )
}
