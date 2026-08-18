import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import ContactForm from '@/components/ContactForm'
import { SITE_URL } from '@/lib/content'

const META_TITLE = 'Contact Ride or Naptime'
const META_DESCRIPTION =
  'Got a Disneyland tip, a correction, or a question about planning a trip with young kids? Send it over — a real parent reads every message.'

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    url: `${SITE_URL}/contact`,
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: 'website',
    siteName: 'Ride or Naptime',
  },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/contact" />

      <header className="hero">
        <div className="hero-badge">✉️ Get in Touch</div>
        <h1>Contact Ride or Naptime</h1>
        <p className="hero-sub">
          Got a tip, a correction, or a question we haven&rsquo;t answered? Send it over — a real
          parent reads every message.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">💬</span>
          <h2>Send us a message</h2>
          <p className="section-intro">
            Tips and corrections are especially welcome — park details change constantly, and
            readers catch things before we do.
          </p>
        </div>

        <ContactForm />

        <div className="callout pro" style={{ marginTop: '1.5rem' }}>
          <div className="callout-label">Before you write</div>
          <p>
            Planning questions are often already covered — try the{' '}
            <Link href="/first-visit">first-time family guide</Link>, the{' '}
            <Link href="/itineraries">hour-by-hour itineraries</Link>, or the{' '}
            <Link href="/rides">age-by-age ride guide</Link>. For how we handle your message and
            data, see the <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
