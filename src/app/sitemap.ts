import type { MetadataRoute } from 'next'
import { SITE_URL, SEASONAL_LAST_REVIEWED } from '@/lib/content'

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
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}
