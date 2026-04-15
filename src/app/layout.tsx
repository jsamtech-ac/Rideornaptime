import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import SiteJsonLd from '@/components/SiteJsonLd'
import { SITE_URL } from '@/lib/content'
import './globals.css'

const GTM_ID = 'GTM-5W84PMZ8'
const GA_ID = 'G-4EMFL5HDQE'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ride or Naptime — The Disneyland Family Guide That Actually Helps',
    template: '%s | Ride or Naptime',
  },
  description: 'A real parent\'s guide to Disneyland Resort & DCA with kids ages 2–8. Opinionated ride ratings, hour-by-hour itineraries, food strategy, Lightning Lane tips, and packing lists.',
  applicationName: 'Ride or Naptime',
  authors: [{ name: 'Ride or Naptime' }],
  keywords: [
    'Disneyland with kids',
    'Disneyland family guide',
    'Disneyland rides for toddlers',
    'Disneyland itinerary',
    'Lightning Lane strategy',
    'Disney California Adventure',
    'Disneyland with a 2 year old',
    'Disneyland packing list',
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { 'en-US': SITE_URL, 'x-default': SITE_URL },
  },
  openGraph: {
    siteName: 'Ride or Naptime',
    type: 'website',
    url: SITE_URL,
    title: 'Ride or Naptime — The Disneyland Family Guide That Actually Helps',
    description: 'A real parent\'s guide to Disneyland Resort & DCA with kids ages 2–8.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ride or Naptime — The Disneyland Family Guide That Actually Helps',
    description: 'A real parent\'s guide to Disneyland Resort & DCA with kids ages 2–8.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'travel',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');`}
        </Script>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <SiteJsonLd />
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
        <Header />
        {children}
        <Footer />
        <ScrollTop />
      </body>
    </html>
  )
}
