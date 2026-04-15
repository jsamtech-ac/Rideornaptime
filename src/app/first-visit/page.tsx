import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import ArticleMeta from '@/components/ArticleMeta'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'First Visit to Disneyland: A Family Guide (2026)',
  description: 'Everything a first-time family needs to know before visiting Disneyland — which park is which, how many days, tickets, the Disneyland app, Lightning Lane, rope drop, and the rookie mistakes to avoid.',
  alternates: { canonical: `${SITE_URL}/first-visit` },
  openGraph: {
    url: `${SITE_URL}/first-visit`,
    title: 'First Visit to Disneyland: A Family Guide (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'What is the difference between Disneyland and California Adventure?',
    a: 'They are two separate parks next to each other. Disneyland (DL) is the classic park — castle, Fantasyland, Pirates, Space Mountain, fireworks. California Adventure (DCA) is the second park — Cars Land, Pixar Pier, Avengers Campus, World of Color. For families with young kids, DL is more magical; DCA has bigger thrill rides and better food.',
  },
  {
    q: 'How many days do I need at Disneyland for a first visit with kids?',
    a: 'Two days is the sweet spot — one at Disneyland, one at DCA, with a long midday break each day. One day is doable but punishing. Three days is ideal if you can swing it because day three becomes a relaxed flex day to re-ride favorites.',
  },
  {
    q: 'What should I do before my first Disneyland trip?',
    a: 'Four things: buy tickets (from an authorized reseller for a discount), download the Disneyland app and link your tickets, decide on Lightning Lane Multi Pass, and break in your walking shoes at home. Then pre-book your midday break — hotel nap, pool, or a quiet spot off-site.',
  },
  {
    q: 'What is the biggest first-timer mistake at Disneyland?',
    a: 'Trying to do everything in one day without a midday break. You will walk 8–12 miles, wait in lines in the sun, and by 3 PM the kids (and you) will melt down. A non-negotiable 90-minute midday break saves the trip.',
  },
]

