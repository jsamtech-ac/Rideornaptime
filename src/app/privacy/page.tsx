import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import UpdatedBadge from '@/components/UpdatedBadge'
import { SITE_URL, PRIVACY_LAST_REVIEWED } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Ride or Naptime handles data — what we collect, third-party processors (Google Analytics, Resend), cookies, and your GDPR + CCPA rights.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    url: `${SITE_URL}/privacy`,
    title: 'Privacy Policy | Ride or Naptime',
    description:
      'How we handle data, what we collect, third-party processors, cookies, and your GDPR + CCPA rights.',
    type: 'article',
    siteName: 'Ride or Naptime',
    publishedTime: '2026-04-22T00:00:00.000Z',
    modifiedTime: `${PRIVACY_LAST_REVIEWED}T00:00:00.000Z`,
    authors: ['Ride or Naptime'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  const reviewedFormatted = new Date(`${PRIVACY_LAST_REVIEWED}T00:00:00Z`).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
  )

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ]}
      />

      <header className="hero">
        <div className="hero-badge">🔒 Privacy</div>
        <h1>Privacy Policy</h1>
        <p className="hero-sub">
          The short version: we collect what&apos;s needed to run this site, we don&apos;t sell
          anything, and you control the cookies.
        </p>
        <UpdatedBadge date={PRIVACY_LAST_REVIEWED} label="Last updated" />
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">📋</span>
          <h2>What we collect</h2>
        </div>
        <p className="section-intro">
          Two buckets: what you send us directly, and what&apos;s measured automatically.
        </p>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">✉️</div>
            <h3>From the contact form</h3>
          </div>
          <p>
            Your name, email, and message. We use this to reply and to spot patterns in what
            families ask for. Nothing else.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">📊</div>
            <h3>From analytics</h3>
          </div>
          <p>
            Google Analytics 4 and Google Tag Manager record page views, approximate city-level
            location (IP-derived, not precise), device type, and how you got here (search, link,
            direct). If you reject cookies in the banner, these run in &ldquo;cookieless&rdquo; mode
            — aggregate pings only, no ID on you.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">🔗</div>
            <h3>From affiliate clicks</h3>
          </div>
          <p>
            When you click a Get Away Today or Amazon link, that partner records the click under our
            referrer ID so they can pay us a commission. We don&apos;t see your purchase, name, or
            card — just that a click happened.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🎯</span>
          <h2>How we use it</h2>
        </div>
        <p className="section-intro">
          Reply to messages. Measure which guides help families most. Improve the site. That&apos;s
          it.
        </p>

        <div className="callout warning">
          <div className="callout-label">What we don&apos;t do</div>
          <p>
            We don&apos;t sell your data. We don&apos;t share the contact form with marketing tools.
            We don&apos;t build advertising profiles. We don&apos;t run ads on this site at all.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🤝</span>
          <h2>Third-party processors</h2>
        </div>
        <p className="section-intro">The companies that touch your data when you use this site.</p>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">📧</div>
            <h3>Resend — email delivery</h3>
          </div>
          <p>
            Contact form submissions are emailed to us via{' '}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend
            </a>
            . Messages are retained in our inbox so we can reply and follow up.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">📈</div>
            <h3>Google Analytics 4 + Tag Manager</h3>
          </div>
          <p>
            Analytics for traffic and content performance.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google&apos;s privacy policy
            </a>{' '}
            covers what they do with the data. We run Consent Mode v2 with default-deny — nothing
            fires until you choose.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sun">🎟️</div>
            <h3>Get Away Today + Amazon Associates</h3>
          </div>
          <p>
            Affiliate partners. They set their own cookies when you click through to measure the
            referral and pay us a commission. See their policies:{' '}
            <a
              href="https://www.getawaytoday.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Away Today
            </a>{' '}
            ·{' '}
            <a
              href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Amazon
            </a>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🍪</span>
          <h2>Cookies &amp; tracking</h2>
        </div>
        <p className="section-intro">
          Strictly-necessary cookies (none today) and analytics cookies (opt-in via the banner).
        </p>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon sky">📊</div>
            <h3>Analytics cookies</h3>
          </div>
          <p>
            When you accept, Google Analytics sets <code>_ga</code> and <code>_ga_*</code> cookies
            (expire after ~2 years) that generate an anonymous client ID. If you reject, those
            cookies are never set — GA runs in Consent Mode v2 &ldquo;cookieless ping&rdquo; mode,
            which gives us only aggregate counts with no identifier on you.
          </p>
        </div>

        <div className="callout pro">
          <div className="callout-label">Change your mind?</div>
          <p>
            Clear <code>ror_consent</code> in your browser&apos;s local storage and reload — the
            banner will come back. Or change your browser&apos;s cookie settings at any time.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">⚖️</span>
          <h2>Your rights</h2>
        </div>
        <p className="section-intro">
          You have rights under GDPR (EU/UK) and CCPA/CPRA (California). In plain English:
        </p>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon mint">✓</div>
            <h3>What you can ask for</h3>
          </div>
          <p>
            A copy of any data we hold on you (contact form messages, basically). Deletion of that
            data. Correction of anything wrong. To opt out of analytics (the banner handles this).
            To know if we&apos;ve sold or shared your data — we haven&apos;t and won&apos;t.
          </p>
        </div>

        <div className="tip-card">
          <div className="tip-card-header">
            <div className="tip-card-icon coral">💬</div>
            <h3>How to ask</h3>
          </div>
          <p>
            Use the <Link href="/#contact">contact form</Link> at the bottom of any page. Put
            &ldquo;Privacy request&rdquo; in the subject and tell us what you want. We&apos;ll reply
            within 30 days — usually faster. We won&apos;t discriminate against you for asking.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🧒</span>
          <h2>Children</h2>
        </div>

        <div className="callout">
          <p>
            Ride or Naptime is a guide for <em>parents</em> planning a Disneyland trip with kids. We
            don&apos;t knowingly collect information from anyone under 13, and the site isn&apos;t
            directed at kids. If you&apos;re a parent and believe your child has sent us their info,
            contact us and we&apos;ll delete it.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">🔄</span>
          <h2>Changes to this policy</h2>
        </div>

        <div className="callout warning">
          <div className="callout-label">How we update</div>
          <p>
            We review this page quarterly. Material changes (new processors, new data types, new
            rights) trigger a banner reset so you&apos;re re-prompted for consent. Minor edits
            (typos, link updates) don&apos;t. Last reviewed: <strong>{reviewedFormatted}</strong>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-icon">✉️</span>
          <h2>Contact</h2>
        </div>

        <div className="callout pro">
          <p>
            Questions about this policy, your data, or anything else? Use the{' '}
            <Link href="/#contact">contact form</Link> at the bottom of every page. We read every
            message.
          </p>
        </div>
      </section>
    </>
  )
}
