import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Hidden Gems & Parent Survival Tips (2026)',
  description: 'The Disneyland secrets locals and pro parents actually use — best fireworks spot, the AC-cooled afternoon reset, Rider Switch, and more. Read these first.',
  alternates: { canonical: `${SITE_URL}/hidden-gems` },
  openGraph: { url: `${SITE_URL}/hidden-gems`, title: 'Disneyland Hidden Gems & Parent Survival Tips (2026)' },
}

const faqs = [
  {
    q: 'Where is the best place to watch Disneyland fireworks?',
    a: "Star Wars: Galaxy's Edge. Everyone else packs onto Main Street — at Galaxy's Edge you see the same fireworks with John Williams music, way less crowded. If you have 3 days, watch from there twice and save Main Street for the last night for the full projection show.",
  },
  {
    q: 'What is Rider Switch at Disneyland?',
    a: 'Rider Switch lets one parent ride while the other waits with a child too short for a ride, then the second parent rides without waiting in line again. Ask the attendant at the entrance of any height-restricted ride — it is free.',
  },
  {
    q: 'Where can I take a break from the heat at Disneyland with kids?',
    a: "Hollywood Land at DCA runs free animation workshops, drawing classes, and the Sorcerer's Workshop every 30 minutes. Air-conditioned, seating everywhere, no reservations needed. It's the best-kept secret for an afternoon reset.",
  },
]

export default function HiddenGemsPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">✨ Parent-Tested Secrets</div>
        <h1>Disneyland Hidden Gems & Parent Survival Tips</h1>
        <p className="hero-sub">
          The stuff the blog posts miss — where real parents hide, where the good fireworks spots are,
          and the tricks that save the day at 4 PM when everyone's melting down.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">✨</span>
          <h2>The Survival Kit</h2>
        </div>

        <div className="tip-card">
          <p><strong>🎆 Fireworks from Star Wars: Galaxy's Edge.</strong> Everyone packs Main Street. Head to Galaxy's Edge instead — same fireworks, less crowded, and they play John Williams music. If you have 3 days, do Galaxy's Edge first, Main Street on day 3 for the projections.</p>
        </div>

        <div className="tip-card">
          <p><strong>🎨 DCA Hollywood Land Workshops.</strong> Free animation classes, drawing workshops, and the Sorcerer's Workshop run every 30 min. Air-conditioned, seating everywhere, no reservations needed. This is your secret afternoon reset — kids think they're doing something fun, parents get to sit in AC for an hour.</p>
        </div>

        <div className="tip-card">
          <p><strong>🏰 Toontown Playground.</strong> Only one exit. Let your toddler run wild, park yourself by the exit, and mentally check out for 20 minutes. You've earned it.</p>
        </div>

        <div className="tip-card">
          <p><strong>👸 Meet characters efficiently.</strong> Check the Disneyland app map for character locations and times. The princess meet-and-greet by the castle is the best single stop. Anna and Elsa have their own meet-and-greet at DCA. Toontown for Mickey and friends. Or just walk around — you'll bump into characters constantly.</p>
        </div>

        <div className="tip-card">
          <p><strong>🔄 Rider Switch is a game-changer.</strong> One parent rides while the other waits with the little one. Then you swap — the second parent skips the line entirely. Ask the ride attendant at the entrance. Works on any ride with a height requirement.</p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">More Coming</div>
          <p>Adding soon: best fireworks viewing spots, best places to sit and eat, and what to do when it rains. Got a hidden gem? <Link href="/">Back to the guide hub</Link>.</p>
        </div>
      </section>
    </>
  )
}
