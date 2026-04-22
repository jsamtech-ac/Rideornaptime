import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL, RIDES, type Ride, type Verdict } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Lightning Lane & Rope Drop Guide (2026)',
  description:
    'The family playbook for ages 2–8: what to rope drop, when Multi Pass is worth $136, Rider Switch tricks, and the 2026 rules that actually matter.',
  alternates: { canonical: `${SITE_URL}/lightning-lane` },
  openGraph: {
    url: `${SITE_URL}/lightning-lane`,
    title: 'Disneyland Lightning Lane & Rope Drop Guide (2026)',
    description:
      'The family playbook for ages 2–8. What to rope drop, when Multi Pass pays off, Rider Switch hacks, and the 2026 rule changes that actually matter.',
    type: 'article',
    siteName: 'Ride or Naptime',
    locale: 'en_US',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-20T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'Is Lightning Lane Multi Pass worth it for families with toddlers?',
    a: "On a weekday with kids ages 2–3, usually no. Most Multi Pass rides are the bigger headliners your toddler can't ride, and the Fantasyland classics they love (Peter Pan is the exception) aren't included. Rope-drop Fantasyland at 8 AM and you'll knock out 4 rides in 45 minutes for free. On weekends or with a 4+ year old, Multi Pass is worth the $34/person.",
  },
  {
    q: 'What should I rope drop at Disneyland with kids?',
    a: "Toddlers (ages 2–4): head straight to Fantasyland through the castle for Peter Pan first, then Dumbo, Small World, and Alice. Elementary kids (5–8): Toontown for Mickey & Minnie's Runaway Railway, then backtrack to Fantasyland. Brave 6–8 year olds: Frontierland for Big Thunder, then New Orleans Square for Pirates and Haunted Mansion before 10 AM.",
  },
  {
    q: "What's the best Lightning Lane strategy at Disney California Adventure?",
    a: "DCA's Multi Pass only covers 2–3 rides — the math rarely works for families. Skip Multi Pass. Instead, rope-drop Radiator Springs Racers at 8 AM (15-minute wait vs 90 minutes later) and save $15–30/person on the Single Pass. Use the free World of Color Virtual Queue that opens at noon in the app.",
  },
  {
    q: 'Do kids under 3 need their own Lightning Lane?',
    a: "No. Children under 3 ride free with their group and do not need a Multi Pass or Single Pass. Don't buy one for them.",
  },
  {
    q: 'How does Rider Switch work with Lightning Lane?',
    a: "Rider Switch is free and available at every Disneyland attraction. One adult waits with non-riders, the other rides with the big kids. Then the waiting adult goes through the Lightning Lane entrance with one additional guest — no second wait. It's initiated at the ride (can't reserve ahead). Combine with a Lightning Lane booking and you effectively get two rides for one booking.",
  },
  {
    q: 'Did Early Entry really go away in 2026?',
    a: 'Yes. As of January 5, 2026, Early Entry (the 30-minute head-start for Disneyland Resort hotel guests) is gone. Rope drop is now the only free way to get ahead of crowds — be outside the turnstiles 45 minutes before the posted park open.',
  },
  {
    q: "What's the hotel guest Lightning Lane bonus?",
    a: "Starting January 5, 2026, guests checked into a Disneyland Resort hotel get one free Lightning Lane Multi Pass entry per person, per stay. Spend it on a ride your whole family can do — Peter Pan's Flight or Mickey & Minnie's Runaway Railway are the safest picks.",
  },
  {
    q: 'Should I buy Single Pass for Radiator Springs Racers?',
    a: "Only if you can't rope-drop it. Rope drop at 8 AM = 10–20 minute wait. Standby by 11 AM = 90 minutes. Single Pass runs $15–30/person and is the right call on weekends or if you're arriving mid-morning with a kid tall enough to ride (40\"+).",
  },
]

