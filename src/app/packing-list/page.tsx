import type { Metadata } from 'next'
import Link from 'next/link'
import PackingChecklist from '@/components/PackingChecklist'
import FaqJsonLd from '@/components/FaqJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Packing List for Kids (2026)',
  description: 'The Disneyland packing list for families with young kids — every item under $15, each one explained, tap to check off. Start packing the smart way.',
  alternates: { canonical: `${SITE_URL}/packing-list` },
  openGraph: {
    url: `${SITE_URL}/packing-list`,
    title: 'Disneyland Packing List for Kids (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Disneyland packing list for kids' }],
  },
}

const faqs = [
  {
    q: 'What should I pack for Disneyland with kids?',
    a: 'The essentials: portable phone charger (10,000+ mAh), reusable water bottles, pre-packed snacks, SPF 50+ stick sunscreen, disposable rain ponchos, gallon Ziploc bags, a change of clothes per kid, and broken-in comfy shoes.',
  },
  {
    q: 'Can I bring snacks into Disneyland?',
    a: 'Yes — outside food and snacks are allowed in the parks. No glass, no alcohol, and the cooler must be reasonable in size. Pre-packed snacks prevent hangry meltdowns in 45-minute lines.',
  },
  {
    q: 'What is the #1 packing mistake families make at Disneyland?',
    a: 'Wearing new shoes. You will walk 8-12 miles per day. New shoes guarantee blisters by noon. Break in your shoes at home for a week before the trip, and pack moleskin for hot spots.',
  },
]

export default function PackingListPage() {
  return (
    <>
      <FaqJsonLd items={faqs} />
      <header className="hero">
        <div className="hero-badge">🎒 Pack Smart</div>
        <h1>Disneyland Packing List for Kids</h1>
        <p className="hero-sub">
          Everything on this list costs under $15 and will save you money,
          time, or tears. Tap items to check them off as you pack.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎒</span>
          <h2>The Checklist</h2>
          <p className="section-intro">
            Stuff the park doesn't sell (or massively overcharges for). Tap to check off.
          </p>
        </div>

        <PackingChecklist />

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pair With</div>
          <p>See the <Link href="/saving-money">money-saving tips</Link> for where to buy this stuff cheap, and the <Link href="/best-strollers">Top 6 Disneyland-friendly strollers</Link> for our ranked stroller picks.</p>
        </div>
      </section>

      <TicketsCTA />
    </>
  )
}