export default function FirstVisitPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: "First Visit Guide", path: '/first-visit' },
        ]}
      />
      <ArticleJsonLd
        path="/first-visit"
        headline={"First Visit to Disneyland with Kids (2026)"}
        description={"A first-timer's guide to Disneyland with kids — what to expect, what to book, and what every rookie parent gets wrong."}
        datePublished="2026-04-15"
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🏰 Start Here</div>
        <h1>Your First Visit to Disneyland: A Family Guide</h1>
        <ArticleMeta datePublished="2026-04-15" dateModified="2026-04-15" />
        <p className="hero-sub">
          Everything a first-time family needs to know before setting foot in the park — which park is which,
          how many days, what to book, and the rookie mistakes that ruin day one.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🗺</span>
          <h2>The Basics (Read This First)</h2>
          <p className="section-intro">
            If you've never been, this 2-minute read saves you hours of googling later.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🏰</div>
            <div>
              <h3>Two parks, one resort</h3>
            </div>
          </div>
          <p>The Disneyland Resort has two separate parks right next to each other: <strong>Disneyland Park (DL)</strong> — the original, with the castle, Fantasyland, Pirates, and fireworks — and <strong>Disney California Adventure (DCA)</strong> — Cars Land, Pixar Pier, Avengers Campus, and World of Color. They share one entrance plaza (the "esplanade").</p>
          <p>For kids 2–8, DL is the more magical park. DCA has better food and bigger thrill rides. Most families do one day at each.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🎟</div>
            <div>
              <h3>Tickets aren't all the same</h3>
            </div>
          </div>
          <p>A single-day ticket only works at one park. A <strong>Park Hopper</strong> lets you bounce between both parks after 11 AM — worth it for 2+ day trips, skip it for a 1-day trip.</p>
          <p><strong>Lightning Lane Multi Pass</strong> is a separate add-on ($30–40/person/day) that lets you skip lines on a bunch of rides — almost always worth it with kids. <Link href="/lightning-lane">Full Lightning Lane breakdown →</Link></p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">📅</div>
            <div>
              <h3>How many days you actually need</h3>
            </div>
          </div>
          <p>One day = blitz, exhausting, you'll miss half the park. <strong>Two days is the sweet spot</strong> — one at each park, with a real midday break. Three days is the dream: two parks plus a flex day to re-ride favorites without a schedule.</p>
          <p>For first-timers with young kids, plan for two days minimum. <Link href="/itineraries">See the 1/2/3-day itineraries →</Link></p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">📱</div>
            <div>
              <h3>Download the Disneyland app before you go</h3>
            </div>
          </div>
          <p>It's non-negotiable. You'll use it for ride wait times, mobile food orders, Lightning Lane bookings, PhotoPass, park maps, and character locations.</p>
          <p>Create an account, link your tickets, and link everyone in your group <em>before</em> you arrive — doing it while standing at the gate in a crowd is miserable.</p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">✅</span>
          <h2>Before You Go — The Checklist</h2>
          <p className="section-intro">
            Do these in the weeks before your trip, not the night before.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">💰</div>
            <div>
              <h3>Buy tickets through an authorized reseller</h3>
            </div>
          </div>
          <p>Get Away Today and Undercover Tourist are the two legit options — same exact tickets, $20–40 cheaper per person than Disney's site. Never buy from Craigslist, Facebook Marketplace, or random "discount" sites. <Link href="/saving-money">More on saving money →</Link></p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🏨</div>
            <div>
              <h3>Pick a hotel close enough to walk back midday</h3>
            </div>
          </div>
          <p>The midday break is the single biggest trip-saver with kids. If your hotel is a 15-minute walk from the gate, you can actually use it.</p>
          <p>Downtown Disney hotels, Harbor Blvd "Good Neighbor" hotels, and the three on-site Disney hotels all qualify. A hotel 20 minutes away by car? You won't go back — and you'll regret it.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">⚡</div>
            <div>
              <h3>Decide on Lightning Lane early</h3>
            </div>
          </div>
          <p>Multi Pass lets you book skip-the-line return times for 7–8 popular rides. With young kids, it pays for itself the first time you skip a 50-minute Peter Pan line.</p>
          <p>Buy it the morning of your visit (7 AM same-day) via the app — it can sell out, so book early. <Link href="/lightning-lane">How to actually use it →</Link></p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">👟</div>
            <div>
              <h3>Break in your shoes for two weeks</h3>
            </div>
          </div>
          <p>You will walk 8–12 miles a day. New shoes = blisters by lunch. Wear the shoes you plan to wear in the park on daily walks for at least two weeks before the trip.</p>
          <p>This is the most universally ignored advice and the most universally regretted.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🎒</div>
            <div>
              <h3>Pack light, but pack smart</h3>
            </div>
          </div>
          <p>Portable phone charger (mandatory — your phone will be dead by 2 PM otherwise), refillable water bottles, snacks, stick sunscreen, a poncho, and a change of clothes per kid. <Link href="/packing-list">Full packing list →</Link></p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">🌅</span>
          <h2>Day One — How the Morning Should Go</h2>
          <p className="section-intro">
            First-time families who nail the morning have a great day. Those who don't spend the whole day catching up.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">⏰</div>
            <div>
              <h3>Arrive 30 minutes before the posted opening</h3>
            </div>
          </div>
          <p>This is called "rope drop." The first hour of the day has the shortest lines of the entire day — you can ride 3–4 headliners in the time that later means one.</p>
          <p>Eat breakfast <em>before</em> you arrive (or grab it in Downtown Disney on the walk in). Do not waste rope drop sitting in a restaurant.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🚪</div>
            <div>
              <h3>Enter through Downtown Disney, not Harbor Blvd</h3>
            </div>
          </div>
          <p>The Harbor Blvd entrance is the crowded one everyone uses. The <strong>Downtown Disney security checkpoint</strong> (on the west side, near the hotels) is faster, less chaotic, and delivers you to the same esplanade. Especially with a stroller, it's a night-and-day difference.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎯</div>
            <div>
              <h3>Pick one priority ride and run to it</h3>
            </div>
          </div>
          <p>Don't wander at rope drop. Decide the night before: at Disneyland, that's usually <em>Mickey &amp; Minnie's Runaway Railway</em>, <em>Peter Pan's Flight</em>, or <em>Rise of the Resistance</em>. At DCA, it's <em>Radiator Springs Racers</em>.</p>
          <p>Get there first, then loop back for the easier rides.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">📲</div>
            <div>
              <h3>Book your first Lightning Lane the moment you're in line</h3>
            </div>
          </div>
          <p>The second you tap through the gate, open the app and book your first Lightning Lane return — typically for a headliner you'd otherwise wait 60+ minutes on. Then book the next one the moment you tap into your first LL.</p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">😴</span>
          <h2>The Midday Break Rule</h2>
          <p className="section-intro">
            The single most important piece of advice on this entire website.
          </p>
        </div>

        <div className="callout warning">
          <div className="callout-label">Non-Negotiable</div>
          <p>From roughly <strong>12:30–3:30 PM</strong>, leave the park. Go back to your hotel. Nap the toddler, let the big kids swim, eat a snack, lie down. Parents who skip the midday break have a 3 PM meltdown, a 5 PM exit, and miss fireworks. Parents who take it watch fireworks with happy kids at 9:30 PM.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🎠</div>
            <div>
              <h3>Can't go back to the hotel?</h3>
            </div>
          </div>
          <p>The next best option is the <strong>Redwood Creek Challenge Trail</strong> at DCA (shaded outdoor playground, rarely crowded) or the <strong>Hollywood Land workshops</strong> (air-conditioned, seating, runs every 30 min).</p>
          <p>Or ride <strong>It's a Small World</strong> or the <strong>Finding Nemo submarine</strong> — long, cool, dark, and the kids will half-nap in your lap. <Link href="/hidden-gems">More quiet spots →</Link></p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">💡</span>
          <h2>In-Park Secrets Every First-Timer Misses</h2>
          <p className="section-intro">
            Small moves that turn a frustrating day into a great one.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🍔</div>
            <div>
              <h3>Mobile-order every meal</h3>
            </div>
          </div>
          <p>Open the app, order 30–45 min before you want to eat, pick a pickup window, walk up and grab it. You skip the 20-minute register line every single time. Plaza Inn, Jolly Holiday, Galactic Grill, Cocina Cucamonga — they all do it.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🔄</div>
            <div>
              <h3>Rider Switch for height-restricted rides</h3>
            </div>
          </div>
          <p>One parent rides while the other waits with the too-short kid. Then you swap — the second parent boards without the line. It's free. Just ask the cast member at the ride entrance. Every first-timer I've talked to wishes they'd known about this on day one.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">📏</div>
            <div>
              <h3>The "too short" return card</h3>
            </div>
          </div>
          <p>If your kid gets measured and doesn't meet the height for a ride, ask for a return card. When they hit the height — later in the trip or on a future visit — they skip the line. Softens the tears in the moment and genuinely makes their day when they come back.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🚼</div>
            <div>
              <h3>Bring a stroller even if you think they've outgrown one</h3>
            </div>
          </div>
          <p>Kids who swore they didn't need a stroller at home will pass out in one by hour four. It doubles as a snack hauler, a nap pod, and a weapon of self-defense against crowd fatigue. Rent or bring one — just have one.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🎆</div>
            <div>
              <h3>Watch fireworks from Galaxy's Edge, not Main Street</h3>
            </div>
          </div>
          <p>Main Street gets packed an hour before showtime and is a nightmare to exit with kids. Galaxy's Edge has the same fireworks overhead with John Williams music piped in, a fraction of the crowd, and a much easier walk back to the gate. <Link href="/fireworks">Best fireworks spots →</Link></p>
        </div>

        <div className="section-header" style={{ marginTop: '2.5rem' }}>
          <span className="section-icon">⚠️</span>
          <h2>Rookie Mistakes to Avoid</h2>
          <p className="section-intro">
            The patterns every first-time family repeats.
          </p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p><strong>Sit-down breakfast in the park.</strong> Burns 90 minutes of the best low-line window of the day. Eat at the hotel, then rope-drop.</p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p><strong>Touring by geography, not priority.</strong> Lines don't respect the map. Ride high-wait rides early and walk-on rides whenever.</p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p><strong>Waiting 45 minutes for a character.</strong> Characters roam the park constantly. Use the app's character finder, or just walk — you'll bump into three before lunch. Save a long line for <em>one</em> must-meet character, not all of them.</p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p><strong>Skipping the midday break "just this once."</strong> You will regret it by 4 PM. Every time.</p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Do This</div>
          <p><strong>Letting the 2-year-old try the big rides first.</strong> Start with Small World, Dumbo, and the Carrousel. Build trust. Pirates and Haunted Mansion can wait till day two (or never — that's fine).</p>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Next Steps</div>
          <p>You've got the basics. Build the actual plan with the <Link href="/itineraries">hour-by-hour itineraries</Link>, check the <Link href="/rides">age-based ride guide</Link> to decide what your kids will love, and dial in <Link href="/lightning-lane">Lightning Lane strategy</Link>. Then <Link href="/packing-list">pack smart</Link> and <Link href="/seasonal">pick the right month</Link>.</p>
        </div>
      </section>

      <TicketsCTA />
    </>
  )
}
