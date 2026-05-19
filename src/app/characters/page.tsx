import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Character Meet-and-Greets: A Family Guide (2026)',
  description:
    "Where to meet Mickey, the princesses, Anna & Elsa, Goofy, and the Pixar gang at Disneyland — without wasting your day in line. A dad's parent-tested character guide.",
  alternates: { canonical: `${SITE_URL}/characters` },
  openGraph: {
    url: `${SITE_URL}/characters`,
    title: 'Disneyland Character Meet-and-Greets: A Family Guide (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'Where is the best place to meet princesses at Disneyland?',
    a: 'The Royal Hall at Fantasy Faire (near the castle in Fantasyland) is your single best stop — multiple princesses rotate through in the same spot, so one line gets you three meet-and-greets. Anna & Elsa are across the esplanade at California Adventure in their own dedicated meet-and-greet.',
  },
  {
    q: 'Where do you meet Mickey at Disneyland?',
    a: "Mickey and his friends live in Toontown at Disneyland. That's your primary stop for Mickey, Minnie, Donald, Daisy, Goofy, and Pluto. You'll also bump into roaming characters on Main Street throughout the day.",
  },
  {
    q: 'Is character dining worth it at Disneyland?',
    a: 'For a first trip with kids, yes. Plaza Inn character breakfast (Minnie and friends) and Storyteller Café at the Grand Californian are the two standouts. You meet 4–5 characters in one sitting with no separate lines. Book 60 days out — they fill up fast.',
  },
  {
    q: 'Do Disneyland characters still sign autographs?',
    a: "Yes — most will sign an autograph book. Bring a fat Sharpie or thick marker; characters in giant gloves can't hold a pen. Or skip the book and use PhotoPass photos as your keepsake — they're included with Lightning Lane Multi Pass.",
  },
]

