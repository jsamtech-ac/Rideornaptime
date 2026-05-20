import type { MetadataRoute } from 'next'
import { SITE_URL, SEASONAL_LAST_REVIEWED } from '@/lib/content'
import { getLastModifiedDate } from '@/lib/getLastModified'
import { getAllPostMeta } from '@/lib/news'

const PILLARS = new Set(['/lightning-lane', '/rides', '/first-visit', '/itineraries'])

type StaticRoute = {
  path: string
  file: string
  lastModified?: string
}

const staticRoutes: StaticRoute[] = [
  { path: '', file: 'src/app/page.tsx' },
  { path: '/first-visit', file: 'src/app/first-visit/page.tsx' },
  { path: '/itineraries', file: 'src/app/itineraries/page.tsx' },
  {
    path: '/itineraries/disneyland-1-day',
    file: 'src/app/itineraries/disneyland-1-day/page.tsx',
  },
  {
    path: '/itineraries/disneyland-2-day',
    file: 'src/app/itineraries/disneyland-2-day/page.tsx',
  },
  {
    path: '/itineraries/disneyland-3-day',
    file: 'src/app/itineraries/disneyland-3-day/page.tsx',
  },
  { path: '/itineraries/dca-1-day', file: 'src/app/itineraries/dca-1-day/page.tsx' },
  { path: '/itineraries/dca-2-day', file: 'src/app/itineraries/dca-2-day/page.tsx' },
  {
    path: '/itineraries/park-hopper-2-day',
    file: 'src/app/itineraries/park-hopper-2-day/page.tsx',
  },
  {
    path: '/itineraries/park-hopper-3-day',
    file: 'src/app/itineraries/park-hopper-3-day/page.tsx',
  },
  { path: '/seasonal', file: 'src/app/seasonal/page.tsx', lastModified: SEASONAL_LAST_REVIEWED },
  { path: '/lightning-lane', file: 'src/app/lightning-lane/page.tsx' },
  { path: '/saving-money', file: 'src/app/saving-money/page.tsx' },
  { path: '/rides', file: 'src/app/rides/page.tsx' },
  { path: '/characters', file: 'src/app/characters/page.tsx' },
  { path: '/food', file: 'src/app/food/page.tsx' },
  { path: '/packing-list', file: 'src/app/packing-list/page.tsx' },
  { path: '/hidden-gems', file: 'src/app/hidden-gems/page.tsx' },
  { path: '/fireworks', file: 'src/app/fireworks/page.tsx' },
  { path: '/best-strollers', file: 'src/app/best-strollers/page.tsx' },
]

function priorityFor(path: string): number {
  if (path === '') return 1.0
  if (PILLARS.has(path)) return 0.9
  return 0.8
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta()
  const newsIndexLastMod = posts[0]?.date ?? getLastModifiedDate('src/app/news/page.tsx')

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, file, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ?? getLastModifiedDate(file),
    changeFrequency: 'monthly',
    priority: priorityFor(path),
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
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticEntries, newsIndexEntry, ...postEntries]
}
