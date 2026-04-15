import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ride or Naptime — The Disneyland Family Guide That Actually Helps',
  description: 'A real parent\'s guide to Disneyland Resort & DCA with kids ages 2–8. Opinionated ride ratings, hour-by-hour itineraries, food strategy, Lightning Lane tips, and packing lists. One page. Zero fluff.',
  keywords: 'Disneyland with toddlers, DCA tips young kids, Disneyland itinerary families 2026, what to pack Disneyland kids, Disneyland Lightning Lane families, Disneyland food kids',
  openGraph: {
    title: 'Ride or Naptime — The Disneyland Family Guide That Actually Helps',
    description: 'One dense, opinionated page for families with young kids planning Disneyland trips. From a real dad, not a Disney influencer.',
    url: 'https://rideornaptime.com',
    siteName: 'Ride or Naptime',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ride or Naptime — Disneyland Family Guide',
    description: 'The one-page Disneyland guide for families with kids 2–8. Opinionated, specific, actually useful.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
