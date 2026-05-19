import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'

const PAGE_FILE = 'src/app/hidden-gems/page.tsx'

export const metadata: Metadata = {
  title: 'Disneyland Hidden Gems & Parent Survival Tips (2026)',
  description:
    'The Disneyland secrets locals and pro parents actually use — best fireworks spot, the AC-cooled afternoon reset, Rider Switch, and more. Read these first.',
  alternates: { canonical: `${SITE_URL}/hidden-gems` },
  openGraph: {
    url: `${SITE_URL}/hidden-gems`,
    title: 'Disneyland Hidden Gems & Parent Survival Tips (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
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
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Hidden Gems', path: '/hidden-gems' },
        ]}
      />
      <ArticleJsonLd
        path="/hidden-gems"
        headline={'Disneyland Hidden Gems for Families (2026)'}
        description={
          'Underrated Disneyland experiences families miss — quiet spots, sleeper rides, and moments kids love.'
        }
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">✨ Parent-Tested Secrets</div>
        <h1>Disneyland Hidden Gems & Parent Survival Tips</h1>
        <p className="hero-sub">
          The stuff the blog posts miss — where real parents hide, where the good fireworks spots
          are, and the tricks that save the day at 4 PM when everyone's melting down.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">✨</span>
          <h2>Survival Kit &amp; Tips</h2>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎆</div>
            <div>
              <h3>Skip Main Street for fireworks</h3>
            </div>
          </div>
          <p>
            Main Street gets packed shoulder-to-shoulder an hour before showtime — with kids, it's
            miserable. Two better spots: <strong>Star Wars: Galaxy's Edge</strong> (same fireworks
            with John Williams music piped in, way less crowded) or{' '}
            <strong>right by the entrance to It's a Small World</strong> (open sky, room to breathe,
            easy exit afterward). You miss the castle projections, but you keep your sanity. Exact
            standing spots with maps in the{' '}
            <Link href="/fireworks">best Disneyland fireworks viewing spots for families</Link>.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🎨</div>
            <div>
              <h3>DCA Hollywood Land Workshops</h3>
            </div>
          </div>
          <p>
            Free animation classes, drawing workshops, and the Sorcerer's Workshop run every 30 min.
            Air-conditioned, seating everywhere, no reservations needed. This is your secret
            afternoon reset — kids think they're doing something fun, parents get to sit in AC for
            an hour.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🏰</div>
            <div>
              <h3>Toontown Playground</h3>
            </div>
          </div>
          <p>
            Only one exit. Let your toddler run wild, park yourself by the exit, and mentally check
            out for 20 minutes. You've earned it.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🌲</div>
            <div>
              <h3>Redwood Creek Challenge Trail (DCA)</h3>
            </div>
          </div>
          <p>
            The outdoor playground tucked into Grizzly Peak — rope bridges, climbing nets, rock
            walls, tire climbs, zip lines, slides, and a little hidden cave. Walk-through, no line,
            no reservation. Kids roughly 5–12 will burn an hour of energy here while you park on a
            shaded bench. It's never slammed like Toontown, and it's a perfect mid-afternoon energy
            release between DCA rides.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">👸</div>
            <div>
              <h3>Meet characters efficiently</h3>
            </div>
          </div>
          <p>
            Check the Disneyland app map for character locations and times. The princess
            meet-and-greet by the castle is the best single stop. Anna and Elsa have their own
            meet-and-greet at DCA. Toontown for Mickey and friends. Or just walk around — you'll
            bump into characters constantly. Where each crew actually lives in the{' '}
            <Link href="/characters">Disneyland character meet-and-greets guide</Link>.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🚂</div>
            <div>
              <h3>Ride the Disneyland Railroad</h3>
            </div>
          </div>
          <p>
            Grand Circle Tour around the whole park — ~20 minutes if you stay on, and you can hop
            off at any of the four stations. Sit down, cool off, eat a snack, and let tired legs
            recover while the kids get a break from walking. Bonus: the ride passes through the
            Grand Canyon and Primeval World dioramas.{' '}
            <em>
              Note: the Monorail is currently closed for refurbishment, so the train is your best
              loop-around-the-park option.
            </em>
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🚪</div>
            <div>
              <h3>Enter through Downtown Disney, not Harbor Blvd</h3>
            </div>
          </div>
          <p>
            The Harbor Blvd entrance is a sea of people — stroller traffic jams, long security
            lines, slow-moving crowds. The Downtown Disney security checkpoint (on the west side,
            near the hotels) is almost always quicker and more manageable. You'll walk through
            Downtown Disney to the esplanade between the two parks — same destination, way less
            stress.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">✂️</div>
            <div>
              <h3>Silhouette Studio (personal fav)</h3>
            </div>
          </div>
          <p>
            A cast member hand-cuts a black-paper silhouette of your kid in about a minute — it's
            one of the coolest Disney keepsakes and cheaper than most souvenirs. The main Silhouette
            Studio on Main Street almost always has a long line. The workaround: they added a{' '}
            <strong>second silhouette artist inside the Disneyana store</strong> (also on Main
            Street, a few doors down) — same service, way shorter wait.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🔄</div>
            <div>
              <h3>Rider Switch is a game-changer</h3>
            </div>
          </div>
          <p>
            One parent rides while the other waits with the little one. Then you swap — the second
            parent skips the line entirely. Ask the ride attendant at the entrance. Works on any
            ride with a height requirement. Stack Rider Switch with bookings — full playbook in the{' '}
            <Link href="/lightning-lane">Lightning Lane strategy guide</Link>.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🚼</div>
            <div>
              <h3>Bring a stroller — even if you think you don't need one</h3>
            </div>
          </div>
          <p>
            I bring one for my kids every time and it's a total game-changer: faster getting around
            the parks, less whining from tired legs, and — most importantly — it lets them nap
            mid-day so you can keep going past their usual bedtime for fireworks. Even kids who've
            "outgrown" strollers at home will use it by hour four at Disneyland. Worth every bit of
            the hassle. Picking one is its own thing — see our{' '}
            <Link href="/best-strollers">best Disneyland strollers for families</Link>.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">📏</div>
            <div>
              <h3>The "too short" return card</h3>
            </div>
          </div>
          <p>
            If your kid gets measured at a ride and doesn't make the height, ask the cast member at
            the entrance for a return card. It lets them come back and ride without waiting in line
            once they hit the height requirement — whether that's later in the trip or on a future
            visit. Softens the disappointment and genuinely makes their day. Plan around heights
            ahead of time with the{' '}
            <Link href="/rides">age-by-age Disneyland rides guide</Link>.
          </p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">More Coming</div>
          <p>
            Adding soon: best fireworks viewing spots, best places to sit and eat, and what to do
            when it rains. Got a hidden gem? <Link href="/">Back to the guide hub</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="hiddengems" />
    </>
  )
}
