import type { Metadata } from 'next'
import Link from 'next/link'
import FaqJsonLd from '@/components/FaqJsonLd'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Top 5 Disneyland Gear Picks for Families (2026)',
  description: 'The best Disney-friendly strollers, phone chargers, stroller fans, and other family gear — parent-tested Top 5 lists. Pack the right stuff.',
  alternates: { canonical: `${SITE_URL}/top-5` },
  openGraph: { url: `${SITE_URL}/top-5`, title: 'Top 5 Disneyland Gear Picks for Families (2026)' },
}

const faqs = [
  {
    q: 'What is the best stroller for Disneyland?',
    a: 'Disneyland requires strollers to be under 31" x 52" and non-wagon. Lightweight umbrella-style or compact travel strollers fit best, fold quickly for rides and monorails, and are easy to lift over curbs.',
  },
  {
    q: 'Do I need a portable phone charger at Disneyland?',
    a: 'Yes. You\'ll use the Disneyland app constantly — Lightning Lane, mobile orders, maps, wait times, PhotoPass. A 10,000+ mAh charger will get you through a full day with phone to spare.',
  },
  {
    q: 'Are stroller fans worth bringing to Disneyland?',
    a: 'In summer, absolutely. Anaheim pavement radiates heat and strollers sit low. A clip-on USB-rechargeable fan is one of the cheapest items you can pack and pays off every 10 minutes on hot days.',
  },
]

const categories = [
  {
    icon: '👶',
    title: 'Best Disney-Friendly Strollers',
    intro: 'Must fit Disney\'s 31" x 52" rule and fold fast for rides, security, and parking trams. Picks coming soon — lightweight compacts and travel-friendly doubles top the list.',
  },
  {
    icon: '🔋',
    title: 'Best Portable Phone Chargers',
    intro: '10,000+ mAh is the sweet spot. Anything smaller won\'t last a full park day with the Disneyland app running. Top picks and reviews coming soon.',
  },
  {
    icon: '💨',
    title: 'Best Stroller Fans',
    intro: 'Clip-on, USB rechargeable, with a flexible neck so you can aim it at a sleeping toddler. Top picks coming soon.',
  },
  {
    icon: '🎒',
    title: 'Best Park Backpacks for Parents',
    intro: 'Holds snacks, a change of clothes, ponchos, and Ziplocs without breaking your shoulders. Top picks coming soon.',
  },
  {
    icon: '🥤',
    title: 'Best Kid Water Bottles',
    intro: 'Leak-proof, easy to refill at park stations, survives being dropped. Top picks coming soon.',
  },
]

export default function TopFivePage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">⭐ Top 5 Lists</div>
        <h1>Top 5 Disneyland Gear Picks for Families</h1>
        <p className="hero-sub">
          Parent-tested gear that actually earns space in your bag — strollers, chargers,
          fans, water bottles, and more. We only rank stuff we'd use ourselves.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">⭐</span>
          <h2>Categories</h2>
          <p className="section-intro">
            Each list includes the top 5 picks, what separates them, and when to pick which.
            Full rankings land shortly — bookmark the page.
          </p>
        </div>

        {categories.map((cat, i) => (
          <div key={i} className="tip-card">
            <div className="tip-card-header">
              <div className="tip-card-icon sky">{cat.icon}</div>
              <div>
                <h3>{cat.title}</h3>
              </div>
            </div>
            <p>{cat.intro}</p>
          </div>
        ))}

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pair With</div>
          <p>Use these picks alongside the full <Link href="/packing-list">packing list</Link> and the <Link href="/saving-money">money-saving tips</Link> for cheaper sources.</p>
        </div>
      </section>
    </>
  )
}
