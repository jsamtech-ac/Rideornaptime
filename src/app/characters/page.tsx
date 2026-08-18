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
import { lastUpdatedFor } from '@/lib/pages'
import { characters, RELIABILITY_LABEL } from '@/data/characters'
import {
  STATUS_LABEL,
  currentNote,
  sortedSeasonalEvents,
  statusFor,
  type SeasonalStatus,
} from '@/data/seasonal'

// Single source of truth for this page's freshness — feeds the meta tag,
// the JSON-LD dateModified and any visible "Updated" UI.
const UPDATED = lastUpdatedFor('/characters')

// The seasonal status chips are derived from today's date. A purely static
// build would freeze them at deploy time, so Halloween Time would still read
// "Coming up" on Nov 1 until someone happened to push. Revalidating daily lets
// the page correct itself with no code change and no deploy.
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Disneyland Characters 2026: Where to Meet Every Character with Kids',
  description:
    'Complete 2026 guide to character meet-and-greets at Disneyland and DCA. Every location, every line wait, every character worth meeting with kids ages 2-8. Includes Bluey at Fantasyland Theatre and the 2026 Star Wars roster changes.',
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
    modifiedTime: UPDATED.iso,
    authors: ['Ride or Naptime'],
  },
}

// ─── FAQs: general questions + specific "where can I meet X" snippet bait ───
// Both arrays feed FAQPage JSON-LD for SEO. Visually, the lookup list is a
// compact <ul> while the general questions are accordions.

const faqsGeneral = [
  {
    q: 'Where can you meet characters at Disneyland?',
    a: "Open the Disneyland app, tap the map, filter by 'Characters' — you'll see who's out right now and where. The reliable home bases: Mickey at Town Square Theater, princesses at Royal Hall in Fantasy Faire, Tiana in New Orleans Square, the Fab Five in Mickey's Toontown, Anna & Elsa across the esplanade at DCA in Hollywood Land, and the Pixar gang at Pixar Pier and Avengers Campus in DCA.",
  },
  {
    q: 'What is the best Disneyland character dining?',
    a: "Plaza Inn character breakfast at Disneyland is the standout — Minnie and friends rotate through the table and Plaza Inn already serves the best food in the park. If your kid is princess-obsessed, the actual princess meal is Disney Princess Breakfast Adventures at Napa Rose (Grand Californian) — several princesses visit your table, though it's a pricey splurge (~$150/guest). Storytellers Café is Mickey-and-pals, not princesses, despite the common mix-up. Goofy's Kitchen at the Disneyland Hotel is the loudest, most kid-chaotic option. Book 60 days out via the Disneyland app.",
  },
  {
    q: 'How do you find characters at Disneyland?',
    a: "The Disneyland app is the map. Open it, tap the map, filter by 'Characters' under attractions, and you'll see active locations with showtimes. Schedules shift throughout the day — re-check every couple of hours. There is no Lightning Lane for characters; they're all standby first-come, first-served.",
  },
  {
    q: 'What characters are at Disneyland in 2026?',
    a: "The Fab Five (Mickey, Minnie, Donald, Goofy, Pluto), every major princess including Tiana in New Orleans Square, Frozen's Anna and Elsa at DCA, the full Pixar lineup at Pixar Pier, Star Wars characters across Galaxy's Edge and Star Wars Launch Bay — Rey, Chewbacca, R2-D2, Ahsoka, Stormtroopers, Mando and Grogu, and Kylo Ren — plus Marvel heroes at Avengers Campus including Spider-Man, Doctor Strange, Captain America, and Black Panther, and Miguel and Mirabel at El Zocalo Park. New for 2026: Bluey and Bingo appear in Bluey's Best Day Ever at the Fantasyland Theatre. Villains are mostly an Oogie Boogie Bash thing, except during Halloween Time.",
  },
  {
    q: 'Where can you meet Anna and Elsa at Disneyland?',
    a: "Anna and Elsa are at the Anna & Elsa Royal Welcome inside the Disney Animation Building in Hollywood Land at Disney California Adventure (not at Disneyland Park). It's the most demanded meet at the resort — rope-drop DCA and head straight there, or wait until after 4 PM when the line dips.",
  },
  {
    q: 'Is character dining worth it at Disneyland?',
    a: "Yes for at least one meal on a first trip. You meet 4-5 characters in one sitting with no separate lines and replace what would have been 5 separate 20-minute waits. Book Plaza Inn (or Napa Rose Princess Breakfast Adventures if you want princesses) 60 days out via the Disneyland app. Skip character dining entirely if your kid is fully Frozen-obsessed — Anna and Elsa don't appear at any character meal.",
  },
  {
    q: 'How early should you line up for Mickey at Disneyland?',
    a: 'If Mickey is the must-meet character of your trip, be in line at Town Square Theater by 9:05 AM right after park open. The line balloons to 60 minutes by 10 AM and stays that way until late afternoon. Late afternoon (3-5 PM) is the second-best window.',
  },
  {
    q: 'Are Mando and Grogu at Disneyland?',
    a: "Yes, and they have been since late 2022 — this one gets reported wrong constantly. Din Djarin and Grogu roam Black Spire Outpost in Star Wars: Galaxy's Edge at Disneyland Park. What was new on May 22, 2026 was the Millennium Falcon: Smugglers Run overlay built around them, which is a ride storyline, not a character debut. There is no scheduled photo line for them — check the Disneyland app the morning of your visit and keep your eyes open as you walk the land.",
  },
  {
    q: 'What characters are at Avengers Campus?',
    a: "Spider-Man (with the famous rooftop drop scheduled multiple times daily), Doctor Strange (in the Ancient Sanctum), Captain America, Black Panther, Black Widow, Iron Man, Loki, and Ant-Man and the Wasp near Pym Test Kitchen. Spider-Man's drop is the showstopper — set a reminder for the next scheduled drop and get into position 15 minutes early.",
  },
  {
    q: 'Can you meet villains at Disneyland?',
    a: 'Most of the year, almost never — Maleficent, Cruella, the Evil Queen, and Jack Sparrow appear reliably only at Oogie Boogie Bash (the separate-ticket Halloween party at DCA) and occasionally at Disneyland After Dark hard-ticket nights. Halloween Time is the exception: from Aug 21 to Oct 31, 2026 Disney puts villains out in Fantasyland on a regular park ticket, no party ticket required. That window is by far the cheapest way to get a villain photo. Captain Hook roams Fantasyland in his standard outfit year-round.',
  },
  {
    q: 'Is there a Bluey meet and greet at Disneyland?',
    a: "No — and this is the single most misunderstood thing on this page. Bluey's Best Day Ever opened March 22, 2026 at the Fantasyland Theatre in Disneyland Park, but there is no formal meet and greet and no queue. Bluey and Bingo come down closer to the audience during parts of the show, which is where your photo comes from. Sit close and on an aisle, and have your camera out before it starts. If your kid is expecting to line up and hug Bluey, tell them beforehand — that conversation goes much better at the hotel than at the theatre.",
  },
  {
    q: 'What is Star Wars Launch Bay and is it worth it?',
    a: "Star Wars Launch Bay is an indoor, air-conditioned character venue in Tomorrowland at Disneyland Park, and it is the most underrated character stop in the resort. Chewbacca meets here, and since April 2026 so does Kylo Ren, who moved over from Galaxy's Edge. Lines are typically much shorter than the same characters draw in Galaxy's Edge. On a 95-degree August afternoon, this is where you go. Note that Darth Vader no longer meets here.",
  },
  {
    q: 'Do Disneyland characters still sign autographs?',
    a: "Yes — most will sign an autograph book. Bring a fat Sharpie or thick marker; characters in giant gloves can't grip a ballpoint pen. Or skip the book entirely and use PhotoPass photos as your keepsake — they're included with Lightning Lane Multi Pass.",
  },
  {
    q: 'How long are character meet-and-greet lines at Disneyland?',
    a: 'Tier-1 characters (Mickey at Town Square, Anna & Elsa, Royal Hall princesses, Jack & Sally during Halloween Time) run 30-90 minutes. Mid-tier characters (Spider-Man, Tiana, Mando & Grogu, Buzz Lightyear) typically 15-30 minutes. Roaming characters (Alice, Mad Hatter, Pocahontas, Woody & Jessie) are almost always walk-ups under 15 minutes.',
  },
]

