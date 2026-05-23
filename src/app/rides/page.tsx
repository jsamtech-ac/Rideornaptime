import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import RidesList from '@/components/RidesList'
import FaqJsonLd from '@/components/FaqJsonLd'
import ArticleJsonLd from '@/components/ArticleJsonLd'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import ItemListJsonLd from '@/components/ItemListJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { RIDES, SITE_URL } from '@/lib/content'
import { getLastModified, getLastModifiedDate } from '@/lib/getLastModified'

const PAGE_FILE = 'src/app/rides/page.tsx'

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
    modifiedTime: getLastModified(PAGE_FILE),
    authors: ['Ride or Naptime'],
  },
}

const faqs = [
  {
    q: 'What Disneyland rides are best for toddlers (age 2)?',
    a: "Dumbo, It's a Small World, Buzz Lightyear Astro Blasters, Mickey & Minnie's Runaway Railway, Monsters Inc., The Little Mermaid, and Inside Out Emotional Whirlwind. None have height requirements and all are gentle.",
  },
  {
    q: 'What is the best first roller coaster for kids at Disneyland?',
    a: 'Big Thunder Mountain Railroad. The 40" height requirement fits most 6-year-olds, and it\'s fast without being scary — more like a bumpy train ride than a real coaster.',
  },
  {
    q: 'Which Disneyland rides should I skip with young kids?',
    a: 'Autopia (long line, bad payoff under age 6) and Incredicoaster (48" height requirement rules out most kids under 8). Haunted Mansion is a maybe — depends on whether your kid handles mild scary content.',
  },
  {
    q: 'Which Disneyland rides have no height requirement?',
    a: 'Dumbo, It\'s a Small World, King Arthur Carrousel, Mad Tea Party, Peter Pan\'s Flight, Alice in Wonderland, Casey Jr., Pirates of the Caribbean, Haunted Mansion, Buzz Lightyear Astro Blasters, Finding Nemo Submarine Voyage, and Mickey & Minnie\'s Runaway Railway. All listed as "Any height" on the ride matrix.',
  },
  {
    q: "What's the best Disneyland ride for any age, from 2 to 8?",
    a: "Peter Pan's Flight. It's the only ride rated must-do across every age bracket from 2 to 8. The catch: the line hits 60+ minutes by 10 AM and rarely drops, so rope-drop it first or book a Lightning Lane.",
  },
  {
    q: 'Should I watch Disneyland ride videos with my kids before the trip?',
    a: "Yes — watch POV ride videos on YouTube with your kids before the trip. It helps them pick what they want to ride and cures fear for kids who are nervous about the dark or loud noises.",
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
        dateModified={getLastModifiedDate(PAGE_FILE)}
      />
      <FaqJsonLd items={faqs} />
      <ItemListJsonLd
        path="/rides"
        name="Disneyland rides ranked for kids"
        items={RIDES.map((r) => ({
          name: r.name,
          description: `${r.land} — ${r.take}`,
        }))}
      />
      <header className="hero hero--home">
        <Image
          src="/starwarsride.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-content">
          <div className="hero-badge">🎢 Age-by-Age Ratings</div>
          <h1>Disneyland Rides for Kids: An Age-by-Age Guide</h1>
          <p className="hero-sub">
            Forget height requirements — here's whether each ride is actually worth your time at
            ages 2, 4, 6, and 8. Honest opinions from a real parent, not a marketing team.
          </p>
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
          <RidesList />
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
