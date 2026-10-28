import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import ItemListJsonLd from '@/components/ItemListJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import EventCTA from '@/components/EventCTA'
import UpdatedBadge from '@/components/UpdatedBadge'
import {
  SEASONS,
  EVENTS_2026,
  SEASONAL_LAST_REVIEWED,
  SITE_URL,
  type EventSlug,
  type SeasonalEvent,
} from '@/lib/content'

const META_TITLE = 'Disneyland 2026–2027 Events & Best Months to Visit with Kids'
const META_DESCRIPTION =
  'The Disneyland family planner for late 2026 and 2027: Holidays, Lunar New Year, Food & Wine, the 2027 fireworks and parade returns, Halloween Time — with dates and when to book.'

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/seasonal` },
  openGraph: {
    url: `${SITE_URL}/seasonal`,
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: `${SEASONAL_LAST_REVIEWED}T00:00:00.000Z`,
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'When is the best time to go to Disneyland with kids in 2026 and 2027?',
    a: 'Late September and October weekdays are the sweet spot — Halloween Time decor is fully up, Oogie Boogie Bash runs select nights, and crowds are among the lowest of the year now that schools are back. Honorable mentions: early May (pre-summer warmth, weekdays), late April (after spring break), and Jan 5–21 (the post-holiday lull). If nighttime shows matter to you, aim for February 2027 or later, when Remember… Dreams Come True and World of Color return.',
  },
  {
    q: 'What months should I avoid Disneyland?',
    a: "July (peak heat plus peak summer crowds), early-to-mid August before schools restart, all of March (rolling spring break across the US), Thanksgiving week (Nov 23–29), and especially Dec 20 through Jan 1 — the parks regularly hit capacity and phase-close entry. Presidents' Day weekend (Feb 13–15, 2027) is a stealth-crowded week too. Late August can actually be a sweet spot once most districts are back in session.",
  },
  {
    q: 'What are the 2026 Oogie Boogie Bash dates and how much are tickets?',
    a: "Oogie Boogie Bash runs 33 select nights from Aug 18 to Oct 31, 2026 at Disney California Adventure. It's a separately-ticketed hard-ticket party (6pm–11pm). 2026 tickets run $139–$199 depending on date — $139 on select August nights, $159 the standard price for most September and October dates, up to $199 on peak Halloween-weekend nights. Tickets went on sale June 18, 2026 (with a Magic Key pre-sale first), and every October night sold out. 2027 dates aren't announced yet — expect an early-summer on-sale and book day one.",
  },
  {
    q: 'When does Halloween Time start at Disneyland in 2026?',
    a: "Halloween Time runs Aug 21 through Oct 31, 2026 and is included with park admission — no separate ticket needed. You'll get the Haunted Mansion Holiday overlay, the giant Mickey jack-o'-lantern on Main Street, Cars Land Haul-O-Ween, pumpkin beignets, the Mickey & Friends Halloween Cavalcade, Space Mountain Ghost Galaxy, and Halloween Screams fireworks on Fridays through Sundays. Mid-September weekdays are the highest-value window.",
  },
  {
    q: 'When does the Disneyland holiday season start in 2026?',
    a: 'Holidays at the Disneyland Resort run Nov 13, 2026 through Jan 6, 2027. The best-value holiday window is the weekdays of Nov 16–19 (decor up, before Thanksgiving crowds). Avoid Dec 20 through Jan 1 — the parks will phase-close.',
  },
  {
    q: "What is Bluey's Best Day Ever at Disneyland?",
    a: "A live show that opened March 22, 2026 at Fantasyland Theatre. Bluey and Bingo appear with a live cast for musical numbers, Keepy Uppy, and a walk-through Gnome Village and Fairy Garden play space. Included with park admission, and it now runs Thursday through Monday (dark Tuesdays and Wednesdays). It's an absolute must for ages 2–6 who watch the show.",
  },
  {
    q: 'Is the Food & Wine Festival at Disneyland good for kids?',
    a: "Yes — it's included with DCA admission, and food is à la carte at small-plate booths ($7–$12). There's a \"Jr. Chef\" booth each year with kid-focused bites. The 2026 festival ran March 6 – April 27; 2027 dates aren't announced yet. It overlaps with spring break, so aim for the first week of March or the last week of April.",
  },
  {
    q: 'Are there fireworks and parades at Disneyland right now?',
    a: 'Only seasonally. The 70th anniversary ended Aug 9, 2026, and Paint the Night and Wondrous Journeys ended Aug 20. Through Oct 31 there are Halloween Screams fireworks (Fridays–Sundays) and a Halloween cavalcade; Nov 13 – Jan 6 brings Believe… in Holiday Magic and the A Christmas Fantasy parade. In February 2027, Remember… Dreams Come True and World of Color return, and the Magic Happens parade comes back in summer 2027.',
  },
  {
    q: 'Is September really the best-kept secret for Disneyland?',
    a: 'Yes. Schools across the US are back in session, Halloween Time opens Aug 21 so the decor is already up, and Oogie Boogie Bash nights keep the park energy high. Tuesday through Thursday in mid-to-late September consistently rank as the lowest-crowd weekdays of the year outside of January.',
  },
  {
    q: 'How often is this page updated?',
    a: `This page is reviewed quarterly and before each major event window. It was last reviewed ${new Date(`${SEASONAL_LAST_REVIEWED}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}. When Disney confirms new dates for 2027, we refresh the event cards, dates, and month-by-month notes.`,
  },
]

