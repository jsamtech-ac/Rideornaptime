import { SITE_URL } from '@/lib/content'

interface Props {
  name: string
  /** One-line description of who the author is. */
  description: string
  /** The page this Person is the subject of, e.g. '/about'. */
  path: string
}

/**
 * Person (author) + the Organization that publishes them. Used on /about,
 * where the person is the subject of the page.
 */
export default function PersonJsonLd({ name, description, path }: Props) {
  const url = `${SITE_URL}${path}`
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Ride or Naptime',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/apple-icon`,
    },
  }

  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    mainEntity: {
      '@type': 'Person',
      name,
      description,
      url,
      worksFor: organization,
    },
    publisher: organization,
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
