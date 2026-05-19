import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'How to Save Money at Disneyland (Family Guide 2026)',
  description:
    'Real money-saving tips for families at Disneyland — cheaper tickets, cheaper hotels, free parking hacks, and free celebration buttons. Start saving now.',
  alternates: { canonical: `${SITE_URL}/saving-money` },
  openGraph: {
    url: `${SITE_URL}/saving-money`,
    title: 'How to Save Money at Disneyland (Family Guide 2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'What is the cheapest way to buy Disneyland tickets?',
    a: "Authorized resellers like Undercover Tourist and Get Away Today consistently beat Disney's direct prices — especially on multi-day tickets. California residents can sometimes find 3-day park hoppers as low as $68/day vs. $85/day through Disney.",
  },
  {
    q: 'How do I avoid paying for Disneyland parking?',
    a: 'Park at Downtown Disney for free (first 3 hours; some restaurants validate longer) or stay at an off-site hotel on Harbor Blvd with walkable access or a free shuttle. The official garage is $35/day and adds up fast.',
  },
  {
    q: 'Are Disney birthday buttons still free?',
    a: 'Yes. Ask at City Hall (Disneyland) or Guest Relations (DCA) for a free celebration button — birthday, first visit, or anniversary. Cast members give your kids extra attention and small perks all day.',
  },
]

export default function SavingMoneyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Saving Money', path: '/saving-money' },
        ]}
      />
      <ArticleJsonLd
        path="/saving-money"
        headline={'How to Save Money at Disneyland (2026)'}
        description={
          'Real tips from a parent on cutting Disneyland costs — tickets, food, hotels, and souvenirs without ruining the trip.'
        }
        datePublished="2026-04-15"
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">💰 Save Real Money</div>
        <h1>How to Save Money at Disneyland (Family Guide)</h1>
        <p className="hero-sub">
          Disneyland is expensive. These tips won't make it cheap, but they'll keep you from
          bleeding money on things that don't matter.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">💰</span>
          <h2>Money-Saving Tips</h2>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🎟</div>
            <div>
              <h3>Buy tickets from authorized resellers, not Disney</h3>
            </div>
          </div>
          <p>
            Authorized Disney ticket sellers like Undercover Tourist and Get Away Today consistently
            beat Disney's direct prices, especially on multi-day tickets. California residents can
            get 3-day park hoppers for as low as $68/day through these sellers vs $85/day through
            Disney directly.
          </p>
          <p>
            Always check for current deals before buying direct from Disney — the savings add up
            fast for a family of four.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🏨</div>
            <div>
              <h3>Stay off-site within walking distance</h3>
            </div>
          </div>
          <p>
            The Disneyland Hotel and Grand Californian are beautiful but $400-700/night. Hotels on
            Harbor Blvd are a 10-minute walk to the gates and run $150-250/night. The money you save
            pays for an extra park day or <Link href="/lightning-lane">Lightning Lane</Link> for the
            whole family.
          </p>
          <p>
            Key requirement: walkable distance so you can go back for naps without dealing with
            parking or shuttles.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">🚗</div>
            <div>
              <h3>Parking hack: park at Downtown Disney</h3>
            </div>
          </div>
          <p>
            The official Disneyland parking garage is $35/day. Downtown Disney offers free parking
            for the first 3 hours (some restaurants validate for longer). If you're staying
            off-site, check if your hotel offers a shuttle or walkable access to skip parking costs
            entirely.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">🍎</div>
            <div>
              <h3>Bring your own food and snacks</h3>
            </div>
          </div>
          <p>
            You're allowed to bring food into the parks (no glass, no alcohol, reasonable cooler
            size). Pack sandwiches, fruit, and snacks. A family eating 3 meals in the park spends
            $120-180/day on food. Bringing lunch and snacks cuts that to $40-60.
          </p>
          <p>
            Let the kids pick one "special" park meal per day — see the{' '}
            <Link href="/food">food spots worth the splurge</Link>.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon castle">🎂</div>
            <div>
              <h3>Free birthday and celebration buttons</h3>
            </div>
          </div>
          <p>
            Ask at City Hall (Disneyland) or Guest Relations (DCA) for free celebration buttons —
            birthday, first visit, anniversary. Cast members will give your kids extra attention and
            sometimes small perks throughout the day.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Pair With</div>
          <p>
            Go during a low-crowd month from the <Link href="/seasonal">seasonal guide</Link> to
            knock another 20-30% off hotels and tickets. Bringing your own stroller beats $18/day
            park rental — see our{' '}
            <Link href="/best-strollers">best Disneyland strollers for families</Link>.
          </p>
        </div>
      </section>

      <TicketsCTA location="savingmoney" />
    </>
  )
}
