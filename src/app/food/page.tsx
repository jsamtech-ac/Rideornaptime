import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { FOOD_SPOTS, SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Best Disneyland Food for Families (2026 — Dad-Tested)',
  description:
    'The Disneyland and DCA food spots worth your money — from Plaza Inn fried chicken to Dole Whip to birria tacos. Mobile order everything. See the list.',
  alternates: { canonical: `${SITE_URL}/food` },
  openGraph: {
    url: `${SITE_URL}/food`,
    title: 'Best Disneyland Food for Families (2026 — Dad-Tested)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: '2026-04-15T00:00:00.000Z',
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'What is the best food at Disneyland?',
    a: "Plaza Inn fried chicken on Main Street is the single best meal in the park — crispy, juicy, with real sides. Dole Whip in Adventureland is non-negotiable. Ronto Wraps in Galaxy's Edge are a top-5 park food.",
  },
  {
    q: 'How does mobile order work at Disneyland?',
    a: 'Open the Disneyland app 30 minutes before you want to eat, pick the restaurant, order ahead, and tap "I\'m Here" when you arrive. You skip the line entirely. It works at nearly every quick-service restaurant in both parks.',
  },
  {
    q: 'Can you bring your own food into Disneyland?',
    a: 'Yes. You can bring food and snacks in — no glass, no alcohol, reasonable cooler size. A family eating 3 meals in the park spends $120-180 per day; packing lunch and snacks cuts that to $40-60.',
  },
]

export default function FoodPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Food & Snacks', path: '/food' },
        ]}
      />
      <ArticleJsonLd
        path="/food"
        headline={'Best Disneyland Food for Families (2026)'}
        description={
          'What to eat at Disneyland with picky kids — quick-service picks, snacks worth the line, and sit-downs that actually work.'
        }
        datePublished="2026-04-15"
        dateModified="2026-04-15"
      />
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🍽 Food Strategy</div>
        <h1>Where to Eat at Disneyland (From a Dad Who's Tried Everything)</h1>
        <p className="hero-sub">
          Mobile order everything. Seriously — open the Disneyland app 30 minutes before you want to
          eat, order ahead, and skip the line. Here are the spots worth your time and money.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🍽</span>
          <h2>The Worth-It List</h2>
        </div>

        <div>
          {FOOD_SPOTS.map((spot, i) => (
            <div key={i} className="food-spot">
              <div className="food-emoji">{spot.emoji}</div>
              <div className="food-info">
                <h3>{spot.name}</h3>
                <div className="food-location">{spot.location}</div>
                <div className="food-desc">{spot.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Free Water</div>
          <p>
            Don't buy bottled water — it's $5+. There are free water refill stations throughout both
            parks. Ask any quick-service restaurant for a free cup of ice water too. Bring reusable
            bottles and save $30+ per day for a family of four. See the{' '}
            <Link href="/packing-list">packing list</Link> for our favorite bottles.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Character Dining</div>
          <p>
            If your kids want to meet characters, book a character breakfast at Plaza Inn or
            Storyteller Cafe (Grand Californian Hotel). You'll meet multiple characters during the
            meal without standing in separate 30-minute lines. Book in advance — but people cancel
            within 24 hours, so keep checking the app if nothing's available.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Meal Timing</div>
          <p>
            Time your meals around crowd waves — see the{' '}
            <Link href="/itineraries">hour-by-hour itineraries</Link> for suggested lunch and dinner
            windows that dodge the rushes.
          </p>
        </div>
      </section>

      <TicketsCTA location="food" />
    </>
  )
}