const faqsLookup = [
  {
    q: 'Where can I meet Mickey at Disneyland?',
    a: 'Town Square Theater, Main Street, U.S.A., Disneyland Park — scheduled all day.',
  },
  {
    q: 'Where can I meet Minnie at Disneyland?',
    a: "Mickey's Toontown at Disneyland Park (her house when open, otherwise roaming).",
  },
  {
    q: 'Where can I meet Anna and Elsa?',
    a: 'Anna & Elsa Royal Welcome, Disney Animation Building, Hollywood Land at Disney California Adventure.',
  },
  {
    q: 'Where can I meet princesses at Disneyland?',
    a: 'Royal Hall at Fantasy Faire, Fantasyland — three princesses per visit, rotated.',
  },
  {
    q: 'Where can I meet Spider-Man?',
    a: 'Avengers Campus at Disney California Adventure — rooftop drop scheduled multiple times daily.',
  },
  {
    q: 'Where can I meet Tiana?',
    a: "New Orleans Square at Disneyland Park, near Tiana's Bayou Adventure.",
  },
  {
    q: 'Where can I meet Mando and Grogu?',
    a: "Star Wars: Galaxy's Edge at Disneyland Park — roaming Black Spire Outpost, as they have since late 2022.",
  },
  {
    q: 'Where can I meet Mickey, Donald, Goofy, and Pluto together?',
    a: "Mickey's Toontown at Disneyland Park — the densest character zone in the resort.",
  },
  {
    q: 'Where can I meet Buzz Lightyear?',
    a: 'Pixar Pier at Disney California Adventure, near Toy Story Midway Mania.',
  },
  {
    q: 'Where can I meet Woody and Jessie?',
    a: 'Big Thunder Trail in Frontierland at Disneyland Park (also Pixar Pier at DCA).',
  },
  {
    q: 'Where can I meet Miguel and Mirabel?',
    a: 'El Zocalo Park near Frontierland at Disneyland Park.',
  },
  {
    q: 'Where can I meet Captain America and Black Panther?',
    a: 'Avengers Campus at Disney California Adventure.',
  },
  {
    q: 'Where can I meet Mike and Sulley?',
    a: 'Hollywood Land at Disney California Adventure, near Monsters, Inc.',
  },
  {
    q: 'Where can I meet Jack Skellington?',
    a: 'New Orleans Square near the Royal Street Veranda, Halloween Time only (Aug 21 – Oct 31, 2026). They come out around 11 AM — do not rope-drop for them.',
  },
  {
    q: 'Where can I meet Maleficent?',
    a: 'Oogie Boogie Bash at DCA only (separate-ticket Halloween party, Aug 18 – Oct 31 select nights).',
  },
  {
    q: 'Where can I meet Chip and Dale?',
    a: 'Bayou Country at Disneyland Park (near the Hungry Bear Restaurant), or Storytellers Café character breakfast at the Grand Californian.',
  },
  {
    q: 'Where can I meet Belle?',
    a: 'Royal Hall at Fantasy Faire in Fantasyland; she also tells her story at the nearby Royal Theatre. (Not at Storytellers Café — that breakfast is Mickey and pals.)',
  },
  {
    q: 'Where can I meet Peter Pan?',
    a: 'Castle Courtyard and the Fantasyland path at Disneyland Park — roaming.',
  },
  {
    q: 'Where can I meet Captain Hook?',
    a: 'Castle Courtyard and Small World Promenade at Disneyland Park.',
  },
  {
    q: 'Where can I meet Doctor Strange?',
    a: 'The Ancient Sanctum in Avengers Campus at Disney California Adventure.',
  },
  {
    q: 'Where can I meet Tinker Bell at Disneyland?',
    a: 'Pixie Hollow in Fantasyland, just off the castle hub — recently refurbished, indoor and shaded, and reliably one of the shortest lines in the park. Strong pick for a 3-year-old.',
  },
  {
    q: 'Where can I meet Bluey and Bingo?',
    a: "Fantasyland Theatre at Disneyland Park, inside Bluey's Best Day Ever — no formal meet line; they come close to the audience during the show.",
  },
  {
    q: 'Where can I meet Kylo Ren?',
    a: "Star Wars Launch Bay in Tomorrowland at Disneyland Park — he moved there from Galaxy's Edge in April 2026.",
  },
  {
    q: 'Where can I meet Chewbacca?',
    a: "Two spots at Disneyland Park: Black Spire Outpost in Galaxy's Edge, or Star Wars Launch Bay in Tomorrowland. Launch Bay is indoor and usually shorter.",
  },
  {
    q: 'Where can I meet R2-D2?',
    a: "Star Wars: Galaxy's Edge at Disneyland Park — roaming Black Spire Outpost with a handler.",
  },
  {
    q: 'Where can I meet the BDX droids?',
    a: "Star Wars: Galaxy's Edge at Disneyland Park — free-roaming since they returned May 22, 2026. No line; you either cross paths or you don't.",
  },
  {
    q: 'Where can I meet Ahsoka Tano?',
    a: "Star Wars: Galaxy's Edge at Disneyland Park — Black Spire Outpost, added in the April 2026 roster refresh.",
  },
  {
    q: 'Where can I meet Rey?',
    a: "Black Spire Outpost in Star Wars: Galaxy's Edge at Disneyland Park, Resistance side near the X-Wing.",
  },
  {
    q: 'Where can I meet Stormtroopers?',
    a: "They patrol the First Order side of Black Spire Outpost in Galaxy's Edge at Disneyland Park.",
  },
  {
    q: 'Can you meet characters at the Disneyland gates before opening?',
    a: 'Sometimes, yes — Belle, Cinderella, Ariel and Mulan have all been seen greeting guests at the main entrance before rope drop. It is not scheduled and not guaranteed, but it is a genuinely free bonus meet if you arrive early.',
  },
  {
    q: 'Where can I meet Ariel at Disneyland?',
    a: 'The live-action Ariel appears along the promenade at Disneyland Park. No fixed queue — check the app the day you visit.',
  },
  {
    q: 'Where can I meet Pocahontas?',
    a: 'Big Thunder Trail near the Rivers of America in Frontierland at Disneyland Park — roaming, usually a walk-up.',
  },
  {
    q: 'Where else can I meet Tiana besides New Orleans Square?',
    a: 'She also appears near the Mark Twain Riverboat at Disneyland Park, in addition to her regular New Orleans Square spot.',
  },
  {
    q: 'Where can I meet Clarabelle Cow?',
    a: "Storytellers Cafe at the Grand Californian, during Clarabelle's Enchanted Halloween Dinner — Halloween Time evenings only.",
  },
  {
    q: 'Where can I meet Alice and the Mad Hatter?',
    a: 'Around the Mad Tea Party in Fantasyland at Disneyland Park — roaming walk-ups, rarely more than 15 minutes.',
  },
  {
    q: 'Where can I meet the Fairy Godmother?',
    a: 'Castle Courtyard near Bibbidi Bobbidi Boutique in Fantasyland at Disneyland Park.',
  },
  {
    q: 'Where can I meet Judy Hopps and Nick Wilde?',
    a: 'San Fransokyo Square at Disney California Adventure — they roam the waterfront stretch near Grizzly River Run.',
  },
  {
    q: 'Where can I meet Joy and Sadness?',
    a: 'Pixar Pier at Disney California Adventure, near Inside Out Emotional Whirlwind.',
  },
  {
    q: 'Where can I meet Snow White?',
    a: "Royal Hall at Fantasy Faire, or near Snow White's Wishing Well in Fantasyland at Disneyland Park.",
  },
  {
    q: 'Where can I meet Mike and Sulley?',
    a: 'Hollywood Land at Disney California Adventure, near the Monsters, Inc. attraction.',
  },
  {
    q: 'Where can I meet Aurora or Rapunzel?',
    a: 'Royal Hall at Fantasy Faire in Fantasyland, Disneyland Park — three princesses rotate per visit, so ask the cast member at the door who is inside before you queue.',
  },
  {
    q: 'Where can I meet Ant-Man and the Wasp?',
    a: 'Avengers Campus at Disney California Adventure, around the Pym Test Kitchen area.',
  },
  {
    q: 'Where can I meet Cruella or the Evil Queen?',
    a: 'Oogie Boogie Bash at DCA only — they work the villains trick-or-treat trails. Not available on a regular park ticket.',
  },
]