const eventBySlug: Record<EventSlug, SeasonalEvent> = EVENTS_2026.reduce(
  (acc, e) => ({ ...acc, [e.slug]: e }),
  {} as Record<EventSlug, SeasonalEvent>
)

const VERDICT_LABEL: Record<SeasonalEvent['familyVerdict'], string> = {
  'must-see': 'Must-see',
  'worth-it': 'Worth it',
  bonus: 'Nice bonus',
  'skip-with-littles': 'Skip with littles',
}

const DEEP_DIVE_SLUGS: EventSlug[] = [
  'bluey',
  'halloween-time',
  'oogie-boogie-bash',
  'plaza-de-la-familia',
  'holidays',
  'festival-of-holidays',
  'lunar-new-year',
  'nighttime-returns',
  'after-dark',
  'food-and-wine',
  'magic-happens',
]

export default function SeasonalPage() {
  const reviewedFormatted = new Date(`${SEASONAL_LAST_REVIEWED}T00:00:00Z`).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }
  )

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Best Time to Visit', path: '/seasonal' },
        ]}
      />
      <ArticleJsonLd
        path="/seasonal"
        headline={META_TITLE}
        description={META_DESCRIPTION}
        datePublished="2026-04-15"
        dateModified={SEASONAL_LAST_REVIEWED}
      />
      <FaqJsonLd items={faqs} />
      <ItemListJsonLd
        path="/seasonal"
        name="Disneyland 2026–2027 Seasonal Events"
        items={[...EVENTS_2026]
          .sort((a, b) => a.start.localeCompare(b.start))
          .map((e) => ({
            name: e.name,
            description: `${e.dateLabel} at ${e.park === 'Both' ? 'Disneyland Resort' : e.park}. ${e.whatItIs}`,
            ...(DEEP_DIVE_SLUGS.includes(e.slug)
              ? { url: `${SITE_URL}/seasonal#event-${e.slug}` }
              : {}),
          }))}
      />

      <header className="hero hero--home">
        <Image src="/seasonal.jpg" alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-content">
          <div className="hero-badge">📅 2026–2027 Planner</div>
          <h1>Disneyland 2026–2027: Events, Crowds & Best Months to Visit</h1>
          <p className="hero-sub">
            Every seasonal event from now through 2027, family-specific verdicts, and the crowd +
            weather truth for every month. The planner we wish we&apos;d had.
          </p>
          <UpdatedBadge date={SEASONAL_LAST_REVIEWED} />
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎯</span>
          <h2>The Big Picture</h2>
        </div>
        <p className="section-intro">
          Before the month-by-month grind, here&apos;s the big-picture read on the next 12 months.
        </p>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">✅</div>
            <h3>Best months to book</h3>
          </div>
          <p>
            <strong>Late September and October weekdays</strong> — lowest crowds of the year paired
            with full Halloween Time decor. Runner-ups: <strong>Jan 5–21</strong> (post-holiday
            lull), <strong>late April</strong> (after spring break, Food &amp; Wine in full swing),
            and <strong>early May weekdays</strong>.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🚫</div>
            <h3>Months to skip</h3>
          </div>
          <p>
            <strong>All of March</strong> (rolling US spring break), <strong>July</strong> (peak
            heat + peak crowds), and <strong>Dec 20 – Jan 1</strong> — the parks regularly hit
            capacity and stop letting people in. Also watch out for{' '}
            <strong>Presidents&apos; Day weekend (Feb 13–15, 2027)</strong> and{' '}
            <strong>Thanksgiving week (Nov 23–29)</strong>.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">✨</div>
            <h3>What&apos;s next</h3>
          </div>
          <p>
            <strong>Holidays start Nov 13</strong> and run through Jan 6, 2027, with Santa in a new
            Toontown spot — see our <Link href="/holidays">Holidays 2026 guide</Link>. In{' '}
            <strong>February 2027</strong>, Remember… Dreams Come True and World of Color return
            (the 70th-anniversary shows ended in August). <strong>Magic Happens</strong> is back in
            summer 2027. <Link href="/bluey-at-disneyland">Bluey&apos;s Best Day Ever!</Link> keeps
            running Thursday–Monday.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🗓️</span>
          <h2>Event Timeline: Now Through 2027</h2>
        </div>
        <p className="section-intro">
          Every seasonal event at the Disneyland Resort from now through 2027, in chronological
          order. Dates marked TBA follow the 2026 pattern until Disney announces them. Click any
          event for the deep-dive below.
        </p>

        <div className="event-timeline">
          {[...EVENTS_2026]
            .sort((a, b) => a.start.localeCompare(b.start))
            .map((e) => (
              <a
                key={e.slug}
                className="event-timeline-item"
                data-theme={e.theme}
                href={`#event-${e.slug}`}
              >
                <div className="event-timeline-date">
                  <span className="event-timeline-date-ribbon" aria-hidden="true" />
                  {e.dateLabel}
                </div>
                <div className="event-timeline-body">
                  <div className="event-timeline-name">{e.name}</div>
                  <div className="event-timeline-meta">
                    <span>{e.park === 'Both' ? 'Disneyland Resort' : e.park}</span>
                    <span className="sep" aria-hidden="true">
                      •
                    </span>
                    <span>{e.ticketed ? 'Separately ticketed' : 'Included with admission'}</span>
                  </div>
                </div>
                <span className={`verdict-chip ${e.familyVerdict}`}>
                  {VERDICT_LABEL[e.familyVerdict]}
                </span>
              </a>
            ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎪</span>
          <h2>Special Events: Deep Dive</h2>
        </div>
        <p className="section-intro">
          The headline events — what they actually are, the family verdict, and when to book.
        </p>
        <p className="section-footnote">
          Heads up: some event cards include affiliate links to Get Away Today, an authorized
          Disneyland ticket reseller. We earn a small commission if you book — at no extra cost to
          you. Confirm all dates on the official Disney site before booking.
        </p>

        {DEEP_DIVE_SLUGS.map((slug) => {
          const e = eventBySlug[slug]
          if (!e) return null
          return (
            <article
              key={e.slug}
              id={`event-${e.slug}`}
              className="event-card"
              data-theme={e.theme}
            >
              <div className="event-card-ribbon" aria-hidden="true" />
              <div className="event-card-body">
                <div className="event-card-head">
                  <h3 className="event-card-title">{e.name}</h3>
                  <span className={`verdict-chip ${e.familyVerdict}`}>
                    {VERDICT_LABEL[e.familyVerdict]}
                  </span>
                </div>
                <div className="event-card-dates">
                  <span>📅 {e.dateLabel}</span>
                  <span className="event-card-park">
                    {e.park === 'Both' ? 'Disneyland + DCA' : e.park}
                  </span>
                </div>

                {e.ticketed && (
                  <div className="event-card-ticketed">
                    <span>
                      <strong>Ticket:</strong> {e.priceHint ?? 'Separately ticketed'}
                    </span>
                    {e.bookWhen && (
                      <span>
                        <strong>Book when:</strong> {e.bookWhen}
                      </span>
                    )}
                  </div>
                )}

                <div className="event-card-section">
                  <div className="event-card-label">What it is</div>
                  <p>{e.whatItIs}</p>
                </div>

                <div className="event-card-section">
                  <div className="event-card-label">For families</div>
                  <p>{e.kidNotes}</p>
                </div>

                {e.ctaCampaign && e.ctaLabel && (
                  <EventCTA
                    campaign={e.ctaCampaign}
                    label={e.ctaLabel}
                    sub="via Get Away Today — $10 off packages with RIDETIME"
                  />
                )}
              </div>
            </article>
          )
        })}
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🌤</span>
          <h2>Month-by-Month Breakdown</h2>
        </div>
        <p className="section-intro">
          Crowds, weather, and active events for each month's next occurrence (Nov–Dec 2026, then
          2027) — the real planning view.
        </p>

        <div className="season-grid">
          {SEASONS.map((s, i) => (
            <div key={i} className="season-card">
              <div className="season-month">{s.month}</div>
              <div className={`season-verdict ${s.verdict === 'must-go' ? 'go' : s.verdict}`}>
                {s.verdict === 'go' || s.verdict === 'must-go'
                  ? '👍 '
                  : s.verdict === 'avoid'
                    ? '👎 '
                    : '🤷 '}
                {s.crowds} crowds
              </div>
              <div className="month-weather">
                <span className="month-weather-icon" aria-hidden="true">
                  🌡️
                </span>
                <span>
                  {s.weather.highF}° / {s.weather.lowF}°F — {s.weather.note}
                </span>
              </div>
              {s.eventsActive.length > 0 && (
                <div className="season-chips">
                  {s.eventsActive.map((slug) => {
                    const e = eventBySlug[slug]
                    if (!e) return null
                    return (
                      <a key={slug} href={`#event-${slug}`} className={`event-chip ${e.theme}`}>
                        {e.name.split(' – ')[0].split(' (')[0]}
                      </a>
                    )
                  })}
                </div>
              )}
              <div className="season-desc">{s.desc}</div>
              {s.bestWindow && (
                <div className="season-micro best">
                  <strong>Best window:</strong> {s.bestWindow}
                </div>
              )}
              {s.avoidDates && (
                <div className="season-micro avoid">
                  <strong>Avoid:</strong> {s.avoidDates}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🧭</span>
          <h2>Turn This Into a Trip</h2>
        </div>
        <p className="section-intro">
          You&apos;ve picked a month. Now stack the rest of the planning.
        </p>

        <div className="callout pro">
          <div className="callout-label">Pair With</div>
          <p>
            Map out the day with a <Link href="/itineraries">1-, 2-, or 3-day itinerary</Link>,
            decide if <Link href="/lightning-lane">Lightning Lane</Link> is worth it for your ages,
            and check the <Link href="/saving-money">money-saving playbook</Link> — off-peak months
            let you stretch the budget into an extra day. Cross-check picks for your kid's age with
            the <Link href="/rides">age-by-age Disneyland ride guide</Link>. First trip? Start with
            the <Link href="/first-visit">first-visit guide</Link>, then grab the{' '}
            <Link href="/packing-list">packing list</Link>.
          </p>
        </div>

        <div className="callout warning">
          <div className="callout-label">How we keep this fresh</div>
          <p>
            Dates come from official Disneyland press releases, cross-checked with Disney Parks Blog
            and Disney Tourist Blog. We review this page quarterly and before each major event
            window. Last reviewed: <strong>{reviewedFormatted}</strong>. Always confirm on the
            official Disney site before booking.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">❓</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <p className="section-intro">The Disneyland timing questions families ask us most often.</p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <TicketsCTA location="seasonal" />
    </>
  )
}
