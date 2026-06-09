import type { Metadata } from 'next'
import Link from 'next/link'
import PackingChecklist from '@/components/PackingChecklist'
import DeferredMount from '@/components/DeferredMount'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import HowToJsonLd from '@/components/HowToJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { PACKING_LIST, CATEGORY_ORDER, CATEGORY_META } from '@/data/packingList'
import { SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'

const PAGE_FILE = 'src/app/packing-list/page.tsx'

const TITLE = 'Disneyland Packing List for Families With Young Kids (2026)'
const DESCRIPTION =
  'The Disneyland packing list a real parent actually uses with kids 2–8 — what goes in the bag, what to skip, and what to buy before you go.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/packing-list` },
  openGraph: {
    url: `${SITE_URL}/packing-list`,
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disneyland Packing List for Kids — What to Bring & What to Skip',
    description:
      'Real-parent Disneyland packing list for kids 2–8: the 5 non-negotiables, what to buy before you go, and what to leave at home.',
  },
}

const faqs = [
  {
    q: 'What should I pack for Disneyland with kids?',
    a: 'Start with the five non-negotiables: a portable power bank (10,000mAh), refillable water bottles, disposable rain ponchos, a clip-on stroller fan, and a kid ID wristband with your phone number. From there, layer in sun protection, snacks, blister care, and a change of clothes per young kid.',
  },
  {
    q: 'Can I bring snacks and food into Disneyland?',
    a: 'Yes — Disney explicitly allows outside food and snacks. No glass and no loose ice (use ice packs), and keep coolers a reasonable size. Packing your own food is the single biggest spend you can cut at the parks.',
  },
  {
    q: 'What is the #1 packing mistake families make at Disneyland?',
    a: 'Wearing brand-new shoes. You will walk 8–12 miles a day and new shoes guarantee blisters by noon. Wear shoes already broken in at home and pack moleskin to tape hot spots before they blister.',
  },
  {
    q: 'Why do I need a portable phone charger at Disneyland?',
    a: "You'll use the Disneyland app all day — Lightning Lane, mobile order, the map, wait times, and PhotoPass. Your phone will die by mid-afternoon without a backup. Bring at least a 10,000mAh power bank, ideally one with a built-in cable.",
  },
  {
    q: 'Can I bring a reusable water bottle into Disneyland?',
    a: 'Yes, and you should. Bottled water runs $5+ in the park, but every quick-service counter hands out free cups of ice water — just ask. Bring a bottle per person and a family saves $30+ a day.',
  },
  {
    q: 'Should I bring rain ponchos to Disneyland?',
    a: 'Yes — pack disposable ponchos from a multi-pack. Park ponchos cost around $13 each. They also double as water-ride gear for Grizzly River Run and Tiana’s Bayou Adventure.',
  },
  {
    q: 'What should I NOT pack for Disneyland?',
    a: 'Skip the full-size hard cooler (size limits and a hassle at security), $20 in-park light-up toys (bring glow sticks instead), oversized strollers that break the 31" × 52" size rule, and brand-new shoes.',
  },
  {
    q: 'Do I need layers at Disneyland even in summer?',
    a: 'Yes. Mornings and evenings get cold even in summer, and fireworks crowds wait around for an hour. Air conditioning in rides and restaurants chills sweaty kids fast. Pack a light packable jacket per kid.',
  },
  {
    q: 'Do I need an autograph book for Disneyland characters?',
    a: "Optional. Characters wear gloves and can't grip a skinny pen, so bring a fat marker if you do the autograph route. Or skip the book and use the Disneyland app's PhotoPass, which is included with Lightning Lane.",
  },
]

const SKIP_LIST = [
  {
    name: 'A full-size hard cooler',
    why: 'Bulky, breaks the size rules, and a pain at security. A soft insulated bag does everything you need.',
  },
  {
    name: '$20 in-park light-up toys',
    why: 'Bring a bulk pack of glow sticks and hand them out at the fireworks for pennies each.',
  },
  {
    name: 'An oversized stroller',
    why: 'Strollers must fit within 31" × 52". An oversized stroller gets turned away at the gate — check the rule first.',
  },
  {
    name: 'Brand-new shoes',
    why: 'The fastest way to blisters by noon. Wear shoes already broken in and pack moleskin.',
  },
]

