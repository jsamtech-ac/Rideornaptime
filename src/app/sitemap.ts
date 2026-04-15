import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/content'

const routes = [
  '',
  '/first-visit',
  '/characters',
  '/rides',
  '/itineraries',
  '/lightning-lane',
  '/food',
  '/packing-list',
  '/seasonal',
  '/saving-money',
  '/hidden-gems',
  '/fireworks',
  '/best-strollers',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map(path => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}
