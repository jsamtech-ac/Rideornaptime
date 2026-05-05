import { SITE_URL } from '@/lib/content'
import { getAllPostMeta } from '@/lib/news'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const posts = getAllPostMeta()
  const lastBuild = posts[0]?.date
    ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString()

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/news/${post.slug}`
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString()
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ride or Naptime — Disneyland News for Families</title>
    <link>${SITE_URL}/news</link>
    <atom:link href="${SITE_URL}/news/feed.xml" rel="self" type="application/rss+xml" />
    <description>Weekly Disneyland news for families with kids 2–8 — ride status, food, deals, and what we're watching.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
