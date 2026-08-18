import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PersonJsonLd from '@/components/PersonJsonLd'
import { AUTHOR_NAME, AUTHOR_CREDENTIAL } from '@/components/AuthorByline'
import { SITE_URL } from '@/lib/content'

const META_TITLE = `About ${AUTHOR_NAME}`
const META_DESCRIPTION =
  'Who writes Ride or Naptime — a real parent doing Disneyland with young kids, not a Disney influencer or an affiliate content farm.'

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    url: `${SITE_URL}/about`,
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: 'profile',
    siteName: 'Ride or Naptime',
  },
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/about" />
      <PersonJsonLd name={AUTHOR_NAME} description={AUTHOR_CREDENTIAL} path="/about" />

      <header className="hero">
        <div className="hero-badge">✍️ About</div>
        <h1>About {AUTHOR_NAME}</h1>
        <p className="hero-sub">{AUTHOR_CREDENTIAL}</p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">👋</span>
          <h2>Who writes this site</h2>
        </div>

        {/* TODO (Ashu): replace the three placeholder paragraphs below with the
            real bio. Everything else on this page — metadata, H1, JSON-LD,
            footer link — is wired and needs no further changes. */}
        <div className="callout">
          <div className="callout-label">TODO — placeholder copy</div>
          <p>
            <strong>TODO:</strong> Bio paragraph one — who you are, how many Disneyland trips
            you&apos;ve done with kids, and the ages of the kids the advice is calibrated against.
          </p>
        </div>

        <p>
          <strong>TODO:</strong> Bio paragraph two — why this site exists. What was missing from the
          Disneyland guides you read while planning your own first trip.
        </p>

        <p>
          <strong>TODO:</strong> Bio paragraph three — how the ratings are made. What &ldquo;must-do
          / maybe / skip&rdquo; actually means, and how often the pages get re-checked.
        </p>

        <div className="callout pro">
          <div className="callout-label">How this site makes money</div>
          <p>
            Some links on this site are affiliate links — if you book tickets or buy gear through
            them we earn a commission at no extra cost to you. It never changes a verdict: rides and
            products we think you should skip are labelled skip. See the{' '}
            <Link href="/privacy">Privacy Policy</Link> for how data is handled, or{' '}
            <Link href="/contact">get in touch</Link> with a correction.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Start Here</div>
          <p>
            New to the site? The <Link href="/first-visit">first-time family guide</Link> is the
            best entry point, followed by the <Link href="/rides">age-by-age ride guide</Link> and
            the <Link href="/itineraries">hour-by-hour itineraries</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
