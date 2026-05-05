import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import AffiliateCTA from '@/components/AffiliateCTA'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import NewsArticleJsonLd from '@/components/NewsArticleJsonLd'
import { SITE_URL } from '@/lib/content'
import { getAllPostMeta, getPostBySlug } from '@/lib/news'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllPostMeta().map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const url = `${SITE_URL}/news/${post.slug}`
  const ogImage = post.heroImage ? `${SITE_URL}${post.heroImage}` : `${SITE_URL}/opengraph-image`
  const isoPublished = `${post.date}T00:00:00.000Z`

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: post.title,
      description: post.description,
      type: 'article',
      siteName: 'Ride or Naptime',
      publishedTime: isoPublished,
      modifiedTime: isoPublished,
      authors: ['Ride or Naptime'],
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function NewsPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
          { name: post.title, path: `/news/${post.slug}` },
        ]}
      />
      <NewsArticleJsonLd
        slug={post.slug}
        headline={post.title}
        description={post.description}
        datePublished={post.date}
        image={post.heroImage}
      />

      <article className="news-post">
        <header className="news-post-header">
          <div className="news-post-meta">
            <Link href="/news" className="news-post-back">
              ← All weekly roundups
            </Link>
            <time dateTime={post.date} className="news-post-date">
              {formatDate(post.date)}
            </time>
          </div>
          <h1 className="news-post-title">{post.title}</h1>
          <p className="news-post-desc">{post.description}</p>
        </header>

        <div className="news-post-body">
          <MDXRemote source={post.content} components={{ AffiliateCTA }} />
        </div>
      </article>
    </>
  )
}