export default function CharactersPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Characters', path: '/characters' },
        ]}
      />
      <ArticleJsonLd
        path="/characters"
        headline={'Disneyland Character Meet-and-Greets (2026)'}
        description={
          'How character meet-and-greets work at Disneyland — where to find favorites, how long lines run, and what kids really remember.'
        }
        datePublished="2026-04-15"
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🐭 Character Meet-and-Greets</div>
        <h1>Disneyland Character Meet &amp; Greets for Families</h1>
        <p className="hero-sub">
          Where to find Mickey, the princesses, Anna &amp; Elsa, and the Pixar gang — and how to
          meet them without burning 45 minutes of your day on a single line.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">✨</span>
          <h2>The Basics</h2>
          <p className="section-intro">
            How character meets actually work these days, so you can plan around them.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">📱</div>
            <div>
              <h3>The Disneyland app is your character map</h3>
            </div>
          </div>
          <p>
            Open the app, tap the map, filter by "Characters" — you'll see who's out right now and
            where. Schedules shift throughout the day, so check before committing to a long walk
            across the park.
          </p>
          <p>
            There's no Lightning Lane or FastPass for characters. They're first-come, first-served
            standby.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🖊</div>
            <div>
              <h3>Bring a fat Sharpie, not a ballpoint</h3>
            </div>
          </div>
          <p>
            Characters in giant gloves can't grip a skinny pen. Pack a thick marker and an autograph
            book, or a blank photo mat so you get one framed keepsake instead of a book that lives
            in a drawer.
          </p>
          <p>
            Prefer photos? <strong>Lightning Lane Multi Pass includes PhotoPass</strong> — character
            photos, ride photos, and Magic Shots are all bundled.{' '}
            <Link href="/lightning-lane">More on Lightning Lane →</Link>
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">⏱</div>
            <div>
              <h3>Don't wait 45 minutes for any single character</h3>
            </div>
          </div>
          <p>
            Pick <em>one</em> must-meet character per kid per day — save the long line for that one.
            Everyone else you'll bump into by walking the park. Characters roam Main Street,
            Fantasyland, Pixar Pier, and Buena Vista Street constantly.
          </p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">📍</span>
          <h2>Where to Find Who</h2>
          <p className="section-intro">
            The reliable home bases. Schedules shift daily, but these are the spots where each crew
            tends to live.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🏠</div>
            <div>
              <h3>Mickey, Minnie, Donald, Goofy — Toontown (DL)</h3>
            </div>
          </div>
          <p>
            Mickey and his friends live in <strong>Mickey's Toontown</strong> at Disneyland. It's
            the most reliable spot for Mickey, Minnie, Donald, Daisy, Goofy, and Pluto in one small
            area. Hit it in the morning — lines are shortest before 11 AM and after the midday
            parade.
          </p>
          <p>
            Bonus: Toontown has the <strong>only-one-exit playground</strong> kids love, so you can
            do meets + let them run in the same stop.{' '}
            <Link href="/hidden-gems">More on Toontown →</Link>
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">👸</div>
            <div>
              <h3>Princesses — Royal Hall &amp; Fantasy Faire (DL)</h3>
            </div>
          </div>
          <p>
            <strong>The Royal Hall</strong> at Fantasy Faire (next to the castle) is the single best
            princess stop — multiple princesses rotate through the same spot, so one line gets you 3
            meet-and-greets. Great for princess-obsessed kids who would otherwise want to do 5
            separate lines.
          </p>
          <p>
            Rapunzel, Cinderella, Tiana, Ariel, and Aurora all appear here on rotation. Check the
            app for who's scheduled the day you visit.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">❄️</div>
            <div>
              <h3>Anna &amp; Elsa — Anna &amp; Elsa's Royal Welcome (DCA)</h3>
            </div>
          </div>
          <p>
            Anna and Elsa live across the esplanade at <strong>California Adventure</strong>, not at
            Disneyland. Their dedicated meet-and-greet is in the <strong>Hollywood Land</strong>{' '}
            area. If your kid is Frozen-obsessed, plan a DCA morning around this.
          </p>
          <p>
            Lines are longest right after park opening. Mid-afternoon is surprisingly manageable.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🧸</div>
            <div>
              <h3>Pixar pals — Pixar Pier &amp; Buena Vista Street (DCA)</h3>
            </div>
          </div>
          <p>
            Buzz Lightyear, Woody, Jessie, the Incredibles, Joy &amp; Sadness, and Mike &amp; Sulley
            rotate through <strong>Pixar Pier</strong> and <strong>Buena Vista Street</strong> at
            DCA. You'll catch most of them just by walking around — it's the most roam-heavy area in
            the resort for characters.
          </p>
          <p>
            Watch for the <strong>Pixar Pals Playtime Party</strong> parade if it's running — great
            way to see a dozen characters in 10 minutes without waiting in any line.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">⚔️</div>
            <div>
              <h3>Star Wars characters — Galaxy's Edge (DL)</h3>
            </div>
          </div>
          <p>
            Rey, Kylo Ren, Chewbacca, stormtroopers, and a roving Vader patrol the paths inside{' '}
            <strong>Star Wars: Galaxy's Edge</strong>. They're roaming, not in a fixed spot — just
            wander the land and you'll cross paths with several in 20 minutes.
          </p>
          <p>
            Great for slightly-older kids (5+) who can handle the Kylo/stormtrooper intensity.
            Younger kids do better with the droids and Rey.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🎃</div>
            <div>
              <h3>Villains &amp; seasonal characters</h3>
            </div>
          </div>
          <p>
            Villains come out in force for <strong>Oogie Boogie Bash</strong> (separate-ticket
            Halloween party at DCA in Sept–Oct). Outside of that event, you'll occasionally catch
            Maleficent, Cruella, or the Queen of Hearts on Main Street during Halloween Time.
          </p>
          <p>
            Christmas brings Santa Goofy, toy soldiers, and the holiday-suited characters.{' '}
            <Link href="/seasonal">Best months to visit →</Link>
          </p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">🍽</span>
          <h2>Character Dining — Worth It?</h2>
          <p className="section-intro">
            Yes, for at least one meal on a first trip. Here's which ones to actually book.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🍳</div>
            <div>
              <h3>Plaza Inn character breakfast (DL)</h3>
            </div>
          </div>
          <p>
            Minnie and friends rotate through the table. Plaza Inn already serves the best food in
            the park — pair that with 4–5 character meets in one sitting and you've replaced what
            would have been 5 separate 20-minute lines with one 90-minute meal.
          </p>
          <p>
            Book 60 days out via the Disneyland app. First seating (8:00 AM) gives you the best
            character access <em>and</em> gets you into the park before rope drop.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🌲</div>
            <div>
              <h3>Storyteller Café (Grand Californian)</h3>
            </div>
          </div>
          <p>
            Chip &amp; Dale and friends, served in a gorgeous forest-themed dining room at the Grand
            Californian hotel. You don't need a park ticket to eat here, which makes it a great
            option for your arrival day or departure day.
          </p>
          <p>Breakfast is the character meal — dinner is regular service.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎪</div>
            <div>
              <h3>Goofy's Kitchen (Disneyland Hotel)</h3>
            </div>
          </div>
          <p>
            Goofy, Pluto, and a rotating cast in a loud, fun, kid-chaotic buffet. It's the most "the
            kids loved it" option and the least "adults loved it" — the food is fine, not great.
            Worth one visit for peak Disney energy.
          </p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Cross-Reference</div>
          <p>
            See the full <Link href="/food">food list</Link> for non-character dining that's worth
            it, and the <Link href="/itineraries">3-day itinerary</Link> where we slot Plaza Inn
            character breakfast into Day 3.
          </p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">⚠️</span>
          <h2>Rookie Character Mistakes</h2>
          <p className="section-intro">The patterns every first-time family falls into.</p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p>
            <strong>Booking character dining the night before.</strong> Plaza Inn and Storyteller
            fill up weeks out. Book 60 days ahead or accept a less popular slot.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p>
            <strong>Skipping Toontown because it "looks small."</strong> It's the single densest
            character zone in the resort. If your kid cares about Mickey at all, go.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p>
            <strong>Queuing for five separate princesses.</strong> Royal Hall rotates several in one
            line. Save the separate stops for a specific princess who isn't in that rotation.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p>
            <strong>Forgetting Anna &amp; Elsa are in a different park.</strong> They're at DCA, not
            Disneyland. If Frozen is the whole trip for your kid, build your DCA day around this.
          </p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Next Steps</div>
          <p>
            Slot character meets into the day with the{' '}
            <Link href="/itineraries">hour-by-hour itineraries</Link>, cross-check heights and ages
            on the <Link href="/rides">ride guide</Link>, and make sure you're set up for the rest
            of the day with the <Link href="/first-visit">first-visit guide</Link> and{' '}
            <Link href="/hidden-gems">hidden gems</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="characters" />
    </>
  )
}
