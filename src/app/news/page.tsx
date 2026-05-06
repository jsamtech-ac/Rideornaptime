import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import { SITE_URL } from '@/lib/content'
import { getAllPostMeta } from '@/lib/news'

export const metadata: Metadata = {
  title: 'Disneyland News for Families — Weekly Roundups',
  description:
    "What changed at Disneyland this week, written for families with kids 2–8 — ride status, food, deals, and what we're watching. New every Sunday.",
  alternates: { canonical: `${SITE_URL}/news` },
  openGraph: {
    url: `${SITE_URL}/news`,
    title: 'Disneyland News for Families — Weekly Roundups',
    description:
      "What changed at Disneyland this week, written for families with kids 2–8 — ride status, food, deals, and what we're watching.",
    type: 'website',
    siteName: 'Ride or Naptime',
  },
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function NewsIndexPage() {
  const posts = getAllPostMeta()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
        ]}
      />
      <header className="hero">
        <div className="hero-badge">📰 Weekly Roundup</div>
        <h1>Disneyland News for Families</h1>
        <p className="hero-sub">
          What actually changed this week — ride status, food, deals, what we're watching. Written
          for families with kids 2–8. New every Sunday.
        </p>
      </header>

      <section className="section">
        {posts.length === 0 ? (
          <p className="section-intro">No posts yet. Check back Sunday.</p>
        ) : (
          <ul className="news-card-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/news/${post.slug}`} className="news-card">
                  <time dateTime={post.date} className="news-card-date">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="news-card-title">{post.title}</h2>
                  <p className="news-card-desc">{post.description}</p>
                  <span className="news-card-cta">Read more →</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
