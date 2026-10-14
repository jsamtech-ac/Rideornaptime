import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import UpdatedBadge from '@/components/UpdatedBadge'
import { SITE_URL, HOLIDAYS_LAST_REVIEWED } from '@/lib/content'

const TITLE = 'Holidays at Disneyland 2026 with Kids: Dates, Santa, Shows & Crowd Calendar'
const DESCRIPTION =
  "The family guide to Holidays at the Disneyland Resort, Nov 13, 2026 – Jan 6, 2027: Santa's new Toontown spot, small world Holiday, the parade and fireworks, World of Color – Season of Light, a crowd calendar, and a toddler game plan."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/holidays` },
  openGraph: {
    url: `${SITE_URL}/holidays`,
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    siteName: 'Ride or Naptime',
    locale: 'en_US',
    publishedTime: '2026-10-14T00:00:00.000Z',
    modifiedTime: `${HOLIDAYS_LAST_REVIEWED}T00:00:00.000Z`,
    authors: ['Ride or Naptime'],
  },
}

type Fit = { label: string; tone?: 'caution' | 'big-kids' }

interface HolidayItem {
  title: string
  fit: Fit
  accent?: 'red' | 'gold'
  body: string
}

const whatsNew = [
  {
    emoji: '🎅',
    title: 'Santa moves to Toontown',
    body: "Santa's Disneyland spot is now the Toontown Trolley Barn (Nov 13 – Dec 24) — steps from Runaway Railway and the play areas, so little kids can burn energy while you wait.",
  },
  {
    emoji: '👻',
    title: "Haunted Mansion Holiday's 25th",
    body: 'The Nightmare Before Christmas overlay turns 25, with an anniversary gingerbread music box in the ballroom scene.',
  },
  {
    emoji: '🥞',
    title: 'New character dining at Storytellers',
    body: "Daisy's Holiday Pajama Party (breakfast and brunch) and Mickey's Christmas Carol Feast (dinner) take over Storytellers Café at the Grand Californian.",
  },
  {
    emoji: '🎁',
    title: "Mirabel's Gifts of the Season",
    body: 'A new Encanto moment at DCA during the Festival of Holidays — a sweet stop for the Mirabel fans in your crew.',
  },
  {
    emoji: '🧣',
    title: 'Fresh holiday outfits for the Fab Five',
    body: 'Mickey and friends debut new holiday looks — Town Square at Disneyland and Buena Vista Street at DCA are the photo spots.',
  },
  {
    emoji: '📅',
    title: 'It starts a week earlier',
    body: 'Disney moved the 2026 start up to Nov 13, which means more pre-Thanksgiving weekdays with full decor and lighter crowds.',
  },
]

const disneyland: HolidayItem[] = [
  {
    title: "it's a small world Holiday",
    fit: { label: 'Perfect for ages 2+' },
    body: 'The ride gets holiday lights, a new soundtrack mash-up of "Jingle Bells" and "Deck the Halls," and a glowing facade at night. It\'s on Lightning Lane Multi Pass — worth booking because holiday lines run long. Closed Oct 30 – Nov 12 while the overlay goes in, back Nov 13.',
  },
  {
    title: 'Haunted Mansion Holiday',
    fit: { label: 'Brave 4+, most 6+', tone: 'caution' },
    accent: 'gold',
    body: "Jack Skellington's Christmas takeover — sillier and more colorful than the regular Mansion, but the Oogie Boogie scene still spooks some preschoolers. Runs through early January, then the ride closes Jan 8 – Feb 4, 2027 to remove the overlay.",
  },
  {
    title: '"A Christmas Fantasy" parade',
    fit: { label: 'All ages' },
    accent: 'red',
    body: "Santa's sleigh, toy soldiers, and the Fab Five in the classic daytime holiday parade. Check the app for times and grab a shaded Main Street curb 25–30 minutes early — or use parade time to ride Peter Pan with shorter lines.",
  },
  {
    title: 'Believe… in Holiday Magic fireworks',
    fit: { label: 'Best first fireworks show' },
    accent: 'red',
    body: 'The gentlest nighttime show of the year, and it ends with snow falling on Main Street — the moment most kids remember. Fireworks are not nightly in every season, so confirm the date in the app calendar.',
  },
  {
    title: 'Santa at the Toontown Trolley Barn',
    fit: { label: 'Ages 2–8' },
    body: 'New location for 2026, Nov 13 – Dec 24. Go on a weekday morning in November for the shortest wait, and pair it with Runaway Railway next door.',
  },
  {
    title: 'Sleeping Beauty Castle & Main Street decor',
    fit: { label: 'All ages' },
    accent: 'gold',
    body: 'The castle gets its icicle lights and the Main Street tree goes up — best photos are just after dark. Mobile-order a hot cocoa and take the loop slow.',
  },
]

const dca: HolidayItem[] = [
  {
    title: 'World of Color – Season of Light',
    fit: { label: 'Ages 3+' },
    accent: 'red',
    body: 'The holiday version of the water show at Paradise Bay. Join the free virtual queue in the Disneyland app or book a dining package; front rows get wet, so bring a poncho for the kids.',
  },
  {
    title: 'Disney Festival of Holidays',
    fit: { label: 'All ages' },
    body: "Holiday food marketplaces around the park, ¡Viva Navidad! with Donald, Daisy, Panchito, and José (select days — check the calendar), and Mirabel's Gifts of the Season. Small-plate food booths are great for picky eaters who just want a bite.",
  },
  {
    title: 'Cars Land holiday overlays',
    fit: { label: 'Perfect for ages 2–6' },
    accent: 'gold',
    body: "Mater's and Luigi's get holiday versions with festive music and decor, and Radiator Springs is lit up for the season — Cars Land after dark is one of the prettiest spots in the resort.",
  },
  {
    title: "Santa's Holiday Visit at Redwood Creek",
    fit: { label: 'Ages 2–8' },
    body: "DCA's Santa sets up at Redwood Creek Challenge Trail, Nov 13 – Dec 24 — usually a shorter line than Disneyland's. The trail itself is closed Nov 1 – 12 while it's converted.",
  },
]

const crowdCalendar: {
  dates: string
  level: 'best' | 'ok' | 'busy' | 'avoid'
  tag: string
  note: string
}[] = [
  {
    dates: 'Nov 13–15',
    level: 'busy',
    tag: 'Opening weekend',
    note: 'Locals and Magic Keys show up for the kickoff.',
  },
  {
    dates: 'Nov 16–19',
    level: 'best',
    tag: 'Best window',
    note: 'Mon–Thu, full decor, pre-Thanksgiving lull.',
  },
  {
    dates: 'Nov 20–22',
    level: 'busy',
    tag: 'Busy weekend',
    note: 'Thanksgiving travel starts early.',
  },
  {
    dates: 'Nov 23–29',
    level: 'avoid',
    tag: 'Avoid',
    note: 'Thanksgiving week (Nov 26) — peak crowds and prices.',
  },
  {
    dates: 'Nov 30 – Dec 3',
    level: 'best',
    tag: 'Great',
    note: 'Post-Thanksgiving dip — a sleeper pick.',
  },
  { dates: 'Dec 4–6', level: 'ok', tag: 'Weekend', note: 'Busier, but manageable with rope drop.' },
  { dates: 'Dec 7–10', level: 'best', tag: 'Great', note: 'Weekdays before school breaks begin.' },
  { dates: 'Dec 11–13', level: 'busy', tag: 'Busy weekend', note: 'Holiday-party weekend crowds.' },
  {
    dates: 'Dec 14–17',
    level: 'ok',
    tag: 'Last good stretch',
    note: 'Crowds start climbing as schools let out.',
  },
  {
    dates: 'Dec 18–19',
    level: 'busy',
    tag: 'Ramping up',
    note: 'Winter break begins for many districts.',
  },
  {
    dates: 'Dec 20 – Jan 1',
    level: 'avoid',
    tag: 'Avoid',
    note: 'Parks often hit capacity and pause entry.',
  },
  {
    dates: 'Jan 2–6',
    level: 'ok',
    tag: 'Last days',
    note: 'Crowds ease as schools return; final chance for the overlays.',
  },
]

const sampleDay = [
  {
    time: '7:15 AM',
    title: 'Gates, 45 minutes early',
    body: 'Holiday mornings are the calmest part of the day. Eat breakfast before you go, and dress in layers — mornings dip into the 40s.',
  },
  {
    time: '8:00 AM',
    title: 'Rope drop: Peter Pan, then small world Holiday',
    body: "Peter Pan isn't on Lightning Lane, so ride it first. Book small world Holiday on Multi Pass the moment you tap in.",
  },
  {
    time: '9:30 AM',
    title: 'Santa at the Toontown Trolley Barn',
    body: 'Morning is the shortest wait. Let the kids run in the Toontown play areas afterward while one parent grabs Runaway Railway.',
  },
  {
    time: '12:00 PM',
    title: 'Nap break',
    body: 'Head back to the hotel. Book your next Lightning Lanes from bed — Haunted Mansion Holiday if your kids are 5+.',
  },
  {
    time: 'Afternoon',
    title: 'A Christmas Fantasy parade (check the app)',
    body: "Find a curb 25 minutes early, or skip it and ride Fantasyland while everyone's on Main Street.",
  },
  {
    time: 'Evening',
    title: 'Castle lights, cocoa, and Believe… on show nights',
    body: 'Snow falls on Main Street after the fireworks. If the little one is fading, the Small World plaza is a calmer view with an easy exit.',
  },
]

const closures = [
  "it's a small world — closed Oct 30 – Nov 12 for the holiday overlay (reopens Nov 13).",
  "Redwood Creek Challenge Trail — closed Nov 1 – 12 (reopens Nov 13 as Santa's DCA spot).",
  'Haunted Mansion — closed Jan 8 – Feb 4, 2027 after Holiday comes down.',
  'Indiana Jones Adventure — closed for refurbishment, return date not announced.',
  'Autopia — gas cars must be retired by Feb 1, 2027; expect a closure for the electric switch.',
]

const faqs = [
  {
    q: 'When are the holidays at Disneyland in 2026?',
    a: 'Holidays at the Disneyland Resort run Nov 13, 2026 through Jan 6, 2027 at both Disneyland Park and Disney California Adventure. Santa visits Nov 13 – Dec 24.',
  },
  {
    q: 'Where is Santa at Disneyland in 2026?',
    a: "At Disneyland Park, Santa has a new spot this year: the Toontown Trolley Barn in Mickey's Toontown. At Disney California Adventure, Santa's Holiday Visit is at Redwood Creek Challenge Trail. Both run Nov 13 – Dec 24, 2026.",
  },
  {
    q: 'What is the best week to visit Disneyland for the holidays with kids?',
    a: 'Nov 16–19, 2026 (the Monday–Thursday after opening weekend) is the sweet spot — full decor, Santa is out, and crowds are lighter before Thanksgiving week. Nov 30 – Dec 3 and Dec 7–10 are strong runners-up. Avoid Thanksgiving week (Nov 23–29) and Dec 20 – Jan 1, when the parks often hit capacity.',
  },
  {
    q: 'Is Haunted Mansion Holiday scary for toddlers?',
    a: "It's sillier and brighter than the regular Haunted Mansion, but it's still dark, and the Oogie Boogie scene scares some 2–4 year olds. Most brave 4-year-olds and nearly all 6+ kids love it. If you're unsure, watch a ride-through video together first.",
  },
  {
    q: 'What holiday fireworks and shows are at Disneyland in 2026?',
    a: 'Disneyland has Believe… in Holiday Magic fireworks (with snow on Main Street afterward) and the A Christmas Fantasy parade. Disney California Adventure has World of Color – Season of Light and ¡Viva Navidad! on select days. Check the Disneyland app calendar, since show schedules vary by day.',
  },
  {
    q: 'Is there a separate-ticket Christmas party at Disneyland in 2026?',
    a: "No. Disney hasn't announced an after-hours holiday party (like the old Disney Merriest Nites) for 2026. Everything on this page is included with regular park admission, except character dining.",
  },
  {
    q: 'Is it a small world Holiday on Lightning Lane?',
    a: "Yes — it's a small world is on Lightning Lane Multi Pass (about $35 per person bought in advance). During the holidays its standby line gets long, so it's one of the best Multi Pass bookings for families with toddlers.",
  },
]

function ItemCard({ item }: { item: HolidayItem }) {
  return (
    <div className={`holiday-item${item.accent ? ` ${item.accent}` : ''}`}>
      <div className="holiday-item-head">
        <h3>{item.title}</h3>
        <span className={`holiday-fit${item.fit.tone ? ` ${item.fit.tone}` : ''}`}>
          {item.fit.label}
        </span>
      </div>
      <p>{item.body}</p>
    </div>
  )
}

export default function HolidaysPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Holidays 2026', path: '/holidays' },
        ]}
      />
      <ArticleJsonLd
        path="/holidays"
        headline={TITLE}
        description={DESCRIPTION}
        datePublished="2026-10-14"
        dateModified={HOLIDAYS_LAST_REVIEWED}
      />
      <FaqJsonLd items={faqs} />

      <header className="hero hero--holiday">
        <div className="hero-content">
          <div className="hero-badge">🎄 Holiday Guide for Families</div>
          <div>
            <span className="holiday-dates-pill">❄️ Nov 13, 2026 – Jan 6, 2027</span>
          </div>
          <h1>
            Holidays at Disneyland <span className="highlight">2026</span> with Kids
          </h1>
          <p className="hero-sub">
            Santa&apos;s new spot, small world Holiday, snow on Main Street, and the weeks to go
            (and skip) — the whole season planned around nap time, for kids ages 2–8.
          </p>
          <UpdatedBadge date={HOLIDAYS_LAST_REVIEWED} label="Holiday details checked" />
        </div>
      </header>

      <div className="holiday-stats" role="list" aria-label="Holiday season at a glance">
        <div className="holiday-stat" role="listitem">
          <div className="holiday-stat-label">Season</div>
          <div className="holiday-stat-value">Nov 13 – Jan 6</div>
          <div className="holiday-stat-note">Both parks</div>
        </div>
        <div className="holiday-stat" role="listitem">
          <div className="holiday-stat-label">Santa</div>
          <div className="holiday-stat-value">Nov 13 – Dec 24</div>
          <div className="holiday-stat-note">Toontown + DCA</div>
        </div>
        <div className="holiday-stat" role="listitem">
          <div className="holiday-stat-label">Best week</div>
          <div className="holiday-stat-value">Nov 16–19</div>
          <div className="holiday-stat-note">Mon–Thu, pre-Thanksgiving</div>
        </div>
        <div className="holiday-stat" role="listitem">
          <div className="holiday-stat-label">Avoid</div>
          <div className="holiday-stat-value">Dec 20 – Jan 1</div>
          <div className="holiday-stat-note">Parks hit capacity</div>
        </div>
      </div>

      <section className="section">
        <nav aria-label="On this page" className="jump-nav">
          <span className="jump-nav-label">Jump to</span>
          <a className="jump-nav-chip" href="#new">
            ✨ What&apos;s new
          </a>
          <a className="jump-nav-chip" href="#parks">
            🏰 Park by park
          </a>
          <a className="jump-nav-chip" href="#crowds">
            📊 Crowd calendar
          </a>
          <a className="jump-nav-chip" href="#game-plan">
            🧸 Toddler game plan
          </a>
          <a className="jump-nav-chip" href="#book">
            🎟 Booking
          </a>
          <a className="jump-nav-chip" href="#faq">
            ❓ FAQ
          </a>
        </nav>

        <div className="section-header" id="new">
          <span className="section-icon">✨</span>
          <h2>What&apos;s New for 2026</h2>
          <p className="section-intro">
            Six changes from Disney&apos;s 2026 holiday announcement that matter if you&apos;re
            bringing little kids.
          </p>
        </div>

        <div className="holiday-new-grid">
          {whatsNew.map((n) => (
            <div key={n.title} className="holiday-new-card">
              <span className="holiday-new-tag">New</span>
              <span className="holiday-new-emoji" aria-hidden="true">
                {n.emoji}
              </span>
              <h3>{n.title}</h3>
              <p>{n.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="parks">
        <div className="section-header">
          <span className="section-icon">🏰</span>
          <h2>Park by Park: What to See</h2>
          <p className="section-intro">
            Everything here is included with regular park admission. Each one has our age call so
            you can skip what won&apos;t land with your crew.
          </p>
        </div>

        <h3 className="holiday-park-heading">🎄 Disneyland Park</h3>
        {disneyland.map((item) => (
          <ItemCard key={item.title} item={item} />
        ))}

        <h3 className="holiday-park-heading">🌟 Disney California Adventure</h3>
        {dca.map((item) => (
          <ItemCard key={item.title} item={item} />
        ))}

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Character dining, holiday edition</div>
          <p>
            <strong>Storytellers Café</strong> (Grand Californian) runs Daisy&apos;s Holiday Pajama
            Party for breakfast and brunch and Mickey&apos;s Christmas Carol Feast for dinner.{' '}
            <strong>Goofy&apos;s Kitchen</strong> also does a holiday version (it costs more than
            the regular buffet). Reservations open 60 days out at about 6 AM Pacific and holiday
            dates go fast. Full details on our{' '}
            <Link href="/characters#dining">character dining guide</Link>.
          </p>
        </div>

        <div className="callout">
          <div className="callout-label">🍪 Holiday treats</div>
          <p>
            Holiday menus start Nov 13 across both parks. The easy wins for kids: seasonal beignets
            in New Orleans Square and the small-plate marketplace booths at DCA&apos;s Festival of
            Holidays. Mobile-order everything — holiday food lines are long. More in our{' '}
            <Link href="/food">food guide</Link>.
          </p>
        </div>
      </section>

      <section className="section" id="crowds">
        <div className="section-header">
          <span className="section-icon">📊</span>
          <h2>Holiday Crowd Calendar</h2>
          <p className="section-intro">
            Our week-by-week read for Nov 13, 2026 – Jan 6, 2027, built from past holiday seasons
            and this year&apos;s school calendars. It&apos;s a planning guide, not an official
            Disney forecast.
          </p>
        </div>

        <div className="holiday-calendar">
          {crowdCalendar.map((w) => (
            <div key={w.dates} className="holiday-cal-row">
              <div className="holiday-cal-dates">{w.dates}</div>
              <div className={`holiday-cal-bar ${w.level}`}>
                <strong>{w.tag}</strong>
                {w.note}
              </div>
            </div>
          ))}
        </div>
        <div className="holiday-cal-legend" aria-hidden="true">
          <span className="best">Go</span>
          <span className="ok">OK</span>
          <span className="busy">Busy</span>
          <span className="avoid">Avoid</span>
        </div>

        <div className="callout warning" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Weather check</div>
          <p>
            Anaheim in late November and December averages highs around 68–74°F and lows near
            48–52°F. Kids go from T-shirts at noon to shivering at fireworks — pack a warm layer and
            a poncho. Our <Link href="/packing-list">packing list</Link> has the rest.
          </p>
        </div>
      </section>

      <section className="section" id="game-plan">
        <div className="section-header">
          <span className="section-icon">🧸</span>
          <h2>A Holiday Day with a Toddler</h2>
          <p className="section-intro">
            One sample Disneyland day built around a midday nap. Swap pieces in and out — the order
            is what matters.
          </p>
        </div>

        <ol className="holiday-day">
          {sampleDay.map((step) => (
            <li key={step.title}>
              <div className="holiday-day-time">{step.time}</div>
              <div className="holiday-day-title">{step.title}</div>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="callout pro">
          <div className="callout-label">Want the full hour-by-hour?</div>
          <p>
            Our <Link href="/itineraries">itineraries</Link> cover 1–3 days with and without
            Lightning Lane, and the <Link href="/fireworks">fireworks guide</Link> has the calm
            viewing spots.
          </p>
        </div>
      </section>

      <section className="section" id="book">
        <div className="section-header">
          <span className="section-icon">🎟</span>
          <h2>Closures &amp; Booking Tips</h2>
        </div>

        <div className="callout warning">
          <div className="callout-label">Closures to plan around</div>
          <ul style={{ margin: '0.25rem 0 0 1.1rem', lineHeight: 1.6 }}>
            {closures.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">💵</div>
            <div>
              <h3>What it costs</h3>
            </div>
          </div>
          <p>
            1-day tickets are date-based, from $104 to $224. Mid-November weekdays include some of
            the cheapest dates of the season; the week before Christmas sits in the top tiers. Kids
            under 3 are free. Lightning Lane Multi Pass is about $35/person bought in advance.
            Details on our <Link href="/saving-money">saving money</Link> page.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🏨</div>
            <div>
              <h3>Hotel deal for the early season</h3>
            </div>
          </div>
          <p>
            Disneyland Resort hotels are up to 20% off Sunday–Thursday nights through Dec 18, 2026
            (book by Dec 15) — a nice fit for the Nov 16–19 and Dec 7–10 windows. Staying close
            makes the nap break easy.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">⚡</div>
            <div>
              <h3>Lightning Lane: book small world Holiday first</h3>
            </div>
          </div>
          <p>
            For families with toddlers, small world Holiday is the highest-value Multi Pass booking
            of the season. Then Runaway Railway, and Haunted Mansion Holiday if your kids are 5+.
            Full strategy in the <Link href="/lightning-lane">Lightning Lane guide</Link>.
          </p>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-header">
          <span className="section-icon">❓</span>
          <h2>Holiday FAQ</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="section-intro" style={{ marginTop: '1.5rem' }}>
          Planning a different month? See the{' '}
          <Link href="/seasonal">full 2026–2027 seasonal planner</Link>. Dates come from
          Disney&apos;s official holiday announcement; always confirm showtimes in the Disneyland
          app.
        </p>
      </section>

      <TicketsCTA location="holidays" />
    </>
  )
}
