import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ride or Naptime — The Disneyland Family Guide',
    short_name: 'Ride or Naptime',
    description: "A real parent's guide to Disneyland Resort & DCA with kids ages 2–8.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF5EF',
    theme_color: '#F59E0B',
    categories: ['travel', 'lifestyle', 'family'],
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