const faqsAll = [...faqsGeneral, ...faqsLookup]

// ─── ItemList schema items (every character × location for SEO) ─────────────
const characterListItems = characters.flatMap((c) =>
  c.locations.map((loc) => ({
    name: c.name,
    description: `${loc.spot} · ${loc.land} · ${loc.park === 'DL' ? 'Disneyland Park' : 'Disney California Adventure'} · ${RELIABILITY_LABEL[loc.reliability]}`,
  }))
)

// Status chips are computed per request rather than baked in at build time, so
// the page tells the truth on Nov 1 without anyone shipping a code change.
const STATUS_CLASS: Record<SeasonalStatus, string> = {
  active: 'seasonal-status is-active',
  upcoming: 'seasonal-status is-upcoming',
  ended: 'seasonal-status is-ended',
}

export default function CharactersPage() {
  const seasonalEvents = sortedSeasonalEvents()
  const plazaInnPause = currentNote('plaza-inn-pause')
  const hauntedMansionNote = currentNote('haunted-mansion-conversion')

  return (
    <>
      <BreadcrumbJsonLd path="/characters" />
      <ArticleJsonLd
        path="/characters"
        headline="Disneyland Character Meet-and-Greets: Where to Find Every Character (2026)"
        description="Complete 2026 guide to character meet-and-greets at Disneyland and DCA. Every location, every line wait, every character worth meeting with kids ages 2-8."
        datePublished="2026-04-15"
        dateModified={UPDATED.date}
      />
      <FaqJsonLd items={faqsAll} />
      <ItemListJsonLd
        path="/characters"
        name="Disneyland Resort Characters by Location (2026)"
        items={characterListItems}
      />

      <header className="hero hero--home">
        <Image src="/characters.jpg" alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-content">
          <div className="hero-badge">🐭 Character Meet-and-Greets</div>
          <h1>Disneyland Character Meet-and-Greets: Where to Find Every Character (2026)</h1>
          <p className="hero-sub">
            Every character at Disneyland and DCA — where they meet, how long the line runs, and
            whether they're worth it for kids ages 2-8. Search by name, browse by park, or filter by
            your kid's age. Updated for Bluey at the Fantasyland Theatre, the April 2026 Star Wars
            roster shuffle, and Halloween Time.
          </p>
          <p className="hero-verified">
            Last verified <time dateTime={UPDATED.date}>{UPDATED.long}</time> — dates, locations and
            prices on this page are checked against Disney&rsquo;s published schedule, not copied
            forward.
          </p>
        </div>
      </header>

      <nav aria-label="On this page" className="jump-nav">
        <span className="jump-nav-label">Jump to</span>
        <a className="jump-nav-chip" href="#find-character">
          🔍 Find a character
        </a>
        <a className="jump-nav-chip" href="#plan">
          📱 Plan your meet
        </a>
        <a className="jump-nav-chip" href="#bluey">
          🐶 Bluey
        </a>
        <a className="jump-nav-chip" href="#launch-bay">
          🚀 Launch Bay
        </a>
        <a className="jump-nav-chip" href="#dining">
          🍽 Character dining
        </a>
        <a className="jump-nav-chip" href="#seasonal">
          🎃 Seasonal
        </a>
        <a className="jump-nav-chip" href="#real-talk">
          😅 Real-talk tips
        </a>
        <a className="jump-nav-chip" href="#faq">
          ❓ FAQ
        </a>
      </nav>

      {/* ────────────── SECTION 1: Find a character (search + by-location combined) ────────────── */}
      <section className="section" id="find-character">
        <div className="section-header">
          <span className="section-icon">🔍</span>
          <h2>Find a Character</h2>
          <p className="section-intro">
            Every character across both parks. Search by name, filter by park or your kid's age,
            then flip to <strong>By location</strong> to plan your walking route land-by-land. Every
            entry has a typical line length and a dad-tested note.
          </p>
        </div>

        <CharacterFinder />
      </section>

      {/* ────────────── SECTION 2: Plan your meet (consolidated essentials) ────────────── */}
      <section className="section" id="plan">
        <div className="section-header">
          <span className="section-icon">📱</span>
          <h2>How to Actually Plan a Character Meet</h2>
          <p className="section-intro">
            Four things every first-time parent should understand before spending a minute in any
            character line.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">1</div>
            <div>
              <h3>The Disneyland app is the map</h3>
            </div>
          </div>
          <p>
            Open the app, tap the map, filter by <strong>Characters</strong> — you'll see who's out
            now and where. Tap a character for today's scheduled meet windows. Schedules shift
            throughout the day, so re-check every couple of hours. There is{' '}
            <strong>no Lightning Lane for characters</strong> — all meets are standby.{' '}
            <Link href="/lightning-lane">Lightning Lane Multi Pass</Link> only applies to rides.
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
            <strong>Scheduled</strong> (Mickey at Town Square, Anna &amp; Elsa, Royal Hall
            princesses): posted meet windows, designated line, 20–90 min waits.{' '}
            <strong>Roaming</strong> (Alice, Mad Hatter, Peter Pan, Woody, Jessie, Pocahontas):
            walk-ups in their land, almost always under 15 min. The app shows roaming pins too.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">3</div>
            <div>
              <h3>Tier-1 demand: rope drop or after 4 PM</h3>
            </div>
          </div>
          <p>
            The five biggest waits at the resort: <strong>Mickey at Town Square</strong>,{' '}
            <strong>Anna &amp; Elsa</strong>, <strong>Royal Hall princesses</strong>,{' '}
            <strong>Spider-Man's rooftop drop</strong>, and{' '}
            <strong>Jack &amp; Sally during Halloween Time</strong>. Be in line within 10 min of
            park open, or come back after 4 PM. Anything between 10 AM and 3 PM is a 45+ min
            commitment. Pick <em>one</em> must-meet per kid per day — bump into the rest by walking.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">4</div>
            <div>
              <h3>PhotoPass is included with Multi Pass</h3>
            </div>
          </div>
          <p>
            If you bought <Link href="/lightning-lane">Multi Pass</Link> ($34/person), every Disney
            PhotoPass photo at every meet auto-attaches to your account. Free. Let the photographer
            handle it so your kid actually looks at the character. On its own, PhotoPass runs about
            $24.99 for a single day of downloads or $78 for a one-week unlimited package — but since
            it's bundled free with Multi Pass, that's the better value for most families with kids
            4+.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 2.5: Bluey (no formal meet — the parent-critical bit) ────────────── */}
      <section className="section" id="bluey">
        <div className="section-header">
          <span className="section-icon">🐶</span>
          <h2>Bluey at Disneyland: Read This Before You Promise Anything</h2>
          <p className="section-intro">
            The newest character addition for the 2–6 crowd, and the one most likely to cause a
            meltdown if nobody explains how it actually works.
          </p>
        </div>

        <div className="callout warning">
          <div className="callout-label">There is no Bluey meet and greet</div>
          <p>
            This is the part that catches parents out. There is{' '}
            <strong>no formal meet, no queue, and no photo line</strong> for Bluey and Bingo.
            Instead they come down closer to the audience during segments of{' '}
            <strong>Bluey&rsquo;s Best Day Ever</strong>, and that proximity is where your photo
            comes from. If your 3-year-old has been promised a hug in a line, have that conversation
            at the hotel — not at the theatre doors.
          </p>
        </div>

        <div className="tip-card">
          <h3>What the show actually is</h3>
          <p>
            <strong>Bluey&rsquo;s Best Day Ever</strong> opened <strong>March 22, 2026</strong> and
            runs through the year at the <strong>Fantasyland Theatre</strong> in Disneyland Park,
            which has been transformed into Bluey&rsquo;s school. Expect{' '}
            <strong>The Grannies</strong>, dancing with <strong>Chattermax</strong>, and
            Bluey-inspired food next door at <strong>Troubadour Tavern</strong>. It&rsquo;s included
            with park admission.
          </p>
          <p>
            <strong>The strategy is seating, not queuing.</strong> Get there early enough to sit
            close and on an aisle, and have the camera out before it starts — you will not get a
            second run at it. Showtimes post daily in the Disneyland app.
          </p>
          <p>
            Full breakdown, including how it compares to a real meet:{' '}
            <Link href="/characters/bluey-disneyland">
              our guide to Bluey&rsquo;s Best Day Ever at Disneyland
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 2.6: Star Wars Launch Bay ────────────── */}
      <section className="section" id="launch-bay">
        <div className="section-header">
          <span className="section-icon">🚀</span>
          <h2>Star Wars Launch Bay: The Air-Conditioned One Nobody Mentions</h2>
          <p className="section-intro">
            Indoor, shaded, usually a short line, and in Tomorrowland rather than Galaxy&rsquo;s
            Edge. In August this is the single best character-planning move on this page.
          </p>
        </div>

        <div className="tip-card">
          <h3>Who meets there, and what changed in 2026</h3>
          <p>
            <strong>Chewbacca</strong> and — since <strong>April 2026</strong> —{' '}
            <strong>Kylo Ren</strong>, who moved over from Galaxy&rsquo;s Edge. That shift turned
            Kylo from a sporadic roaming moment into a photo you can actually plan on.{' '}
            <strong>Darth Vader no longer meets here.</strong>
          </p>
          <p>
            The Galaxy&rsquo;s Edge roster changed in the same refresh:{' '}
            <strong>Vi Moradi stopped appearing</strong> as of April 29, 2026, and original-trilogy
            characters were added alongside the existing lineup — Rey, Chewbacca, R2-D2, The
            Mandalorian, Grogu, Ahsoka and Stormtroopers. Disney keeps the eras separate on purpose,
            so <strong>you won&rsquo;t see characters from different timelines together</strong>.
            The <strong>BDX droids returned May 22, 2026</strong> and free-roam the land.
          </p>
          <p>
            <strong>Dad math:</strong> same Chewbacca, half the wait, and you&rsquo;re standing in
            air conditioning instead of on black pavement in Black Spire. If your kid just wants the
            photo, take Launch Bay and spend the saved hour on a ride.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 3: Character Dining ────────────── */}
      <section className="section" id="dining">
        <div className="section-header">
          <span className="section-icon">🍽</span>
          <h2>Character Dining: Worth It or Skip?</h2>
          <p className="section-intro">
            One character meal per first trip is the right move. Here's how the four resort options
            compare so you can pick the right one for your kid.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🍳</div>
            <div>
              <h3>Plaza Inn character breakfast — Disneyland Park</h3>
            </div>
          </div>
          <p>
            <strong>~$55 adults / ~$33 kids.</strong> Bright Victorian dining room on Main Street.{' '}
            <strong>Characters:</strong> Minnie, Pooh, Tigger, Eeyore, Captain Hook, rotating cast.
          </p>
          <p>
            Plaza Inn already serves the best food in the park (the lunch fried chicken is
            legendary). 4–5 characters in one sitting replaces 5 separate 20-min lines.{' '}
            <strong>Book the 8:00 AM seating</strong> — best character access, and the part most
            people miss: a character-dining reservation at or before park opening normally gets you
            in through the dedicated character-dining turnstiles on the{' '}
            <strong>left side of the main entrance</strong>. That is effectively early park entry,
            and it is worth more than the meal.
            {plazaInnPause && (
              <>
                {' '}
                <em>{plazaInnPause.text}</em> That early-entry perk is unavailable while the
                character dining is paused.
              </>
            )}
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🌲</div>
            <div>
              <h3>Storytellers Café — Grand Californian Hotel</h3>
            </div>
          </div>
          <p>
            <strong>~$59 adults / ~$36 kids.</strong> Gorgeous forest-themed room, calmer than Plaza
            Inn. <strong>Characters:</strong> Mickey in his explorer outfit plus Chip &amp; Dale and
            friends — <strong>no princesses here</strong>, despite a common mix-up. No park ticket
            needed — great for arrival or departure day. Breakfast is the year-round character meal.{' '}
            <strong>Seasonal:</strong> during Halloween Time it also hosts{' '}
            <strong>Clarabelle&rsquo;s Enchanted Halloween Dinner</strong> in the evenings, with
            Clarabelle and friends in seasonal outfits — the only character dinner on this list that
            does not need a park ticket. Outside those two, lunch and dinner are regular service.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">👑</div>
            <div>
              <h3>Disney Princess Breakfast Adventures — Napa Rose, Grand Californian</h3>
            </div>
          </div>
          <p>
            <strong>~$150 per guest (all ages).</strong> This is the actual princess meal — a
            multi-course breakfast where several princesses (a rotating set such as Cinderella,
            Aurora, Belle, Tiana, and Ariel) visit your table, plus a keepsake and craft. Pricey and
            a splurge, but the only sit-down where princesses come to you. No park ticket needed.{' '}
            <strong>Books out fast the moment the 60-day window opens.</strong>
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎪</div>
            <div>
              <h3>Goofy's Kitchen — Disneyland Hotel</h3>
            </div>
          </div>
          <p>
            <strong>~$59 breakfast / ~$64 brunch adults, ~$36–39 kids.</strong> Loud, chaotic buffet
            — peak Disney energy. <strong>Characters:</strong> Goofy always, plus Pluto, Chip &amp;
            Dale, occasional princesses. Food is fine, not great. Best for 4–8 year olds who live
            for the chaos. Both breakfast and dinner are character meals.
          </p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pick one in 10 seconds</div>
          <p>
            Food matters most? <strong>Plaza Inn.</strong> Princess-obsessed kid?{' '}
            <strong>Disney Princess Breakfast Adventures at Napa Rose.</strong> Want Mickey and pals
            without a park ticket? <strong>Storytellers Café.</strong> Chaos-loving 5+ year old?{' '}
            <strong>Goofy's Kitchen.</strong>
            {plazaInnPause && (
              <>
                {' '}
                <strong>Visiting while Plaza Inn is paused?</strong> Every remaining option is a
                hotel meal — Storytellers Café, Napa Rose, or Goofy&rsquo;s Kitchen — and none of
                the three needs a park ticket, so you can book one for an arrival or departure day.
              </>
            )}
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Booking window</div>
          <p>
            <strong>60 days out, 6 AM Pacific exactly</strong> via the Disneyland app. Plaza Inn and
            Storytellers fill in the first 10 minutes — set an alarm. Missed it? Check the app daily
            for cancellations, they pop up constantly. See the full{' '}
            <Link href="/food">food strategy</Link> and the{' '}
            <Link href="/itineraries">3-day itinerary</Link> for where Plaza Inn slots in.
          </p>
        </div>

        <TicketsCTA
          location="characters_dining"
          label="Disneyland tickets affiliate offer — character dining"
        />
      </section>

      {/* ────────────── SECTION 4: Seasonal characters (condensed) ────────────── */}
      <section className="section" id="seasonal">
        <div className="section-header">
          <span className="section-icon">🎃</span>
          <h2>Seasonal Characters: What's Only Out Briefly</h2>
          <p className="section-intro">
            Some of the best meets at the resort only exist for a few weeks per year. Here's the
            full 2026 calendar at a glance — what's running today first, then what's coming, then
            what has already wrapped. Every date below drives the status chip automatically, so this
            list is never stale.
          </p>
        </div>

        {hauntedMansionNote && (
          <div className="callout warning">
            <div className="callout-label">{hauntedMansionNote.label}</div>
            <p>{hauntedMansionNote.text}</p>
          </div>
        )}

        <div className="seasonal-list">
          {seasonalEvents.map((event) => {
            const status = statusFor(event)
            return (
              <article
                key={event.id}
                className={`seasonal-row${status === 'ended' ? ' is-past' : ''}`}
              >
                <div className="seasonal-row-meta">
                  <span className={STATUS_CLASS[status]}>{STATUS_LABEL[status]}</span>
                  <span className="seasonal-row-dates">{event.dateLabel}</span>
                  <span className="seasonal-row-cost">{event.cost}</span>
                </div>
                <h3 className="seasonal-row-title">
                  {event.emoji} {event.title}
                </h3>
                <p>{event.body}</p>
              </article>
            )
          })}
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Best month for pure character variety</div>
          <p>
            <strong>Late September through October.</strong> Halloween Time decor is full, Oogie
            Boogie Bash villains are out, Jack &amp; Sally are meeting, Miguel is at Plaza de la
            Familia, and crowds are at their lowest. See the{' '}
            <Link href="/seasonal">monthly breakdown</Link> for the full calendar.
          </p>
        </div>
      </section>

      {/* ────────────── SECTION 5: Real-talk tips (Parent Reality + Photo Tips combined) ────────────── */}
      <section className="section" id="real-talk">
        <div className="section-header">
          <span className="section-icon">😅</span>
          <h2>Real-Talk Tips from a Dad</h2>
          <p className="section-intro">
            What happens when meets go sideways, plus the small things that turn a forgettable
            character photo into the one you'll print and frame.
          </p>
        </div>

        <h3 className="subsection-title">When meets go wrong</h3>

        <div className="tip-card">
          <h3>The 3-year-old who melts down when Mickey gets too close</h3>
          <p>
            Big costumed characters terrify some toddlers — the face doesn't move, the eyes don't
            blink, the thing is huge. If your kid melts down at the front of the line,{' '}
            <strong>do not force the meet</strong>. Cast members are trained for this; they'll let
            you skip. Try a "face character" first — Belle, Cinderella, Aurora, Peter Pan all look
            like normal humans. Pluto and Fairy Godmother are the gentle big-costume exceptions.
          </p>
        </div>

        <div className="tip-card">
          <h3>When to abort a 90-minute line</h3>
          <p>
            Your kid's tolerance is roughly <strong>their age in tens of minutes</strong>: a
            3-year-old can survive 30 min, a 5-year-old around 50. Past that, you're buying a
            meltdown. If Anna &amp; Elsa posts at 90 and your kid is under 5, <strong>abort</strong>
            . Come back at 4 PM (drops to 30–45) or rope-drop the next morning.
          </p>
        </div>

        <div className="tip-card">
          <h3>Kids who freeze and can't talk</h3>
          <p>
            About half of kids under 6 freeze when they finally face their favorite character. They
            had a whole speech planned and now they can't say a word.{' '}
            <strong>This is normal.</strong> Cast members and characters are pros — they'll fill the
            silence with a hug or a silly pose. Don't push your kid to "talk to Mickey." The photo
            is still magical and they'll replay the moment for weeks.
          </p>
        </div>

        <div className="tip-card">
          <h3>The character your kid loves who isn't out today</h3>
          <p>
            Check the app <strong>the night before</strong> — schedules publish by 9 PM. If Mirabel
            isn't on tomorrow's list and your kid is in full Encanto mode, manage expectations at
            the hotel, not at the turnstiles. "Mirabel isn't visiting today, but we'll see Anna and
            Elsa — they're sisters too!" is a thousand times easier than tears at security.
          </p>
        </div>

        <div className="tip-card">
          <h3>The post-meet emotional crash</h3>
          <p>
            After finally meeting their bullseye character, kids often crash hard 20 min later —
            anticipation dump plus the realization it's over.{' '}
            <strong>Plan a low-stim activity right after</strong>: a Dole Whip on a bench, the
            carousel, a 30-min hotel break. Don't try to jump straight into Big Thunder Mountain
            after Anna &amp; Elsa.
          </p>
        </div>

        <h3 className="subsection-title">Photo tips that actually matter</h3>

        <div className="tip-card">
          <ul style={{ paddingLeft: '1.1rem', display: 'grid', gap: '0.6rem', margin: 0 }}>
            <li>
              <strong>Let the PhotoPass photographer shoot it</strong> — included with Multi Pass.
              Your kid should be looking at the character, not at you behind a phone.
            </li>
            <li>
              <strong>Best light:</strong> Town Square Theater 8–10 AM (east-facing entrance bathed
              in gold light) and Pixar Pier ~90 min before sunset.
            </li>
            <li>
              <strong>Bring a fat Sharpie, not a ballpoint.</strong> Characters in giant gloves
              can't grip a skinny pen. They'll try, and it'll be a disaster.
            </li>
            <li>
              <strong>Ask the handler for a group shot with your phone</strong> — every character
              has one, they'll absolutely do it. Don't hesitate.
            </li>
            <li>
              <strong>Photograph the line, not just the meet.</strong> The anticipation face when
              your kid spots Mickey from 15 feet away is the photo. Not the posed shot.
            </li>
            <li>
              <strong>Skip the autograph book entirely</strong> if you want — a blank photo mat that
              you frame later with the printed PhotoPass shot in the center is a better keepsake.
            </li>
            <li>
              <strong>MagicBand+ does work at Disneyland</strong> — park entry, Lightning Lane
              check-in, and linking PhotoPass shots to your account, same as a phone. The catch:{' '}
              <strong>only MagicBand+</strong>. The original MagicBand and MagicBand 2 from Walt
              Disney World can&rsquo;t be linked to the Disneyland app at all. Since April 2026
              Disney has been winding down on-property MagicBand+ sales as inventory clears, so buy
              online before your trip rather than counting on finding one in the parks — support for
              bands you already own stays in place.
            </li>
          </ul>
        </div>
      </section>

      {/* ────────────── SECTION 6: FAQ (general + character lookup) ────────────── */}
      <section className="section" id="faq">
        <div className="section-header">
          <span className="section-icon">❓</span>
          <h2>Character Meet-and-Greet FAQ</h2>
          <p className="section-intro">
            The most common questions from real parents planning a Disneyland trip with kids 2–8.
            Tap any question to expand.
          </p>
        </div>

        <div className="faq-list">
          {faqsGeneral.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>

        <h3 className="subsection-title" style={{ marginTop: '2rem' }}>
          Quick character lookup
        </h3>
        <p className="section-intro" style={{ marginTop: 0 }}>
          One-line answers for the most-asked "where can I meet…" questions. For full details on any
          character, use the <a href="#find-character">Find a Character</a> search above.
        </p>

        <div className="tip-card">
          <ul className="lookup-list">
            {faqsLookup.map((item) => (
              <li key={item.q}>
                <strong>{item.q}</strong> {item.a}
              </li>
            ))}
          </ul>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Next steps</div>
          <p>
            Build your character plan into a real day with the{' '}
            <Link href="/itineraries">hour-by-hour itineraries</Link>. Cross-check rides for your
            kid's age with the <Link href="/rides">ride-by-ride guide</Link>. Get your first-trip
            basics in the <Link href="/first-visit">first-visit guide</Link>. See the full{' '}
            <Link href="/food">food strategy</Link> for where character dining fits in.
          </p>
        </div>
      </section>

      <TicketsCTA location="characters" />
    </>
  )
}
