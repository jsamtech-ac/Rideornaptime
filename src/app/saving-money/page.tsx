import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'

const PAGE_FILE = 'src/app/saving-money/page.tsx'

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
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'How much are Disneyland tickets right now?',
    a: 'Since Oct 6, 2026, a 1-day, 1-park ticket runs $104 on the cheapest days up to $224 on peak days (tiers: $104, $134, $154, $174, $189, $199, $224). Kids under 3 are free. Lightning Lane Multi Pass is extra — about $35 per person bought in advance, $38+ on the day.',
  },
  {
    q: 'What is the cheapest way to buy Disneyland tickets?',
    a: "Authorized resellers like Undercover Tourist and Get Away Today consistently beat Disney's direct prices — especially on multi-day tickets. California residents should also watch for the limited-run resident ticket deal Disney typically releases early each year (the 2026 version was a 3-day Park Hopper for $249, about $83/day, sold Jan–May) — it sells out fast, so buy the week it drops.",
  },
  {
    q: 'How do I avoid paying for Disneyland parking?',
    a: "Park at Downtown Disney, where a $20+ purchase plus validation gets you 3 free hours (a table-service restaurant validates up to 5) — otherwise it's $10 the first hour and $14 each hour after. Or stay at an off-site hotel on Harbor Blvd with walkable access or a free shuttle. The official theme-park garage is $40/day and adds up fast.",
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
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <header className="hero hero--home">
        <Image src="/save.jpg" alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-content">
          <div className="hero-badge">💰 Save Real Money</div>
          <h1>How to Save Money at Disneyland (Family Guide)</h1>
          <p className="hero-sub">
            Disneyland is expensive. These tips won't make it cheap, but they'll keep you from
            bleeding money on things that don't matter.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">💰</span>
          <h2>Money-Saving Tips</h2>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🎟️</div>
            <div>
              <h3>What tickets cost now (prices from Oct 6, 2026)</h3>
            </div>
          </div>
          <p>
            <strong>1-day, 1-park tickets</strong> are date-based: <strong>$104</strong> on the
            cheapest days, then $134, $154, $174, $189, $199, up to <strong>$224</strong> on peak
            days. The Oct 6 increase only hit the middle tiers (+$5); the $104 and $224 tiers and
            most multi-day tickets didn&apos;t change. <strong>Kids under 3 are free.</strong>
          </p>
          <p>
            <strong>Pick a $104 day if you can</strong> — the cheapest tier shows up on select
            weekdays (November 2026 has several). Lightning Lane Multi Pass is about $35/person
            bought in advance, $38+ day-of.
          </p>
          <p>
            <strong>Magic Key</strong> (annual pass) prices held steady: Inspire $1,899, Believe
            $1,474, the new <strong>Explore Key at $999</strong> (it replaced Enchant), and Imagine
            $599 for SoCal residents.
          </p>
          <p>
            <strong>Deals running now</strong> (check dates before you book): Costco&apos;s 2-Day
            Park Hopper bundle with Lightning Lane Multi Pass and a dining card ($329.99, valid
            through Dec 18, 2026); up to 20% off Disneyland Resort hotels Sunday–Thursday through
            Dec 18 (book by Dec 15); and military tickets at $104 adult / $98 child.
          </p>
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
            beat Disney's direct prices, especially on multi-day tickets. California residents
            should also watch for the resident ticket offer Disney usually releases early in the
            year (the 2026 version was a 3-day Park Hopper for $249) — 2027 offers haven't been
            announced yet.
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
            The official Disneyland theme-park garages are $40/day. Downtown Disney parking runs $10
            the first hour and $14 each additional hour — but a $20+ purchase plus validation earns
            3 free hours, and a table-service restaurant validates up to 5. If you're staying
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
