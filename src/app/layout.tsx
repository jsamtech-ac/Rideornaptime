import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

const GTM_ID = 'GTM-5W84PMZ8'

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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