const buyAhead = PACKING_LIST.filter((i) => i.priceAnchor)
const mainCategories = CATEGORY_ORDER.filter((c) => c !== 'non-negotiable')

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
        headline={TITLE}
        description={
          'The exact packing list a real parent uses for Disneyland with kids 2–8 — what to bring, what to buy ahead, what to skip, and why.'
        }
        datePublished="2026-04-15"
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <HowToJsonLd
        name="How to pack for Disneyland with kids"
        description="A parent-tested packing list for a Disneyland day with kids ages 2–8."
        steps={PACKING_LIST.map((p) => ({ name: p.name, text: p.why }))}
      />

      <header className="hero">
        <div className="hero-badge">🎒 Pack Smart</div>
        <h1>{TITLE}</h1>
        <p className="hero-sub">
          Everything here either saves you money, time, or tears at the parks. Tap items to check
          them off as you pack.
        </p>
      </header>

      <section className="section">
        <p className="affiliate-disclosure">
          This page contains affiliate links. If you buy through them, we may earn a small
          commission at no extra cost to you. We only recommend gear we'd actually pack for our own
          kids.
        </p>

        <div className="checklist-group-header">
          <h2>
            <span aria-hidden="true">{CATEGORY_META['non-negotiable'].icon}</span>{' '}
            {CATEGORY_META['non-negotiable'].label}
          </h2>
          <p>{CATEGORY_META['non-negotiable'].intro}</p>
        </div>
        <PackingChecklist categories={['non-negotiable']} />
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎒</span>
          <h2>The Full Bag, by Moment of Need</h2>
          <p className="section-intro">
            Grouped by when you'll reach for it — not by aisle. Tap to check off.
          </p>
        </div>

        <DeferredMount minHeight={1400}>
          <PackingChecklist categories={mainCategories} />
        </DeferredMount>
      </section>

      <section className="section">
        <div className="callout pro">
          <div className="callout-label">Buy Before You Go — Don't Pay Park Prices</div>
          <p>The items where buying ahead saves the most versus in-park markup:</p>
          <ul className="buy-ahead-list">
            {buyAhead.map((item) => (
              <li key={item.id}>
                <strong>{item.name}.</strong> {item.priceAnchor}
              </li>
            ))}
          </ul>
          <p style={{ marginBottom: 0 }}>
            See the <Link href="/saving-money">full money-saving playbook</Link> for where to buy it
            all cheap.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="callout warning">
          <div className="callout-label">What to Skip</div>
          <p>Opinionated, and it'll save you space and money:</p>
          <ul className="skip-list">
            {SKIP_LIST.map((s) => (
              <li key={s.name}>
                <strong>{s.name}.</strong> {s.why}
              </li>
            ))}
          </ul>
        </div>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pair With</div>
          <p style={{ marginBottom: 0 }}>
            Sort your stroller with the{' '}
            <Link href="/best-strollers">top 6 Disneyland-friendly strollers</Link>, plan meals with
            the <Link href="/food">park food strategy</Link>, squeeze the budget with our{' '}
            <Link href="/saving-money">money-saving tips</Link>, and keep that phone alive using the{' '}
            <Link href="/lightning-lane">Lightning Lane guide</Link>.
          </p>
        </div>
      </section>

      <section className="section print-checklist">
        <div className="section-header">
          <span className="section-icon">🖨️</span>
          <h2>The Printable Checklist</h2>
          <p className="section-intro">
            The whole list, condensed. Print it or pin it — tick the boxes as you pack the bag.
          </p>
        </div>
        {CATEGORY_ORDER.map((category) => {
          const items = PACKING_LIST.filter((i) => i.category === category)
          if (items.length === 0) return null
          return (
            <div key={category} className="print-group">
              <h3>
                <span aria-hidden="true">{CATEGORY_META[category].icon}</span>{' '}
                {CATEGORY_META[category].label}
              </h3>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <span className="print-box" aria-hidden="true">
                      ☐
                    </span>{' '}
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>

      <TicketsCTA location="packinglist" />
    </>
  )
}
