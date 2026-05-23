import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import ItemListJsonLd from '@/components/ItemListJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import CharacterFinder from '@/components/CharacterFinder'
import { SITE_URL } from '@/lib/content'
import {
  characters,
  type Character,
  type CharacterPark,
  LINE_LABEL,
  RELIABILITY_LABEL,
} from '@/data/characters'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'

const PAGE_FILE = 'src/app/characters/page.tsx'

export const metadata: Metadata = {
  title: 'Disneyland Characters 2026: Where to Meet Every Character with Kids',
  description:
    'Complete 2026 guide to character meet-and-greets at Disneyland and DCA. Every location, every line wait, every character worth meeting with kids ages 2-8. Plus Mando & Grogu.',
  alternates: { canonical: `${SITE_URL}/characters` },
  openGraph: {
    url: `${SITE_URL}/characters`,
    title: 'Disneyland Characters 2026: Where to Meet Every Character with Kids',
    description:
      'Complete 2026 guide to character meet-and-greets at Disneyland and DCA. Every location, every line wait, every character worth meeting with kids ages 2-8.',
    type: 'article',
    siteName: 'Ride or Naptime',
    locale: 'en_US',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'Where can you meet characters at Disneyland?',
    a: "Open the Disneyland app, tap the map, filter by 'Characters' — you'll see who's out right now and where. The reliable home bases: Mickey at Town Square Theater, princesses at Royal Hall in Fantasy Faire, Tiana in New Orleans Square, the Fab Five (Minnie, Donald, Goofy, Pluto) in Mickey's Toontown, Anna & Elsa across the esplanade at California Adventure in Hollywood Land, and the Pixar gang at Pixar Pier and Avengers Campus in DCA.",
  },
  {
    q: 'What is the best Disneyland character dining?',
    a: "Plaza Inn character breakfast at Disneyland is the standout — Minnie and friends rotate through the table and Plaza Inn already serves the best food in the park. If your kid is princess-obsessed, Storytellers Café at the Grand Californian is the better fit because Belle and Snow White interact more deeply. Goofy's Kitchen at the Disneyland Hotel is the loudest, most kid-chaotic option. Book 60 days out via the Disneyland app.",
  },
  {
    q: 'How do you find characters at Disneyland?',
    a: "The Disneyland app is the map. Open it, tap the map, filter by 'Characters' under attractions, and you'll see active locations with showtimes. Schedules shift throughout the day — re-check every couple of hours. There is no Lightning Lane for characters; they're all standby first-come, first-served.",
  },
  {
    q: 'What characters are at Disneyland in 2026?',
    a: "The Fab Five (Mickey, Minnie, Donald, Goofy, Pluto), every major princess including Tiana in New Orleans Square, Frozen's Anna and Elsa at DCA, the full Pixar lineup at Pixar Pier, Star Wars characters in Galaxy's Edge including the brand-new Mando and Grogu (live since May 22, 2026 with the Smugglers Run overlay), Marvel heroes at Avengers Campus including Spider-Man, Doctor Strange, Captain America, and Black Panther, plus Miguel and Mirabel at El Zocalo Park. Villains like Maleficent only come out for Oogie Boogie Bash.",
  },
  {
    q: 'Where can you meet Anna and Elsa at Disneyland?',
    a: "Anna and Elsa are at the Anna & Elsa Royal Welcome inside the Disney Animation Building in Hollywood Land at Disney California Adventure (not at Disneyland Park). It's the most demanded meet at the resort — rope-drop DCA and head straight there, or wait until after 4 PM when the line dips.",
  },
  {
    q: 'Is character dining worth it at Disneyland?',
    a: "Yes for at least one meal on a first trip. You meet 4-5 characters in one sitting with no separate lines and replace what would have been 5 separate 20-minute waits. Book Plaza Inn or Storytellers Café 60 days out via the Disneyland app. Skip character dining entirely if your kid is fully Frozen-obsessed — Anna and Elsa don't appear at any character meal.",
  },
  {
    q: 'How early should you line up for Mickey at Disneyland?',
    a: "If Mickey is the must-meet character of your trip, be in line at Town Square Theater by 9:05 AM right after park open. The line balloons to 60 minutes by 10 AM and stays that way until late afternoon. Late afternoon (3-5 PM) is the second-best window.",
  },
  {
    q: 'Are Mando and Grogu at Disneyland?',
    a: "Yes — they debuted at Star Wars: Galaxy's Edge on May 22, 2026 alongside the new Mandalorian overlay on Smugglers Run. They roam Black Spire Outpost. The exact rotation is still settling, so check the Disneyland app the morning of your visit for current locations and times.",
  },
  {
    q: 'What characters are at Avengers Campus?',
    a: "Spider-Man (with the famous rooftop drop scheduled multiple times daily), Doctor Strange (in the Ancient Sanctum), Captain America, Black Panther, Black Widow, Iron Man, Loki, and Ant-Man and the Wasp near Pym Test Kitchen. Spider-Man's drop is the showstopper — set a reminder for the next scheduled drop and get into position 15 minutes early.",
  },
  {
    q: 'Can you meet villains at Disneyland?',
    a: "Outside of special events, almost never. Maleficent, Cruella, the Evil Queen, and Jack Sparrow only appear reliably at Oogie Boogie Bash (the separate-ticket Halloween party at DCA, mid-August through October) and occasionally at Disneyland After Dark hard-ticket nights. Captain Hook does roam Fantasyland in his standard outfit year-round.",
  },
  {
    q: 'Do Disneyland characters still sign autographs?',
    a: "Yes — most will sign an autograph book. Bring a fat Sharpie or thick marker; characters in giant gloves can't grip a ballpoint pen. Or skip the book entirely and use PhotoPass photos as your keepsake — they're included with Lightning Lane Multi Pass.",
  },
  {
    q: 'How long are character meet-and-greet lines at Disneyland?',
    a: "Tier-1 characters (Mickey at Town Square, Anna & Elsa, Royal Hall princesses, Jack & Sally during Halloween Time) run 30-90 minutes. Mid-tier characters (Spider-Man, Tiana, Mando & Grogu, Buzz Lightyear) typically 15-30 minutes. Roaming characters (Alice, Mad Hatter, Pocahontas, Woody & Jessie) are almost always walk-ups under 15 minutes.",
  },
]

