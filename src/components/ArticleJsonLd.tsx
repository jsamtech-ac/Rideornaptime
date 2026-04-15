import { SITE_URL } from '@/lib/content'

interface Props {
  path: string
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  image?: string
}

export default function ArticleJsonLd({
  path,
  headline,
  description,
  datePublished,
  dateModified,
  image,
}: Props) {
  const url = `${SITE_URL}${path}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline,
    description,
    image: image ?? `${url}/opengraph-image`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: 'Ride or Naptime',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ride or Naptime',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/apple-icon`,
      },
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
