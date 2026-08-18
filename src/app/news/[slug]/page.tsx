import type { Metadata } from 'next'
import { isValidElement, type ReactNode } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import AffiliateCTA from '@/components/AffiliateCTA'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import NewsArticleJsonLd from '@/components/NewsArticleJsonLd'
import TicketsCTA from '@/components/TicketsCTA'
import { SITE_URL } from '@/lib/content'
import { getAllPostMeta, getPostBySlug } from '@/lib/news'

const mdxOptions = { mdxOptions: { remarkPlugins: [remarkGfm] } }

/**
 * Heading text -> URL fragment. Emoji and punctuation are dropped so
 * "## 🎃 Halloween Time Starts Friday — This Week's Impact" becomes
 * "halloween-time-starts-friday-this-weeks-impact".
 *
 * Done here rather than with rehype-slug to avoid a new dependency.
 */
function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Flattens an MDX heading's children back down to plain text for slugging. */
function headingText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(headingText).join('')
  if (isValidElement(node)) {
    return headingText((node.props as { children?: ReactNode }).children)
  }
  return ''
}

function Heading({ level, children }: { level: 2 | 3; children?: ReactNode }) {
  const Tag = level === 2 ? 'h2' : 'h3'
  const id = slugify(headingText(children))
  return (
    <Tag id={id} className="news-post-heading">
      {children}
    </Tag>
  )
}

/**
 * GFM tables scroll horizontally on narrow screens. A scrollable box with no
 * focusable content inside is unreachable by keyboard — the off-screen columns
 * simply cannot be read without a mouse or touch (axe
 * `scrollable-region-focusable`). Wrapping it in a focusable, named region
 * fixes that; the scrolling moves to the wrapper so the table itself can go
 * back to normal table layout.
 */
function ScrollableTable(props: { children?: ReactNode }) {
  return (
    <div
      className="news-post-table-wrap"
      tabIndex={0}
      role="region"
      aria-label="Table — scroll horizontally to see all columns"
    >
      <table>{props.children}</table>
    </div>
  )
}

const mdxComponents = {
  AffiliateCTA,
  TicketsCTA,
  h2: (props: { children?: ReactNode }) => <Heading level={2}>{props.children}</Heading>,
  h3: (props: { children?: ReactNode }) => <Heading level={3}>{props.children}</Heading>,
  table: ScrollableTable,
}

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

      <nav className="news-post-breadcrumb" aria-label="Breadcrumb">
        <Link href="/news" className="news-post-back">
          ← All weekly roundups
        </Link>
      </nav>

      <article className="news-post">
        <header className="news-post-header">
          <time dateTime={post.date} className="news-post-date">
            {formatDate(post.date)}
          </time>
          <h1 className="news-post-title">{post.title}</h1>
          <p className="news-post-desc">{post.description}</p>
        </header>

        <div className="news-post-body">
          <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
        </div>
      </article>
    </>
  )
}