// ─── Helpers for grouping characters by park/land ────────────────────────────

const DL_LAND_ORDER = [
  'Main Street, U.S.A.',
  'Fantasyland',
  'Fantasyland (Fantasy Faire)',
  'Adventureland',
  'Frontierland',
  'New Orleans Square',
  'Critter Country',
  "Star Wars: Galaxy's Edge",
  "Mickey's Toontown",
]

const DCA_LAND_ORDER = [
  'Buena Vista Street',
  'Hollywood Land',
  'Avengers Campus',
  'Pixar Pier',
  'Paradise Gardens',
  'Cars Land',
]

interface RowEntry {
  character: Character
  location: { land: string; spot: string; reliability: string; typicalTimes?: string }
}

function rowsForPark(park: CharacterPark): RowEntry[] {
  const rows: RowEntry[] = []
  for (const c of characters) {
    for (const loc of c.locations) {
      if (loc.park === park) {
        rows.push({
          character: c,
          location: {
            land: loc.land,
            spot: loc.spot,
            reliability: RELIABILITY_LABEL[loc.reliability],
            typicalTimes: loc.typicalTimes,
          },
        })
      }
    }
  }
  return rows
}

function groupByLand(rows: RowEntry[], landOrder: string[]) {
  const byLand: Record<string, RowEntry[]> = {}
  for (const r of rows) {
    const key = r.location.land
    ;(byLand[key] ||= []).push(r)
  }
  // Sort lands by configured order, then any leftover lands alphabetically
  const orderedKeys = [
    ...landOrder.filter((l) => byLand[l]),
    ...Object.keys(byLand)
      .filter((l) => !landOrder.includes(l))
      .sort(),
  ]
  return orderedKeys.map((land) => ({ land, entries: byLand[land] }))
}

function CharacterRow({ entry }: { entry: RowEntry }) {
  const { character, location } = entry
  return (
    <div
      className="character-row"
      style={{
        borderTop: '1px solid var(--border, #e5e7eb)',
        padding: '1rem 0',
        display: 'grid',
        gap: '0.35rem',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'baseline' }}>
        <strong style={{ fontSize: '1.05rem' }}>{character.name}</strong>
        <span style={{ color: 'var(--muted, #6b7280)', fontSize: '0.9rem' }}>
          · {character.franchise}
        </span>
      </div>
      <div style={{ fontSize: '0.95rem' }}>
        <strong>Where:</strong> {location.spot}
        {location.typicalTimes ? ` · ${location.typicalTimes}` : ''}
      </div>
      <div style={{ fontSize: '0.9rem', color: 'var(--muted, #6b7280)' }}>
        <strong>Status:</strong> {location.reliability} · <strong>Typical line:</strong>{' '}
        {LINE_LABEL[character.expectedLine]}
      </div>
      {character.notes ? (
        <div style={{ fontSize: '0.95rem', marginTop: '0.25rem' }}>
          <em>{character.notes}</em>
        </div>
      ) : null}
    </div>
  )
}

