import type { MetadataRoute } from 'next'
import { SITE_URL, SEASONAL_LAST_REVIEWED, PRIVACY_LAST_REVIEWED } from '@/lib/content'
import { getAllPostMeta } from '@/lib/news'

const routes: { path: string; lastModified: string }[] = [
  { path: '', lastModified: '2026-04-15' },
  { path: '/first-visit', lastModified: '2026-04-15' },
  { path: '/characters', lastModified: '2026-04-15' },
  { path: '/rides', lastModified: '2026-04-15' },
  { path: '/itineraries', lastModified: '2026-04-15' },
  { path: '/lightning-lane', lastModified: '2026-04-20' },
  { path: '/food', lastModified: '2026-04-15' },
  { path: '/packing-list', lastModified: '2026-04-15' },
  { path: '/seasonal', lastModified: SEASONAL_LAST_REVIEWED },
  { path: '/saving-money', lastModified: '2026-04-15' },
  { path: '/hidden-gems', lastModified: '2026-04-15' },
  { path: '/fireworks', lastModified: '2026-04-15' },
  { path: '/best-strollers', lastModified: '2026-04-15' },
  { path: '/privacy', lastModified: PRIVACY_LAST_REVIEWED },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta()
  const newsIndexLastMod = posts[0]?.date ?? '2026-05-04'

  const staticEntries: MetadataRoute.Sitemap = routes.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))

  const newsIndexEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/news`,
    lastModified: newsIndexLastMod,
    changeFrequency: 'weekly',
    priority: 0.8,
  }

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, newsIndexEntry, ...postEntries]
}
