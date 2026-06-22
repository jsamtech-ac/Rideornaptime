import type { Metadata } from 'next'
import Link from 'next/link'
import PackingChecklist from '@/components/PackingChecklist'
import PrintButton from '@/components/PrintButton'
import DeferredMount from '@/components/DeferredMount'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import HowToJsonLd from '@/components/HowToJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { PACKING_LIST, SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'

const PAGE_FILE = 'src/app/packing-list/page.tsx'

export const metadata: Metadata = {
  title: 'Disneyland Packing List for Kids (2026)',
  description:
    'The Disneyland packing list for families with young kids — every item under $15, each one explained, tap to check off. Start packing the smart way.',
  alternates: { canonical: `${SITE_URL}/packing-list` },
  openGraph: {
    url: `${SITE_URL}/packing-list`,
    title: 'Disneyland Packing List for Kids (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
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
  {
    q: 'Why do I need a portable phone charger at Disneyland?',
    a: "You'll use the Disneyland app constantly — Lightning Lane, mobile orders, maps, wait times, PhotoPass. Your phone will die by 2 PM without a portable charger. Bring at least a 10,000 mAh pack.",
  },
  {
    q: 'Can I bring a reusable water bottle into Disneyland?',
    a: "Yes, and you should. Water in the park runs $5+ a bottle, and free water refill stations are everywhere. Bring a reusable bottle for each person and you'll save $30+ per day for a family.",
  },
  {
    q: 'Should I bring a rain poncho to Disneyland?',
    a: "Yes — pack disposable $1 ponchos from Amazon. Park ponchos cost $15 each. They're also useful for water rides at DCA like Grizzly River Run.",
  },
  {
    q: 'Why pack Ziploc bags for Disneyland?',
    a: 'Gallon-size Ziplocs are the most versatile thing on the list. Use them for wet clothes, half-eaten snacks, and phone protection on water rides.',
  },
  {
    q: 'Do I need layers at Disneyland even in summer?',
    a: 'Yes. Mornings and evenings get cold, even in summer. Air conditioning in rides and restaurants will chill sweaty kids fast. Pack a lightweight blanket or jacket layer per kid.',
  },
  {
    q: 'Do I need an autograph book for Disneyland characters?',
    a: "Optional. Characters in gloves can't grip a regular pen — bring a fat Sharpie if you do the autograph book route. Or skip the book entirely and use the Disneyland app's PhotoPass, which is included with Lightning Lane.",
  },
]

export default function PackingListPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Packing List', path: '/packing-list' },
        ]}
      />
      <ArticleJsonLd
        path="/packing-list"
        headline={'Disneyland Packing List for Kids (2026)'}
        description={
          'The exact packing list a real parent uses for Disneyland with kids 2–8 — what to bring, what to skip, and why.'
        }
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <HowToJsonLd
        name="How to pack for Disneyland with kids"
        description="A parent-tested packing list for a Disneyland day with kids ages 2–8."
        steps={PACKING_LIST.map((p) => ({ name: p.item, text: p.why }))}
      />
      <header className="hero">
        <div className="hero-badge">🎒 Pack Smart</div>
        <h1>Disneyland Packing List for Kids</h1>
        <p className="hero-sub">
          Everything on this list costs under $15 and will save you money, time, or tears. Tap items
          to check them off as you pack.
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

        <p style={{ fontSize: '0.85rem', opacity: 0.75, marginBottom: '1rem' }}>
          This page contains affiliate links. If you buy through them, we earn a small commission at
          no extra cost to you. We only recommend stuff we actually use with our own kids at the
          parks.
        </p>

        <PrintButton label="Print / Save checklist as PDF" />

        <p className="print-brand print-only">
          Disneyland Packing List for Kids · rideornaptime.com/packing-list
        </p>

        <DeferredMount minHeight={800}>
          <PackingChecklist />
        </DeferredMount>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pair With</div>
          <p>
            See the <Link href="/saving-money">money-saving tips</Link> for where to buy this stuff
            cheap, the <Link href="/best-strollers">Top 6 Disneyland-friendly strollers</Link> for
            our ranked stroller picks, the{' '}
            <Link href="/rides">age-by-age Disneyland rides for kids</Link> to preview which rides
            matter for your kid, and the{' '}
            <Link href="/first-visit">Disneyland with kids: the first-time guide</Link> if it's your
            first trip.
          </p>
        </div>
      </section>

      <TicketsCTA location="packinglist" />
    </>
  )
}