function verdictCell(v: Verdict) {
  const symbol = v === 'must-do' ? '✓' : v === 'maybe' ? '~' : '✗'
  const label = v === 'must-do' ? 'Must do' : v === 'maybe' ? 'Maybe' : 'Skip'
  return (
    <span
      className={`ride-age ${v}`}
      role="img"
      aria-label={label}
      style={{
        display: 'inline-flex',
        flex: 'none',
        padding: '2px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.85rem',
        fontWeight: 600,
      }}
    >
      <span aria-hidden="true">{symbol}</span>
    </span>
  )
}

const bookItCall: Record<string, string> = {
  "Peter Pan's Flight": 'Book first if not rope-dropping',
  "Mickey & Minnie's Runaway Railway": 'Rope drop it, or book',
  'Haunted Mansion': 'Book midday',
  'Jungle Cruise': 'Book if line > 30 min',
  'Pirates of the Caribbean': 'Book if line > 30 min',
  'Big Thunder Mountain Railroad': 'Book — Rider Switch for shorter kids',
  'Space Mountain': 'Book — Rider Switch for non-riders',
  "Tiana's Bayou Adventure": 'Book — Rider Switch if under 40"',
  'Buzz Lightyear Astro Blasters': 'Book only if line > 30 min',
  'Finding Nemo Submarine Voyage': 'Book only if line > 30 min',
  Autopia: 'Skip — bad payoff',
}

