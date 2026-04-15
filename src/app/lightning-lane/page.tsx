import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Lightning Lane Strategy for Families (2026)',
  description: 'When Lightning Lane Multi Pass is worth it, which rides to book first, and where families waste money. Book smart at Disneyland — start here.',
  alternates: { canonical: `${SITE_URL}/lightning-lane` },
  openGraph: {
    url: `${SITE_URL}/lightning-lane`,
    title: 'Disneyland Lightning Lane Strategy for Families (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'Is Lightning Lane worth it at Disneyland for families?',
    a: 'Yes — Multi Pass ($30-40 per person per day) is worth it for families on both weekdays and weekends. Skip the expensive Premier Pass ($150-400+), which is built for adult solo sprinters, not families with young kids.',
  },
  {
    q: 'What Lightning Lane should I book first?',
    a: "Book the moment you walk through the gates. Priority picks: Mickey & Minnie's Runaway Railway at Disneyland, or Radiator Springs Racers at DCA. Book your next one after 2 hours or immediately after you redeem the first — whichever comes first.",
  },
  {
    q: 'Does Lightning Lane include PhotoPass?',
    a: 'Yes — when you buy Lightning Lane Multi Pass, on-ride photos and PhotoPass photographer downloads are included. Look for photographers at the castle, ride exits, and character meet-and-greets.',
  },
]

export default function LightningLanePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: "Lightning Lane", path: '/lightning-lane' },
        ]}
      />
      <ArticleJsonLd
        path="/lightning-lane"
        headline={"Disneyland Lightning Lane Strategy (2026)"}
        description={"When to buy Lightning Lane Multi Pass, which rides to book first, and how to actually save time at Disneyland with kids."}
        datePublished="2026-04-15"
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">⚡ Lightning Lane</div>
        <h1>Disneyland Lightning Lane Strategy for Families</h1>
        <p className="hero-sub">
          Lightning Lane starts at $30/person/day at Disneyland and changes with demand.
          Here's when it's worth it and when you should save your money.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">⚡</span>
          <h2>Lightning Lane Strategy</h2>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🎯</div>
            <div>
              <h3>Book the second you walk through the gates</h3>
            </div>
          </div>
          <p>Open the Disneyland app the moment you enter the park and book your first Lightning Lane. You can book your next one after 2 hours OR immediately after you use your first reservation — whichever comes first.</p>
          <p>First booking priorities: Mickey &amp; Minnie's Runaway Railway at DL, or Radiator Springs Racers at DCA. See the <Link href="/rides">full ride guide</Link> for which attractions are worth a booking.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">💡</div>
            <div>
              <h3>Family of 4 with kids under 6? Here's your decision tree</h3>
            </div>
          </div>
          <p><strong>Weekdays (low crowd):</strong> Buy Multi Pass. You'll get 6-8 Lightning Lane rides over the day, and the $30/person is worth it to avoid the 3 rides that always have 40+ min waits.</p>
          <p><strong>Weekends &amp; holidays:</strong> Still worth it — prices go up to $35-40/person but wait times jump to 60+ min for everything. The math works out.</p>
          <p><strong>Skip Single Pass for the big headliners</strong> — your little kids probably can't ride them anyway (height requirements). Save that $15-25/person.</p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">📸</div>
            <div>
              <h3>Your Lightning Lane includes PhotoPass</h3>
            </div>
          </div>
          <p>This is an underrated perk. When you buy Lightning Lane Multi Pass, your on-ride photos and downloads from Disney photographers around the park are included. Look for PhotoPass photographers at the castle, near character meet-and-greets, and at ride exits — they'll scan your app and the photos show up automatically.</p>
        </div>

        <div className="callout hot">
          <div className="callout-label">Don't Waste Money On</div>
          <p>Lightning Lane Premier Pass ($150-400+/person). It's designed for adults doing a one-day sprint of every headliner. With young kids, you won't ride enough to justify it. Multi Pass is the sweet spot for families.</p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Pair With</div>
          <p>Use Lightning Lane around your day plan. See the <Link href="/itineraries">hour-by-hour itineraries</Link> for where to slot it in, and the <Link href="/saving-money">money-saving tips</Link> for ways to offset the cost.</p>
        </div>

        <p className="footnote">
          <strong>Note on World of Color:</strong> Virtual Queue (free) opens at 12:00 PM in the app and is separate from Lightning Lane Multi Pass/Single Pass. You must have entered California Adventure (or Disneyland with a Park Hopper) to join. You can also guarantee a viewing spot by booking a World of Color Dining Package at select restaurants. A non-reserved, first-come-first-served standby area is usually available but fills up fast.
        </p>
      </section>

      <TicketsCTA />
    </>
  )
}
