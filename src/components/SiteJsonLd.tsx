import { SITE_URL } from '@/lib/content'

export default function SiteJsonLd() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ride or Naptime',
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Ride or Naptime',
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.png`,
    },
  ]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
