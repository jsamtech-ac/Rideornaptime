import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RidesList from '@/components/RidesList'
import DeferredMount from '@/components/DeferredMount'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import ItemListJsonLd from '@/components/ItemListJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import UpdatedBadge from '@/components/UpdatedBadge'
import { RIDES, RIDES_LAST_REVIEWED, SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Disneyland Rides for Kids: Age-by-Age Guide (2026)',
  description:
    'Age-based ride ratings for Disneyland & DCA — which rides are worth it for ages 2, 4, 6, and 8. Honest takes from a real parent. See the full list.',
  alternates: { canonical: `${SITE_URL}/rides` },
  openGraph: {
    url: `${SITE_URL}/rides`,
    title: 'Disneyland Rides for Kids: Age-by-Age Guide (2026)',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-15T00:00:00.000Z',
    modifiedTime: `${RIDES_LAST_REVIEWED}T00:00:00.000Z`,
    authors: ['Ride or Naptime'],
  },
}

const openRides = RIDES.filter((r) => !r.closed)
const listNames = (rides: typeof RIDES) => {
  const names = rides.map((r) => r.name)
  return names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
}

const toddlerRides = openRides.filter((r) => r.age2 === 'must-do')
const noHeightDlRides = openRides.filter((r) => r.park === 'DL' && r.heightInches == null)
const everyAgeRides = openRides.filter(
  (r) =>
    r.age2 === 'must-do' && r.age4 === 'must-do' && r.age6 === 'must-do' && r.age8 === 'must-do'
)

const faqs = [
  {
    q: 'What Disneyland rides are best for toddlers (age 2)?',
    a: `Our must-dos at age 2 across both parks: ${listNames(toddlerRides)}. None have height requirements and all are gentle.`,
  },
  {
    q: 'What is the best first roller coaster for kids at Disneyland?',
    a: "Chip 'n' Dale's GADGETcoaster in Toontown is the true starter coaster — 35\" minimum and under a minute long. Next step up is Big Thunder Mountain Railroad: the 40\" requirement fits most 6-year-olds, and it's fast without being scary — more like a bumpy train ride than a real coaster.",
  },
  {
    q: 'Which Disneyland rides should I skip with young kids?',
    a: 'Autopia (long line, bad payoff under age 6) and Incredicoaster (48" height requirement rules out most kids under 8). Haunted Mansion is a maybe — depends on whether your kid handles mild scary content.',
  },
  {
    q: 'Which Disneyland rides have no height requirement?',
    a: `${listNames(noHeightDlRides)}. All listed as "Any height" on the ride matrix (rides currently closed for refurbishment are left off).`,
  },
  {
    q: "What's the best Disneyland ride for any age, from 2 to 8?",
    a: `${listNames(everyAgeRides)} — the only rides we rate must-do across every age bracket from 2 to 8. Peter Pan's catch: it's not on Lightning Lane and the line hits 60+ minutes by 10 AM, so rope-drop it first. Runaway Railway is on Multi Pass.`,
  },
  {
    q: 'Should I watch Disneyland ride videos with my kids before the trip?',
    a: 'Yes — watch POV ride videos on YouTube with your kids before the trip. It helps them pick what they want to ride and cures fear for kids who are nervous about the dark or loud noises.',
  },
  {
    q: 'Are Pirates of the Caribbean and Haunted Mansion too scary for young kids?',
    a: "Both are 'maybe' calls — depends on the kid. Pirates has a sudden drop and some mild action; Haunted Mansion has Doom Buggies in the dark with ghosts. Most 5+ kids handle them; nervous 4-year-olds may not. Save them for day two if your kid is on the cautious side.",
  },
  {
    q: 'Is Big Thunder Mountain a good first roller coaster for kids?',
    a: 'Yes — the 40" height requirement fits most 6-year-olds, and Big Thunder is fast without being scary. It feels more like a bumpy train ride than a real coaster, which makes it the best entry-level coaster at Disneyland.',
  },
]

export default function RidesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Rides for Kids', path: '/rides' },
        ]}
      />
      <ArticleJsonLd
        path="/rides"
        headline={'Disneyland Rides for Kids: Age-by-Age Guide (2026)'}
        description={
          'Age-based ride ratings for Disneyland & DCA — which rides are worth it for ages 2, 4, 6, and 8. Honest takes from a real parent.'
        }
        datePublished="2026-04-15"
        dateModified={RIDES_LAST_REVIEWED}
      />
      <FaqJsonLd items={faqs} />
      <ItemListJsonLd
        path="/rides"
        name="Disneyland rides ranked for kids"
        items={RIDES.map((r) => ({
          name: r.name,
          description: `${r.land} — ${r.take}${r.closed && r.closureNote ? ` Status: ${r.closureNote}` : ''}`,
        }))}
      />
      <header className="hero hero--home">
        <Image src="/starwarsride.jpg" alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-content">
          <div className="hero-badge">🎢 Age-by-Age Ratings</div>
          <h1>Disneyland Rides for Kids: An Age-by-Age Guide</h1>
          <p className="hero-sub">
            Forget height requirements — here's whether each ride is actually worth your time at
            ages 2, 4, 6, and 8. Honest opinions from a real parent, not a marketing team.
          </p>
          <UpdatedBadge date={RIDES_LAST_REVIEWED} label="Ride statuses checked" />
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎢</span>
          <h2>The Ride Matrix</h2>
          <p className="section-intro">
            Filter by park. Each ride shows a verdict (must-do / maybe / skip) for every age
            bracket, plus a parent's take on what actually matters.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="callout">
              <div className="callout-label">Loading</div>
              <p>Loading the ride matrix…</p>
            </div>
          }
        >
          <DeferredMount minHeight={900}>
            <RidesList />
          </DeferredMount>
        </Suspense>

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Pro Tip</div>
          <p>
            Watch POV ride videos on YouTube with your kids before the trip. It helps them pick what
            they want to ride and cures fear for some kids who are nervous about the dark or loud
            noises.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Plan Your Day</div>
          <p>
            First trip? Start with the{' '}
            <Link href="/first-visit">first-time Disneyland family guide</Link>. Once you know what
            you're riding, build the day around it — see the{' '}
            <Link href="/itineraries">hour-by-hour itineraries</Link> and decide which rides are
            worth a <Link href="/lightning-lane">Lightning Lane</Link> booking. Mobile-order in
            advance from the <Link href="/food">Disneyland food spots worth your money</Link> so
            meals don't stall the day.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Plan the Timing</div>
          <p>
            Pick the right month with the{' '}
            <Link href="/seasonal">best months to visit Disneyland with kids</Link>. Crowd levels
            swing wildly month to month — the wrong week can double every wait time on this list.
          </p>
        </div>
      </section>

      <TicketsCTA location="rides" />
    </>
  )
}