export default function LightningLanePage() {
  const dlMpRides = RIDES.filter((r) => r.park === 'DL' && r.llType === 'MP')

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Lightning Lane', path: '/lightning-lane' },
        ]}
      />
      <ArticleJsonLd
        path="/lightning-lane"
        headline="Disneyland Lightning Lane & Rope Drop Guide (2026)"
        description="The family playbook for ages 2–8: what to rope drop, when Multi Pass is worth $136, Rider Switch tricks, and the 2026 rules that actually matter."
        datePublished="2026-04-15"
        dateModified="2026-04-20"
      />
      <FaqJsonLd items={faqs} />

      <header className="hero">
        <div className="hero-badge">⚡ Lightning Lane + Rope Drop</div>
        <h1>Lightning Lane &amp; Rope Drop Strategies for Families (Ages 2–8)</h1>
        <p className="hero-sub">
          The actual playbook — what to book, when to arrive, who rides what, and where parents burn
          money. Built around the reality that your kid might be 36 inches tall and need a nap at
          noon.
        </p>
      </header>

      {/* ===== SECTION 1: 60-SECOND VERDICT ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <h2>The 60-Second Verdict</h2>
          <p className="section-intro">
            Skip to your kids' age band. The answer changes more than you'd think.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🧸</div>
            <div>
              <h3>Ages 2–3: Skip Multi Pass on weekdays</h3>
            </div>
          </div>
          <p>
            Rope drop does 80% of the work for free. Most Multi Pass rides are headliners your kid
            can't ride (Space Mountain, Big Thunder, Tiana's) and the Fantasyland classics they love
            are mostly <strong>standby-only</strong> — Dumbo, Small World, Alice, Tea Cups,
            Carrousel, Storybook Land. Be at the gates 45 minutes early, head to Fantasyland, and
            knock out 4 rides in the first hour.
          </p>
          <p>
            <strong>Weekends &amp; holidays:</strong> flip the call. Lines hit 40+ minutes for
            everything by 10 AM. Multi Pass pays for itself on Peter Pan's Flight alone.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🎒</div>
            <div>
              <h3>Ages 4–5: Buy Multi Pass. Skip Single Pass.</h3>
            </div>
          </div>
          <p>
            Sweet spot. Now they can ride Peter Pan, Pirates, Jungle Cruise, Haunted Mansion (if
            brave), Runaway Railway, Buzz, and Finding Nemo — all on Multi Pass. You'll clear 6–8
            Lightning Lane rides in a day. Worth the $34/person.
          </p>
          <p>
            <strong>Don't buy Single Pass.</strong> Rise of the Resistance is intense for this age;
            Radiator Springs Racers you can rope-drop instead (more below).
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🧢</div>
            <div>
              <h3>Ages 6–8: Multi Pass + one Single Pass (RSR)</h3>
            </div>
          </div>
          <p>
            Big Thunder, Space Mountain, Indy, Matterhorn, Tiana's — all unlocked. Multi Pass is a
            must. Add a Single Pass for <strong>Radiator Springs Racers</strong> if you're at DCA on
            a weekend or arriving after 9 AM. Rope drop Toontown (Runaway Railway) or Frontierland
            (Big Thunder) depending on your kid's bravery.
          </p>
        </div>
      </section>

      {/* ===== SECTION 2: WHAT'S NEW 2026 ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">📅</span>
          <h2>What Changed in 2026</h2>
          <p className="section-intro">
            The rules you read on a 2025 blog post are wrong — the playbook changed on January 5,
            2026.
          </p>
        </div>

        <div className="callout warning">
          <div className="callout-label">Gone: Early Entry</div>
          <p>
            As of January 5, 2026, Early Entry (the 30-minute head-start for hotel guests) has
            ended. No more sneaking into Fantasyland at 7:30 AM while the park opens at 8. Rope drop
            is now the only free head-start available to anyone.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">New: Hotel Guest Bonus LL</div>
          <p>
            Staying at a Disneyland Resort hotel? You get{' '}
            <strong>one free Lightning Lane Multi Pass entry per person, per stay</strong> (new Jan
            5, 2026). Spend it on a ride everyone can do — Peter Pan's Flight or Mickey &amp;
            Minnie's Runaway Railway — so no one feels left out.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">💵</div>
            <div>
              <h3>Multi Pass pricing is variable</h3>
            </div>
          </div>
          <p>
            Starts at ~$34/person/day and climbs with demand and proximity to your visit.
            <strong> Buy the day before at the latest</strong> — day-of pricing is meaningfully
            higher. Prices hit $40–45/person on peak weekends.
          </p>
          <p>
            <strong>Kids under 3 ride free</strong> with their group — do not buy them a Multi Pass.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Heads Up</div>
          <p>
            Buzz Lightyear Astro Blasters is closing April 2026 and Monsters, Inc. (DCA) is slated
            to close in 2027. DCA's Multi Pass list is already short — three rides — and shrinks
            further once Monsters is gone, which changes the math (see DCA section below).
          </p>
        </div>
      </section>

      {/* ===== SECTION 3: ROPE DROP PLAYBOOK ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🌅</span>
          <h2>The Rope Drop Playbook</h2>
          <p className="section-intro">
            With Early Entry gone, rope drop is the single best free tool in the park. The first 45
            minutes of operating hours are faster than any Lightning Lane the rest of the day.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">⏰</div>
            <div>
              <h3>Arrival math: be outside the turnstiles 45 minutes early</h3>
            </div>
          </div>
          <p>
            Parking tram or Uber drop-off + security + esplanade walk = 30–45 minutes of friction
            between your car and the gate. If the park opens at 8:00 AM,{' '}
            <strong>you're parking at 7:00 AM</strong>. Eat breakfast before you leave — anything
            you try to eat inside eats into rope-drop time.
          </p>
          <p>
            Have the app open with your party linked and a payment method saved <em>before</em> you
            tap in. The first Lightning Lane booking is a reflex, not a decision — you've already
            picked it.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🧸</div>
            <div>
              <h3>Toddler rope drop (ages 2–4) at Disneyland</h3>
            </div>
          </div>
          <p>
            Head straight through the castle to Fantasyland.{' '}
            <strong>Peter Pan's Flight first</strong> — the line hits 60+ minutes by 10 AM and never
            drops. Then Dumbo (90-second ride, absurd lines later), then Small World, then Alice.
            Four rides in the first 45 minutes, all toddler-friendly, all for free.
          </p>
          <p>
            If the line for Peter Pan is already 20+ at rope drop, flip the order: Dumbo first, loop
            back to Peter Pan. Dumbo's line grows faster than anything else in Fantasyland.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🚂</div>
            <div>
              <h3>Elementary rope drop (ages 5–8) at Disneyland</h3>
            </div>
          </div>
          <p>
            Go to Toontown for <strong>Mickey &amp; Minnie's Runaway Railway</strong>. Trackless
            ride, incredible visuals, everyone loves it, and the 8 AM wait is 10 minutes vs. 60+ by
            10 AM. Then backtrack to Fantasyland for Peter Pan before the wall hits.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🤠</div>
            <div>
              <h3>Brave-kid rope drop (ages 6–8) at Disneyland</h3>
            </div>
          </div>
          <p>
            Frontierland → <strong>Big Thunder Mountain</strong> first (Tiana's Bayou Adventure is
            also great here, but its standby moves faster than Big Thunder's). Then walk to New
            Orleans Square for <strong>Pirates</strong> and <strong>Haunted Mansion</strong> before
            10 AM. That's three MP-worthy rides knocked out in the first hour for free — which
            leaves your Multi Pass bookings for the afternoon crunch.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🏎️</div>
            <div>
              <h3>DCA rope drop: the money saver</h3>
            </div>
          </div>
          <p>
            Go straight to <strong>Radiator Springs Racers</strong>. 10–20 minute wait at rope drop
            vs. 75–90 minutes by 11 AM. This single move can save a family of 4 the{' '}
            <strong>$60–120</strong>
            you'd otherwise spend on Single Passes.
          </p>
          <p>
            If your kid is under 40" (can't ride), one parent rope-drops RSR solo via Single Rider
            line while the other takes the kid to <strong>The Little Mermaid</strong> — a walk-on,
            air-conditioned ride 90 seconds away. Reconvene at Pixar Pier.
          </p>
        </div>

        <div className="callout warning">
          <div className="callout-label">Don't Waste Rope Drop On</div>
          <p>
            Rides your kid can't ride. Blowing your first hour on Space Mountain when the 4-year-old
            then has to wait 40 minutes for Dumbo at 10 AM is a bad trade. Match rope-drop picks to
            who's actually with you.
          </p>
        </div>
      </section>

      {/* ===== SECTION 4: FIRST LIGHTNING LANE BOOKING ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">📱</span>
          <h2>Your First Lightning Lane: Exact Playbook</h2>
          <p className="section-intro">
            The first booking window matters more than any other. Here's the 30-second flow.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">✅</div>
            <div>
              <h3>Before the gate (do this the night before)</h3>
            </div>
          </div>
          <p>
            App installed and logged in. Everyone in your party linked to the reservation. Payment
            card saved. Multi Pass purchased the day before (not day-of — prices climb). Phone
            charged. This eliminates 30–60 seconds of friction at the Tip Board.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">⚡</div>
            <div>
              <h3>The 30-second flow</h3>
            </div>
          </div>
          <p>
            Tap through the gate → open Disneyland app → Tip Board → book. Don't browse. You've
            already decided.
          </p>
          <p>
            <strong>First-book priorities:</strong>
            <br />
            <strong>Disneyland:</strong> Mickey &amp; Minnie's Runaway Railway if you're not
            rope-dropping Toontown. Otherwise Peter Pan's Flight — the line only goes up from here.
            <br />
            <strong>DCA:</strong> Monsters, Inc. or Guardians of the Galaxy — Mission: BREAKOUT!,
            depending on kid age. With only a handful of Multi Pass rides at DCA, windows fill fast.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🔁</div>
            <div>
              <h3>The 2-hour clock (and the Modify trick)</h3>
            </div>
          </div>
          <p>
            You can book your <em>next</em> Lightning Lane when one of these happens first:
          </p>
          <p>
            <strong>1.</strong> You tap in to use your current one, OR
            <br />
            <strong>2.</strong> 120 minutes pass since your booking.
          </p>
          <p>
            <strong>Always Modify, never Cancel.</strong> Canceling a Lightning Lane resets your
            2-hour clock from scratch. Modifying swaps it for a different ride in the same park with
            your current eligibility preserved. If your 4-year-old is melting down and you want to
            pivot from Big Thunder to Small World, Modify.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Rider Switch Tap-In</div>
          <p>
            When your party taps in for Lightning Lane and someone's doing Rider Switch, tell the
            cast member. Per community reports, this can reset your 2-hour booking clock — meaning
            you can book your next LL immediately. Always worth asking.
          </p>
        </div>
      </section>

      {/* ===== SECTION 5: DL MULTI PASS RIDE MATRIX ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎢</span>
          <h2>Disneyland Multi Pass: Ride-by-Ride for Ages 2–8</h2>
          <p className="section-intro">
            Which of the Multi Pass rides are worth a booking for your kid's age. Green = go, yellow
            = maybe, red = skip.
          </p>
        </div>

        <div
          style={{ overflowX: 'auto', marginBottom: '1.5rem' }}
          tabIndex={0}
          role="region"
          aria-label="Disneyland Multi Pass ride-by-ride matrix"
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.95rem',
              minWidth: '720px',
            }}
          >
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--ink)' }}>
                <th style={{ padding: '0.6rem 0.5rem' }}>Ride</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Height</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>Age 2</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>Age 4</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>Age 6</th>
                <th style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>Age 8</th>
                <th style={{ padding: '0.6rem 0.5rem' }}>Call</th>
              </tr>
            </thead>
            <tbody>
              {dlMpRides.map((r: Ride) => (
                <tr key={r.name} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <td style={{ padding: '0.6rem 0.5rem' }}>
                    <strong>{r.name}</strong>
                  </td>
                  <td style={{ padding: '0.6rem 0.5rem', whiteSpace: 'nowrap' }}>{r.height}</td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>
                    {verdictCell(r.age2)}
                  </td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>
                    {verdictCell(r.age4)}
                  </td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>
                    {verdictCell(r.age6)}
                  </td>
                  <td style={{ padding: '0.6rem 0.5rem', textAlign: 'center' }}>
                    {verdictCell(r.age8)}
                  </td>
                  <td style={{ padding: '0.6rem 0.5rem' }}>
                    {bookItCall[r.name] ?? 'Book if standby > 30 min'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="footnote">
          <strong>Also on Multi Pass but not on our age matrix:</strong> Matterhorn Bobsleds (42"),
          Indiana Jones Adventure (46"), and Roger Rabbit's Car Toon Spin (no height). Matterhorn
          and Indy are ages 7+ calls — both offer Single Rider lines as a free alternative. Roger
          Rabbit is a spinning dark ride — fine for ages 4+, book if standby exceeds 25 minutes.
          Full age-by-age calls on rides are in the <Link href="/rides">rides guide</Link>.
        </p>
      </section>

      {/* ===== SECTION 6: DCA HARDER MATH ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🌉</span>
          <h2>DCA Multi Pass: The Harder Math</h2>
          <p className="section-intro">
            California Adventure's Multi Pass covers only 2–3 rides. Do the math before you buy.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">The Uncomfortable Truth</div>
          <p>
            Family of 4 × $34 = <strong>$136</strong> for maybe 3 rides saved. That's ~$45 per
            ride-skip, for rides with standby waits that are often under 40 minutes on a weekday.
            Many families should skip DCA Multi Pass entirely.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">✅</div>
            <div>
              <h3>When to buy DCA Multi Pass</h3>
            </div>
          </div>
          <p>
            Weekends. Holiday weeks. Halloween Time (late Sept–Oct). If your kid is a Monsters, Inc.
            superfan — ride it before it closes in 2027. Or if you're doing a one-day DCA blitz and
            want maximum rides between naps.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">❌</div>
            <div>
              <h3>When to skip DCA Multi Pass</h3>
            </div>
          </div>
          <p>
            Weekday visits with kids 2–5. You're arriving after noon. You only plan a half-day at
            DCA. Rope-drop RSR, standby the rest, and take the $136 you saved to dinner at Lamplight
            Lounge instead.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🏁</div>
            <div>
              <h3>Radiator Springs Racers decision tree</h3>
            </div>
          </div>
          <p>
            <strong>Weekday + you can rope-drop</strong> → Don't buy Single Pass. Rope drop.
            15-minute wait.
            <br />
            <strong>Weekend + kid is 40"+</strong> → Buy Single Pass for qualifying riders. Rider
            Switch for the toddler.
            <br />
            <strong>Kid under 40"</strong> → Buy one Single Pass, one adult rides, use Rider Switch
            for the second adult.
            <br />
            <strong>Arriving after 11 AM any day</strong> → Single Pass or Single Rider line.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">World of Color Virtual Queue (FREE)</div>
          <p>
            Opens at <strong>12:00 PM</strong> in the Disneyland app. You must have entered DCA (or
            Disneyland with a Park Hopper) to join. Kids 3+ each need their own virtual queue slot;
            under 3 do not. Have the app open at 11:59 and hit refresh — slots can run out in under
            a minute on busy days.
          </p>
          <p>
            Alternative guaranteed spot: <strong>dining package</strong> at Wine Country Trattoria
            (DCA) or Storytellers Café (Grand Californian Hotel). Book 60 days out on Disneyland.com
            — check current pricing at booking time; it's usually the pricier side of sit-down
            dining.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: RIDER SWITCH ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🔄</span>
          <h2>Rider Switch: The Free Lightning Lane</h2>
          <p className="section-intro">
            If you have a kid who's too short, too scared, or napping, Rider Switch is the most
            valuable free tool you're probably not using.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">👫</div>
            <div>
              <h3>How it works</h3>
            </div>
          </div>
          <p>
            Adult A waits outside with non-riders. Adult B rides with the big kids via standby or
            Lightning Lane. When Adult B finishes, they swap — Adult B takes Adult A plus{' '}
            <strong>up to one additional kid</strong> through the Lightning Lane entrance. No second
            wait.
          </p>
          <p>
            <strong>Unique to Disneyland:</strong> every attraction supports Rider Switch, unlike
            Walt Disney World where it's ride-by-ride.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🎤</div>
            <div>
              <h3>The script</h3>
            </div>
          </div>
          <p>Walk up to the cast member at the attraction entrance (not in advance) and say:</p>
          <p>
            <em>"Can we do Rider Switch? Two adults, three kids — one's too short."</em>
          </p>
          <p>
            They'll tag it in the app. Adult A waits in a designated area (usually near the exit or
            a shaded bench). When Adult B is done, Adult A goes through the LL entrance. The big kid
            who already rode can ride a second time by going with Adult A — Rider Switch lets one
            "re-rider" tag along.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎯</div>
            <div>
              <h3>Where Rider Switch matters most</h3>
            </div>
          </div>
          <p>
            Big Thunder, Space Mountain, Indiana Jones, Matterhorn, Tiana's Bayou Adventure,
            Radiator Springs Racers, and Incredicoaster. Anything with a 40"+ height requirement and
            a non-rider in your party. Less useful on Fantasyland staples your whole family can
            already ride together.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">The Multiplier</div>
          <p>
            Combine Rider Switch with Lightning Lane and you effectively get{' '}
            <strong>two rides for one booking</strong>. Adult B rides with the big kid via LL. Adult
            A then uses Rider Switch to go through the LL entrance with the same big kid (who gets
            to ride twice). On Radiator Springs Racers, this move alone saves ~$60.
          </p>
        </div>
      </section>

      {/* ===== SECTION 8: PARK HOPPER STACKING ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🏨</span>
          <h2>Park Hopper Stacking: The Nap-Window Play</h2>
          <p className="section-intro">
            If you have Park Hoppers and your hotel is walkable, the midday nap is your
            highest-leverage window of the day.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">📋</div>
            <div>
              <h3>The sample schedule</h3>
            </div>
          </div>
          <p>
            <strong>8:00 AM</strong> — Rope drop your starting park (say, DCA for Radiator Springs
            Racers). Book first Lightning Lane the moment you tap in.
          </p>
          <p>
            <strong>10:30 AM</strong> — Book a Lightning Lane in Disneyland (your second park). You
            can only do this when the ride's first available window is{' '}
            <strong>11:00 AM or later</strong> — the park-hopper rule.
          </p>
          <p>
            <strong>12:00 PM</strong> — Leave for the hotel. Kids nap. You keep booking from your
            phone while they're asleep.
          </p>
          <p>
            <strong>12:00–3:00 PM</strong> — Book 2 more Disneyland LLs, spaced roughly 2 hours
            apart. Modify any bookings that don't fit your evening plan (never cancel).
          </p>
          <p>
            <strong>3:00 PM</strong> — Return to Disneyland with 3 Lightning Lanes already stacked
            for the afternoon. Your kids are fresh; the crowd is hitting its afternoon wall. This is
            when the day peaks.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Set the Alarm</div>
          <p>
            Phone alarm every 2 hours from 8:00 AM. When it fires, book the next Lightning Lane.
            Missing a rebook window = losing ~45 minutes of line-skip later.
          </p>
        </div>

        <div className="callout warning">
          <div className="callout-label">Park Hopper Reality Check</div>
          <p>
            You cannot book a Lightning Lane in your second park until its first available window is
            11:00 AM or later. If you're trying to hop by 9 AM, you can't stack — hopping makes most
            sense <em>after</em> your morning rope drop and first-park LL is done.
          </p>
        </div>
      </section>

      {/* ===== SECTION 9: FREE WINS ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎁</span>
          <h2>Free Wins (Things That Cost $0)</h2>
          <p className="section-intro">
            Every minute you save with these is a minute you don't have to pay to save.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🏃</div>
            <div>
              <h3>Single Rider lines</h3>
            </div>
          </div>
          <p>
            Free. You get split from your party and slotted into odd single seats. Available at:
            <strong> Matterhorn Bobsleds</strong> (DL), <strong>Indiana Jones Adventure</strong>
            (DL), <strong>Radiator Springs Racers</strong> (DCA), and sometimes Incredicoaster,
            Grizzly River Run, and Web Slingers (DCA). Ask a cast member if it's open that day — it
            comes and goes.
          </p>
          <p>
            <strong>Parent hack:</strong> while one parent takes the toddler on Dumbo (20-minute
            round trip), the other does Matterhorn Single Rider (10–15 min). Reconvene at the
            carrousel. One parent gets a big-kid ride in without costing family time.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🏨</div>
            <div>
              <h3>Hotel guest bonus Lightning Lane (new 2026)</h3>
            </div>
          </div>
          <p>
            One free Multi Pass entry per person, per stay. Spend it on a ride your{' '}
            <em>whole family</em>
            can do so no one feels left out — Peter Pan's Flight or Mickey &amp; Minnie's Runaway
            Railway are the safest picks. Don't burn it on Big Thunder if your 3-year-old has to sit
            out.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎆</div>
            <div>
              <h3>Ride during the parade or fireworks</h3>
            </div>
          </div>
          <p>
            Wait times drop 30–50% during Magic Happens (afternoon parade) and during nighttime
            spectaculars. If your kids don't care about the parade, this is pure alpha — Fantasyland
            becomes a ghost town for 25 minutes.
          </p>
          <p>
            For fireworks, watching from Galaxy's Edge (they play John Williams music) lets you ride
            the land's attractions right after with short waits — see the{' '}
            <Link href="/fireworks">fireworks guide</Link> for specific viewing spots.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">📱</div>
            <div>
              <h3>Mobile order every meal</h3>
            </div>
          </div>
          <p>
            Every minute saved in a food line is a minute in a ride line. Place orders 30–45 minutes
            before you want to eat. See the <Link href="/food">food guide</Link> for which spots are
            worth the stop.
          </p>
        </div>
      </section>

      {/* ===== SECTION 10: WHERE FAMILIES WASTE MONEY ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">💸</span>
          <h2>Where Families Waste Money</h2>
          <p className="section-intro">
            The easiest money you'll save is the money you don't spend on things that don't work for
            families.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Skip: Premier Pass</div>
          <p>
            $150–400+ per person. Built for adult sprinters doing every headliner in one day. With
            kids 2–8 you physically cannot ride enough attractions to justify it. Multi Pass is the
            right product for families, full stop.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Skip: Single Pass for rides your kid can't ride</div>
          <p>
            Rise of the Resistance has no height requirement but is <em>intense</em> for under-6s —
            blaster effects, lurching motion, stormtrooper scenes. Radiator Springs Racers requires
            40". Buying a Single Pass for a kid who can't or won't ride is setting money on fire.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Skip: DCA Multi Pass on a half-day</div>
          <p>
            Arriving at DCA at 3 PM? Most Lightning Lane windows are gone and you only have 2–3 MP
            rides to pick from to begin with. Save the $136 and standby.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Skip: Buying Multi Pass day-of</div>
          <p>
            Pricing climbs as the visit date approaches. Day-of pricing is usually $5–10 higher per
            person than buying the night before. Family of 4 = $20–40 left on the table. Buy the
            night before at minimum.
          </p>
        </div>
      </section>

      {/* ===== SECTION 11: MONEY MATH ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">🧮</span>
          <h2>The Money Math (Real Numbers)</h2>
          <p className="section-intro">
            Three scenarios, actual dollars. Figure out which one is yours.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🟢</div>
            <div>
              <h3>Family of 4, Disneyland weekday, ages 4 + 7 — BUY</h3>
            </div>
          </div>
          <p>
            <strong>Cost:</strong> $34 × 4 = $136 Multi Pass.
            <br />
            <strong>Value:</strong> 7–8 Lightning Lane rides across a full day. Each saves 30–45
            minutes of line time = <strong>~4 hours saved</strong>. That's the difference between a
            great day and a meltdown. Buy.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🔴</div>
            <div>
              <h3>Family of 4, DCA weekday, ages 2 + 5 — SKIP</h3>
            </div>
          </div>
          <p>
            <strong>Cost:</strong> $136 Multi Pass for 3 eligible rides (2 after Monsters closes).
            Radiator Springs Racers isn't included; it's a separate Single Pass.
            <br />
            <strong>Better play:</strong> Rope drop RSR ($0). Standby Monsters, Inc. and Toy Story
            Midway Mania (each ~25–40 min on a weekday). Spend the $136 on dinner at Lamplight
            Lounge and a Cars Land churro run.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🟡</div>
            <div>
              <h3>Family of 4, Disneyland weekend, ages 6 + 8 — BUY (and more)</h3>
            </div>
          </div>
          <p>
            <strong>Cost:</strong> $40 × 4 = $160 Multi Pass + $25 × 4 Rise of the Resistance Single
            Pass = <strong>$260 total</strong>.<br />
            <strong>Value:</strong> A one-day sprint hitting every headliner. If it's your only day,
            worth it. If you have two or more days, skip Rise of the Resistance Single Pass and
            standby it first thing on day two instead (saves $100).
          </p>
        </div>

        <p className="footnote">
          <strong>Kids under 3 are free.</strong> They ride with your group without a Multi Pass,
          Single Pass, or park ticket. Don't buy them anything. A family of 4 with a 2-year-old
          effectively costs what a family of 3 would on Lightning Lane math.
        </p>
      </section>

      {/* ===== SECTION 12: DAS MENTION ===== */}
      <section className="section">
        <div className="section-header">
          <span className="section-icon">💛</span>
          <h2>A Note on Disability Access Service (DAS)</h2>
        </div>

        <div className="tip-card">
          <p>
            If your child has a developmental disability (autism spectrum, similar cognitive
            conditions) and can't wait in a standard queue,{' '}
            <strong>DAS is a free alternative</strong>. You request a return time comparable to the
            current standby, then come back to ride without the physical wait. Register via video
            chat 2–60 days before your visit; party size is capped at 4 (exceptions for small
            children). Details and eligibility at{' '}
            <a
              href="https://disneyland.disney.go.com/guest-services/disability-access-service/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Disney's official DAS page
            </a>
            .
          </p>
          <p>
            DAS is separate from Lightning Lane — you can use both. This page isn't a DAS authority;
            Disney's policies change and the registration flow is where you'll get the most current
            information.
          </p>
        </div>
      </section>

      <TicketsCTA location="lightninglane" />
    </>
  )
}