function ParkLandSection({
  title,
  intro,
  rows,
}: {
  title: string
  intro?: string
  rows: RowEntry[]
}) {
  if (rows.length === 0) return null
  return (
    <div className="tip-card" style={{ marginTop: '1rem' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {intro ? <p>{intro}</p> : null}
      <div>
        {rows.map((r) => (
          <CharacterRow key={`${r.character.id}-${r.location.spot}`} entry={r} />
        ))}
      </div>
    </div>
  )
}

const LAND_INTROS: Record<string, string> = {
  'Main Street, U.S.A.':
    "Town Square Theater is the headline Mickey meet. He's there all day, but the line shape is brutal — be in line by 9:05 AM or come back after 4 PM.",
  Fantasyland:
    'Roaming Fantasyland is the most reliable way to bump into the storybook crew (Alice, Mad Hatter, Peter Pan, Captain Hook, Fairy Godmother) without joining a single formal line.',
  'Fantasyland (Fantasy Faire)':
    'Royal Hall rotates 3 princesses per visit, randomized. Ask the cast member at the door which three are inside before joining the line — if your kid only wants Cinderella, you can wait for the right rotation.',
  Adventureland:
    "Moana's location is still settling in 2026. Tarzan and Indiana Jones character moments are tied to attraction events, not formal meets.",
  Frontierland:
    "Big Thunder Trail is a quietly great character corner — Woody, Jessie, and Pocahontas all roam here. Pair with riding Big Thunder Mountain. El Zocalo Park hosts Miguel and Mirabel on a schedule.",
  'New Orleans Square':
    "Tiana has a regular presence here since Tiana's Bayou Adventure replaced Splash Mountain. Way easier walk-up than Royal Hall.",
  'Critter Country':
    'Chip & Dale roam near Hungry Bear Restaurant. Often a walk-up.',
  "Star Wars: Galaxy's Edge":
    "Galaxy's Edge characters do moments and patrols, not photo lines. Just walk the land — you'll cross paths with Rey, Chewbacca, Stormtroopers, and the brand-new Mando & Grogu (live since May 22, 2026).",
  "Mickey's Toontown":
    'The single densest character zone in the resort. Mickey & Minnie\'s Runaway Railway is here too, and the playground has only one exit so you can let kids run while you regroup.',
}

const DCA_LAND_INTROS: Record<string, string> = {
  'Buena Vista Street':
    'Mostly atmosphere characters and cavalcade appearances. Not a destination meet area on most days.',
  'Hollywood Land':
    "Anna & Elsa Royal Welcome is here — the most demanded meet at the resort. Mike & Sulley meet near the Monsters, Inc. attraction (which is closing in 2027 — ride it while you can).",
  'Avengers Campus':
    "The Marvel lineup. Spider-Man's rooftop drop is the showstopper — set a reminder for the next scheduled drop in the app and get into position 15 min early.",
  'Pixar Pier':
    "The roam-heaviest area in the resort. Buzz, Joy & Sadness, the Incredibles, and the Toy Story crew all rotate here. Pixar Pals Playtime Party (when running) is the easiest way to see a dozen characters in 10 minutes without queuing.",
  'Paradise Gardens':
    'Seasonal meets — Mulan during Lunar New Year (Jan 23 – Feb 22), Miguel & Dante during Plaza de la Familia (Aug 21 – Nov 2).',
  'Cars Land':
    'Mostly themed atmosphere — Lightning McQueen and Mater appear rarely. The land itself is the meet.',
}

// ─── ItemList schema items ───────────────────────────────────────────────────

const characterListItems = characters.flatMap((c) =>
  c.locations.map((loc) => ({
    name: c.name,
    description: `${loc.spot} · ${loc.land} · ${loc.park === 'DL' ? 'Disneyland Park' : 'Disney California Adventure'} · ${RELIABILITY_LABEL[loc.reliability]}`,
  }))
)

export default function CharactersPage() {
  const dlRows = rowsForPark('DL')
  const dcaRows = rowsForPark('DCA')
  const dlByLand = groupByLand(dlRows, DL_LAND_ORDER)
  const dcaByLand = groupByLand(dcaRows, DCA_LAND_ORDER)

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
        headline="Disneyland Character Meet-and-Greets: Where to Find Every Character (2026)"
        description="Complete 2026 guide to character meet-and-greets at Disneyland and DCA. Every location, every line wait, every character worth meeting with kids ages 2-8."
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <ItemListJsonLd
        path="/characters"
        name="Disneyland Resort Characters by Location (2026)"
        items={characterListItems}
      />

      <header className="hero hero--home">
        <Image
          src="/characters.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-content">
          <div className="hero-badge">🐭 Character Meet-and-Greets</div>
          <h1>Disneyland Character Meet-and-Greets: Where to Find Every Character (2026)</h1>
          <p className="hero-sub">
            The Disneyland app shows you which characters are out today, but it doesn't tell you
            which ones are worth the wait, which lines balloon by 10 AM, or which characters will
            scare your 3-year-old. This is that guide. Updated for 2026 including Mando &amp; Grogu
            at Galaxy's Edge and the new Tiana's Bayou Adventure character placements.
          </p>
        </div>
      </header>

      <nav aria-label="On this page" className="jump-nav">
        <span className="jump-nav-label">Jump to</span>
        <a className="jump-nav-chip" href="#find-character">🔍 Find a character</a>
        <a className="jump-nav-chip" href="#how-it-works">📱 How meets work</a>
        <a className="jump-nav-chip" href="#disneyland-by-land">🏰 Disneyland by land</a>
        <a className="jump-nav-chip" href="#dca-by-land">🎡 DCA by land</a>
        <a className="jump-nav-chip" href="#find-specific">📍 Specific characters</a>
        <a className="jump-nav-chip" href="#dining">🍽 Character dining</a>
        <a className="jump-nav-chip" href="#seasonal">🎃 Seasonal</a>
        <a className="jump-nav-chip" href="#parent-reality">😅 Parent reality</a>
        <a className="jump-nav-chip" href="#photo-tips">📸 Photo tips</a>
        <a className="jump-nav-chip" href="#faq">❓ FAQ</a>
      </nav>

      {/* ────────────── SECTION: Find a character (interactive) ────────────── */}
      <section className="section" id="find-character">
        <div className="section-header">
          <span className="section-icon">🔍</span>
          <h2>Find a Character</h2>
          <p className="section-intro">
            48 characters across the resort. Search by name, filter by park, or narrow down to who's
            actually worth a meet for your kid's age. Notes for each are dad-tested.
          </p>
        </div>

        <CharacterFinder />
      </section>

      {/* ────────────── SECTION: How it works ────────────── */}
      <section className="section" id="how-it-works">
        <div className="section-header">
          <span className="section-icon">📱</span>
          <h2>How character meet-and-greets actually work at Disneyland</h2>
          <p className="section-intro">
            Five things every first-time parent should understand before you spend a single minute
            in a character line.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">1</div>
            <div>
              <h3>The Disneyland app is your character map</h3>
            </div>
          </div>
          <p>
            Open the app, tap the map, filter by <strong>Characters</strong> under attractions —
            you'll see who's out right now and where. Tap a character to see scheduled meet windows
            for today. Schedules shift throughout the day, so check before committing to a long walk
            across the park.
          </p>
          <p>
            There's <strong>no Lightning Lane or Genie+ for characters</strong> at Disneyland Resort.
            They're first-come, first-served standby. The Single Pass and Multi Pass system at{' '}
            <Link href="/lightning-lane">Lightning Lane</Link> only applies to rides.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">2</div>
            <div>
              <h3>Scheduled vs. roaming — know the difference</h3>
            </div>
          </div>
          <p>
            <strong>Scheduled characters</strong> (Mickey at Town Square Theater, Anna &amp; Elsa in
            Hollywood Land, Royal Hall princesses) have posted meet windows in the app. You stand in
            a designated line, get your turn, get your photo, move on. Wait times: 20–90 minutes.
          </p>
          <p>
            <strong>Roaming characters</strong> (Alice, Mad Hatter, Peter Pan, Woody, Jessie,
            Pocahontas) walk around their land. You see them, you walk up, you get a photo. Wait
            times: typically under 15 minutes. The Disneyland app shows roaming characters too —
            tap the icon to see their current location pin.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">3</div>
            <div>
              <h3>Tier-1 demand needs rope drop OR late afternoon</h3>
            </div>
          </div>
          <p>
            The five highest-demand meets at the resort: <strong>Mickey at Town Square</strong>,{' '}
            <strong>Anna &amp; Elsa at DCA</strong>, <strong>Royal Hall princesses</strong>,{' '}
            <strong>Spider-Man's rooftop drop</strong>, and{' '}
            <strong>Jack &amp; Sally during Halloween Time</strong>. For all five: be in line within
            10 minutes of park open, or come back after 4 PM when the queue dips. Anything between
            10 AM and 3 PM is a 45+ minute commitment.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">4</div>
            <div>
              <h3>PhotoPass is included with Lightning Lane Multi Pass</h3>
            </div>
          </div>
          <p>
            If you bought <Link href="/lightning-lane">Multi Pass</Link> ($34/person), character
            photos taken by Disney PhotoPass photographers at every meet are automatically attached
            to your account. No extra fee. That alone takes some of the pressure off coordinating
            your own phone shots with a tired toddler.
          </p>
          <p>
            No Multi Pass? PhotoPass downloads are $80 for a single day or $260 for unlimited days
            across your trip. Most families with kids 4+ get more value from Multi Pass than the
            standalone PhotoPass.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">5</div>
            <div>
              <h3>Don't wait 45 minutes for any single character</h3>
            </div>
          </div>
          <p>
            Pick <em>one</em> must-meet per kid per day — save the long line for that one. Everyone
            else you'll bump into by walking the park. Combine your character planning with a smart{' '}
            <Link href="/lightning-lane">Lightning Lane day</Link> so you have unhurried windows
            between rides to grab roaming character meets.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION: Characters at DL by land ────────────── */}
      <section className="section" id="disneyland-by-land">
        <div className="section-header">
          <span className="section-icon">🏰</span>
          <h2>Characters by Location at Disneyland Park</h2>
          <p className="section-intro">
            Organized by land so you can plan your walking route. Each character has a typical line
            length and a tactical note.
          </p>
        </div>

        {dlByLand.map(({ land, entries }) => (
          <ParkLandSection
            key={land}
            title={land}
            intro={LAND_INTROS[land]}
            rows={entries}
          />
        ))}
      </section>

      {/* ────────────── SECTION: Characters at DCA by land ────────────── */}
      <section className="section" id="dca-by-land">
        <div className="section-header">
          <span className="section-icon">🎡</span>
          <h2>Characters by Location at California Adventure</h2>
          <p className="section-intro">
            Anna &amp; Elsa, the entire Marvel lineup at Avengers Campus, and the most
            roam-character-heavy area at the resort: Pixar Pier.
          </p>
        </div>

        {dcaByLand.map(({ land, entries }) => (
          <ParkLandSection
            key={land}
            title={land}
            intro={DCA_LAND_INTROS[land]}
            rows={entries}
          />
        ))}
      </section>

      {/* ────────────── SECTION: Where to find specific characters (snippet bait) ────────────── */}
      <section className="section" id="find-specific">
        <div className="section-header">
          <span className="section-icon">🔍</span>
          <h2>Where to Find Specific Characters</h2>
          <p className="section-intro">
            Quick lookup for the most-asked character locations. If your kid has one specific
            character on the brain, find them here.
          </p>
        </div>

        <div className="tip-card">
          <ul style={{ display: 'grid', gap: '0.65rem', paddingLeft: '1.1rem' }}>
            <li>
              <strong>Where can I meet Mickey at Disneyland?</strong> Town Square Theater, Main
              Street, U.S.A., Disneyland Park — scheduled all day.
            </li>
            <li>
              <strong>Where can I meet Minnie at Disneyland?</strong> Mickey's Toontown at
              Disneyland Park (her house when open, otherwise roaming).
            </li>
            <li>
              <strong>Where can I meet Anna and Elsa?</strong> Anna &amp; Elsa Royal Welcome, Disney
              Animation Building, Hollywood Land at Disney California Adventure.
            </li>
            <li>
              <strong>Where can I meet princesses at Disneyland?</strong> Royal Hall at Fantasy
              Faire, Fantasyland — three princesses per visit, rotated.
            </li>
            <li>
              <strong>Where can I meet Spider-Man?</strong> Avengers Campus at Disney California
              Adventure — rooftop drop scheduled multiple times daily.
            </li>
            <li>
              <strong>Where can I meet Tiana?</strong> New Orleans Square at Disneyland Park, near
              Tiana's Bayou Adventure.
            </li>
            <li>
              <strong>Where can I meet Mando and Grogu?</strong> Star Wars: Galaxy's Edge at
              Disneyland Park — roaming since the Smugglers Run overlay launched May 22, 2026.
            </li>
            <li>
              <strong>Where can I meet Mickey, Donald, Goofy, and Pluto together?</strong> Mickey's
              Toontown at Disneyland Park — the densest character zone in the resort.
            </li>
            <li>
              <strong>Where can I meet Buzz Lightyear?</strong> Pixar Pier at Disney California
              Adventure, near Toy Story Midway Mania.
            </li>
            <li>
              <strong>Where can I meet Woody and Jessie?</strong> Big Thunder Trail in Frontierland
              at Disneyland Park (also Pixar Pier at DCA).
            </li>
            <li>
              <strong>Where can I meet Miguel and Mirabel?</strong> El Zocalo Park near
              Frontierland at Disneyland Park.
            </li>
            <li>
              <strong>Where can I meet Captain America and Black Panther?</strong> Avengers Campus
              at Disney California Adventure.
            </li>
            <li>
              <strong>Where can I meet Mike and Sulley?</strong> Hollywood Land at Disney
              California Adventure, near Monsters, Inc.
            </li>
            <li>
              <strong>Where can I meet Jack Skellington?</strong> Near Haunted Mansion Holiday in
              New Orleans Square — Halloween Time only (Aug 21 – Oct 31, 2026).
            </li>
            <li>
              <strong>Where can I meet Maleficent?</strong> Oogie Boogie Bash at DCA only
              (separate-ticket Halloween party, Aug 18 – Oct 31 select nights).
            </li>
            <li>
              <strong>Where can I meet Chip and Dale?</strong> Critter Country at Disneyland Park,
              or Storytellers Café character breakfast at the Grand Californian.
            </li>
            <li>
              <strong>Where can I meet Belle?</strong> Royal Hall in Fantasyland, or
              Storytellers Café at Grand Californian (often present).
            </li>
            <li>
              <strong>Where can I meet Peter Pan?</strong> Castle Courtyard and the Fantasyland
              path at Disneyland Park — roaming.
            </li>
            <li>
              <strong>Where can I meet Captain Hook?</strong> Castle Courtyard and Small World
              Promenade at Disneyland Park.
            </li>
            <li>
              <strong>Where can I meet Doctor Strange?</strong> The Ancient Sanctum in Avengers
              Campus at Disney California Adventure.
            </li>
          </ul>
        </div>
      </section>

      {/* ────────────── SECTION: Character Dining ────────────── */}
      <section className="section" id="dining">
        <div className="section-header">
          <span className="section-icon">🍽</span>
          <h2>Character Dining: Worth It or Skip?</h2>
          <p className="section-intro">
            One character meal per first trip is the right move. Here's which one to book.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🍳</div>
            <div>
              <h3>Plaza Inn character breakfast (Disneyland Park)</h3>
            </div>
          </div>
          <p>
            <strong>Cost:</strong> ~$50 adults / ~$30 kids · <strong>Vibe:</strong> Bright, classic
            Victorian dining room on Main Street · <strong>Characters:</strong> Minnie, Pooh, Tigger,
            Eeyore, Captain Hook, and a rotating cast.
          </p>
          <p>
            Plaza Inn already serves the best food in the park — the fried chicken at lunch is
            legendary. The character breakfast is a buffet/family-style hybrid, with characters
            walking table to table. You meet 4–5 characters in one sitting and replace what would
            have been 5 separate 20-minute lines.
          </p>
          <p>
            <strong>Book the 8:00 AM seating.</strong> First seating gets you the best character
            access and puts you inside the park before rope drop — you walk out the door of Plaza
            Inn and you're already on Main Street ready to ride.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🌲</div>
            <div>
              <h3>Storytellers Café (Grand Californian Hotel)</h3>
            </div>
          </div>
          <p>
            <strong>Cost:</strong> ~$55 adults / ~$32 kids · <strong>Vibe:</strong> Gorgeous
            forest-themed dining room, calmer than Plaza Inn · <strong>Characters:</strong> Chip
            &amp; Dale always, with rotating princesses (Belle and Snow White most common).
          </p>
          <p>
            You don't need a park ticket to eat here, which makes it a great option for arrival day
            or departure day. If your kid is princess-obsessed and you want a longer, calmer
            princess interaction than the Royal Hall line, this is the better choice.
          </p>
          <p>Breakfast is the character meal — lunch and dinner are regular service.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎪</div>
            <div>
              <h3>Goofy's Kitchen (Disneyland Hotel)</h3>
            </div>
          </div>
          <p>
            <strong>Cost:</strong> ~$60 adults / ~$35 kids · <strong>Vibe:</strong> Loud,
            kid-chaotic buffet · <strong>Characters:</strong> Goofy always, plus Pluto, Chip &amp;
            Dale, and occasional princesses.
          </p>
          <p>
            It's the most "the kids loved it" option and the least "adults loved it" — the food is
            fine, not great. Worth one visit for peak Disney energy. Breakfast and dinner are both
            character meals here. Best if you have a 4–8 year old who lives for chaos.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🌊</div>
            <div>
              <h3>Disney's PCH Grill — Mickey's Tales of Adventure (Paradise Pier Hotel)</h3>
            </div>
          </div>
          <p>
            <strong>Cost:</strong> ~$48 adults / ~$28 kids · <strong>Vibe:</strong> Beach-themed,
            most relaxed of the four · <strong>Characters:</strong> Mickey in safari outfit, Minnie,
            Daisy, Pluto.
          </p>
          <p>
            This is the quietest character breakfast and the only one where Mickey himself reliably
            visits the table. Excellent pick for a nervous toddler — the room is smaller, the
            interactions are unhurried, and Mickey's appearance is a real moment instead of a
            rushed photo.
          </p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Direct Honest Recommendation</div>
          <p>
            If you're doing <strong>one character meal</strong> and the food matters to you, Plaza
            Inn beats them all. If you have a <strong>princess-obsessed kid</strong>, Storytellers
            Café is the better fit for Belle and Snow White interactions. If you have a{' '}
            <strong>shy or nervous toddler</strong>, PCH Grill is the gentlest. Goofy's Kitchen is
            for chaos-loving 5+ year olds.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Booking Window</div>
          <p>
            Book character dining <strong>60 days out</strong> via the Disneyland app — the slot
            drop is at 6 AM Pacific exactly 60 days before your date. Plaza Inn and Storytellers fill
            up within the first 10 minutes. Set an alarm. If you miss the 60-day window, check the
            app daily for cancellations — they pop up constantly.
          </p>
          <p>
            See the full <Link href="/food">food strategy</Link> for non-character dining that's
            worth booking, and the <Link href="/itineraries">3-day itinerary</Link> for where Plaza
            Inn slots into a sensible day.
          </p>
        </div>

        <TicketsCTA location="characters_dining" />
      </section>

      {/* ────────────── SECTION: Holiday & Seasonal Characters ────────────── */}
      <section className="section" id="seasonal">
        <div className="section-header">
          <span className="section-icon">🎃</span>
          <h2>Holiday &amp; Seasonal Characters</h2>
          <p className="section-intro">
            The character lineup shifts dramatically by season. Some of the best meets in the
            resort only exist for a few weeks per year.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎃</div>
            <div>
              <h3>Halloween Time at Disneyland (Aug 21 – Oct 31, 2026)</h3>
            </div>
          </div>
          <p>
            Included with regular park admission. Costumed character roaming hits its peak: Mickey,
            Minnie, Goofy, Donald, and Pluto all appear in Halloween costumes throughout the day.
            The standout: <strong>Jack &amp; Sally meet near Haunted Mansion Holiday</strong> —
            their only regular-park appearance of the year. Wait 60–90 min or skip.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">👻</div>
            <div>
              <h3>Oogie Boogie Bash (DCA, Aug 18 – Oct 31 select nights)</h3>
            </div>
          </div>
          <p>
            <strong>Separately-ticketed party at DCA, ~$139–$199 per ticket, 6 PM–11 PM.</strong>{' '}
            The only reliable way to meet Maleficent, Cruella, the Evil Queen, Oogie Boogie himself,
            and other rare villains. Headless Horseman makes appearances. Frightfully Fun Parade
            features villains you literally cannot meet any other time of year.
          </p>
          <p>
            Tickets typically drop in late June. Magic Key pre-sale first. Sells out — book day one
            of on-sale.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🎄</div>
            <div>
              <h3>Holidays at the Disneyland Resort (Nov 18, 2026 – early Jan 2027)</h3>
            </div>
          </div>
          <p>
            Santa Goofy roams Toontown. Toy soldiers march down Main Street. Mickey and Minnie
            appear in holiday attire at Town Square Theater. The full character cast in Christmas
            costumes — same locations as year-round, festive wardrobe. The{' '}
            <strong>¡Viva Navidad! street party</strong> in DCA's Paradise Gardens features Donald,
            Daisy, Panchito, and José dancing with families — one of the best character experiences
            of the year, no line required.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🐉</div>
            <div>
              <h3>Lunar New Year at DCA (Jan 23 – Feb 22, 2026)</h3>
            </div>
          </div>
          <p>
            <strong>Mulan and Mushu</strong> are reliably present during Lunar New Year — Mulan
            anchors the procession in Paradise Gardens. This is the one consistent window to meet
            Mulan, who is rare in Royal Hall rotation the rest of the year.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">💀</div>
            <div>
              <h3>Plaza de la Familia (DCA, Aug 21 – Nov 2, 2026)</h3>
            </div>
          </div>
          <p>
            Miguel and Dante (from Coco) meet near Paradise Gardens during this Día de los Muertos
            celebration — free, included with park admission. Beautiful musical storytelling set
            runs about 25 minutes. Kids who love Coco will sit through the whole thing.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">When to Visit for Characters</div>
          <p>
            For pure character variety, <strong>late September through October</strong> is the
            single best window: Halloween Time decor is full, Oogie Boogie Bash villains are out,
            Jack &amp; Sally are meeting, Miguel is at Plaza de la Familia, and crowds are at their
            lowest. See the <Link href="/seasonal">monthly breakdown</Link> for the full calendar.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION: Parent Reality ────────────── */}
      <section className="section" id="parent-reality">
        <div className="section-header">
          <span className="section-icon">😅</span>
          <h2>Parent Reality: When Character Meets Go Wrong</h2>
          <p className="section-intro">
            Every honest dad-of-young-kids guide includes this section. Most blogs don't.
          </p>
        </div>

        <div className="tip-card">
          <h3>The 3-year-old who melts down when Mickey gets too close</h3>
          <p>
            Big costumed characters look terrifying to some toddlers. The face doesn't move, the
            eyes don't blink, and the thing is huge. If your kid melts down at the front of the
            line: <strong>do not force the meet.</strong> Step out. Cast members are trained for
            this and will let you skip. Try a "face character" instead — Belle, Cinderella, Aurora,
            Peter Pan — they look like normal humans and most toddlers do fine with them.
          </p>
          <p>
            Pluto and Fairy Godmother are the two big-costume exceptions where toddlers tend to
            stay calm. Start there. If those go well, Mickey on day 2 is feasible.
          </p>
        </div>

        <div className="tip-card">
          <h3>The Anna &amp; Elsa line at 90 minutes. When to abort.</h3>
          <p>
            Your tolerance is roughly <strong>your kid's age in tens of minutes</strong>: a
            3-year-old can survive a 30-minute line, a 5-year-old around 50. Past that, you're
            buying a meltdown. If the wait posts at 90 minutes and your kid is under 5,{' '}
            <strong>abort</strong>. Come back at 4 PM when it drops to 30–45 minutes, or build it
            into next morning's rope drop instead.
          </p>
        </div>

        <div className="tip-card">
          <h3>Kids who freeze and can't talk</h3>
          <p>
            About half of kids under 6 freeze when they finally face their favorite character. They
            had a whole speech planned and now they can't say a word. <strong>This is normal.</strong>{' '}
            Cast members and characters are pros — they'll fill the silence with a hug, a high-five,
            or a silly pose. Don't push your kid to "talk to Mickey." The photo is still magical,
            and the kid will replay the moment for weeks.
          </p>
        </div>

        <div className="tip-card">
          <h3>The character your kid loves who isn't out today</h3>
          <p>
            Use the Disneyland app <strong>the night before</strong> to check tomorrow's character
            schedule (it usually publishes by 9 PM the prior day). If Mirabel isn't on the schedule
            and your kid is in full Encanto mode, manage expectations <em>before</em> you enter the
            park. "Mirabel isn't visiting today, but we'll see Anna and Elsa — they're sisters
            too!" is a thousand times easier at the hotel than at the turnstiles.
          </p>
        </div>

        <div className="tip-card">
          <h3>The post-meet emotional crash</h3>
          <p>
            After a kid finally meets their bullseye character, there's often a hard emotional
            crash 20 minutes later — the anticipation dump combined with the realization that the
            meet is over. <strong>Plan a low-stimulation activity right after.</strong> A Dole Whip
            on a bench. The carousel. A 30-minute hotel break. Don't try to jump straight into Big
            Thunder Mountain after Anna &amp; Elsa. Schedule the crash, don't fight it.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION: Quick Tips for Better Character Photos ────────────── */}
      <section className="section" id="photo-tips">
        <div className="section-header">
          <span className="section-icon">📸</span>
          <h2>Quick Tips for Better Character Photos</h2>
          <p className="section-intro">
            Small things that turn a forgettable photo into the one you'll print and frame.
          </p>
        </div>

        <div className="tip-card">
          <ul style={{ paddingLeft: '1.1rem', display: 'grid', gap: '0.5rem' }}>
            <li>
              <strong>PhotoPass is included with Multi Pass.</strong> Don't waste energy trying to
              get the perfect phone shot — let the Disney photographer do it. Your kid looks at the
              character; you don't need to be behind the camera. See{' '}
              <Link href="/lightning-lane">Lightning Lane Multi Pass</Link>.
            </li>
            <li>
              <strong>Best light at Disneyland:</strong> Town Square Theater in the morning (the
              east-facing entrance is bathed in gold light 8–10 AM). At DCA, Pixar Pier at golden
              hour (about 90 min before sunset) is genuinely cinematic.
            </li>
            <li>
              <strong>Bring autograph books</strong> — most characters will sign them. Buy a Disney
              autograph book in advance ($8 on Amazon) or use a blank photo mat that you'll frame
              later with the printed PhotoPass shot in the center.
            </li>
            <li>
              <strong>Use a fat Sharpie, not a ballpoint.</strong> Characters in giant gloves
              cannot grip a skinny pen. They will try, and it will be a disaster.
            </li>
            <li>
              <strong>Ask the cast member to take a group photo with your phone.</strong> Every
              character has a handler. They will absolutely do this for you. You don't have to ask
              with hesitation.
            </li>
            <li>
              <strong>Magic Bands are not used at the California parks</strong> — you'll show your
              ticket on your phone or a paper card at every entry. (This is different from Walt
              Disney World.)
            </li>
            <li>
              <strong>Photograph the line, not just the meet.</strong> The anticipation face when
              your kid sees Mickey from 15 feet away is the photo. Not the posed shot in front.
            </li>
          </ul>
        </div>
      </section>

      {/* ────────────── SECTION: FAQ ────────────── */}
      <section className="section" id="faq">
        <div className="section-header">
          <span className="section-icon">❓</span>
          <h2>Character Meet-and-Greet FAQ</h2>
          <p className="section-intro">
            The most common questions from real parents planning a Disneyland trip with kids 2–8.
          </p>
        </div>

        <div className="tip-card">
          <div style={{ display: 'grid', gap: '1.25rem' }}>
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{faq.q}</h3>
                <p style={{ margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Next Steps</div>
          <p>
            Build your character plan into a real day with the{' '}
            <Link href="/itineraries">hour-by-hour itineraries</Link>. Cross-check rides for your
            kid's age with the <Link href="/rides">ride-by-ride guide</Link>. Get your first-trip
            basics nailed in the <Link href="/first-visit">first-visit guide</Link>. And see the
            full <Link href="/food">food strategy</Link> for where character dining fits in.
          </p>
        </div>
      </section>

      <TicketsCTA location="characters" />
    </>
  )
}
