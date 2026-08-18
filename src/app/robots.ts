import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/content'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Only the API surface is disallowed. /contact used to be listed here,
        // from when the contact form was a footer section rather than a route.
        // It is now a real page with its own metadata, linked from the footer
        // and mobile nav and listed in the sitemap — disallowing it told Google
        // "crawl this" and "don't crawl this" at once, and dropped the page's
        // Lighthouse SEO score to 66 via `is-crawlable`.
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
