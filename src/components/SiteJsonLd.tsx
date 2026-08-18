import { SITE_URL } from '@/lib/content'

const ORGANIZATION_ID = `${SITE_URL}/#organization`

/**
 * Sitewide Organization + WebSite. Rendered once, from the root layout.
 *
 * No SearchAction: the site has no search endpoint, and declaring one Google
 * can't actually query is worse than omitting it.
 */
export default function SiteJsonLd() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Ride or Naptime',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/apple-icon`,
      },
      description:
        "A real parent's guide to Disneyland Resort and Disney California Adventure with kids ages 2–8 — age-based ride verdicts, hour-by-hour itineraries, food strategy, Lightning Lane tactics, and packing lists.",
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ride or Naptime',
      url: SITE_URL,
      publisher: { '@id': ORGANIZATION_ID },
    },
  ]

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
