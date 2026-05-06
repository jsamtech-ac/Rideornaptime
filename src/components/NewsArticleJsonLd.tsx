import { SITE_URL } from '@/lib/content'

interface Props {
  slug: string
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  image?: string
}

export default function NewsArticleJsonLd({
  slug,
  headline,
  description,
  datePublished,
  dateModified,
  image,
}: Props) {
  const url = `${SITE_URL}/news/${slug}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline,
    description,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/opengraph-image`,
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
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
