import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/content'
import { PAGES, type PagePath } from '@/lib/pages'
import { getAllPostMeta } from '@/lib/news'

const PILLARS = new Set<PagePath>(['/lightning-lane', '/rides', '/first-visit', '/itineraries'])

// /news gets its lastModified from the newest post rather than the registry,
// so it is emitted separately below.
const NEWS_INDEX: PagePath = '/news'

function priorityFor(path: PagePath): number {
  if (path === '/') return 1.0
  if (PILLARS.has(path)) return 0.9
  return 0.8
}

/** trailingSlash is false, so the home route is the bare origin. */
function urlFor(path: PagePath): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta()

  // Routes come straight from the page registry — no second list to keep in
  // sync, and every entry's lastModified is the same value the page itself
  // renders in its meta tag and visible "Updated" UI.
  const staticEntries: MetadataRoute.Sitemap = (Object.keys(PAGES) as PagePath[])
    .filter((path) => path !== NEWS_INDEX)
    .map((path) => ({
      url: urlFor(path),
      lastModified: PAGES[path].lastUpdated,
      changeFrequency: 'monthly',
      priority: priorityFor(path),
    }))

  const newsIndexEntry: MetadataRoute.Sitemap[number] = {
    url: urlFor(NEWS_INDEX),
    lastModified: posts[0]?.date ?? PAGES[NEWS_INDEX].lastUpdated,
    changeFrequency: 'weekly',
    priority: 0.8,
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticEntries, newsIndexEntry, ...postEntries]
}
