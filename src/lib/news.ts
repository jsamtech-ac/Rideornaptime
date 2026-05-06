import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'content', 'news', 'posts')
const TICKER_PATH = path.join(process.cwd(), 'content', 'news', 'weekly-news.json')

export interface NewsPostFrontmatter {
  title: string
  slug: string
  date: string
  description: string
  heroImage: string
}

export interface NewsPostMeta extends NewsPostFrontmatter {
  filename: string
}

export interface NewsPost extends NewsPostMeta {
  content: string
}

export interface TickerItem {
  id: string
  headline: string
  tag?: string
  link: string
  priority: number
}

export interface TickerData {
  weekOf: string
  lastUpdated: string
  ticker: TickerItem[]
  currentPostSlug: string
}

function readPostFile(filename: string): NewsPost {
  const fullPath = path.join(POSTS_DIR, filename)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as Partial<NewsPostFrontmatter>

  if (!fm.slug || !fm.title || !fm.date || !fm.description || !fm.heroImage) {
    throw new Error(
      `Missing frontmatter in ${filename}. Required: title, slug, date, description, heroImage.`
    )
  }

  return {
    filename,
    slug: fm.slug,
    title: fm.title,
    date: fm.date,
    description: fm.description,
    heroImage: fm.heroImage,
    content,
  }
}

export function getAllPosts(): NewsPost[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getAllPostMeta(): NewsPostMeta[] {
  return getAllPosts().map(({ content: _omit, ...meta }) => meta)
}

export function getPostBySlug(slug: string): NewsPost | null {
  const posts = getAllPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

export function getTickerData(): TickerData {
  const raw = fs.readFileSync(TICKER_PATH, 'utf8')
  const data = JSON.parse(raw) as TickerData
  return {
    ...data,
    ticker: [...data.ticker].sort((a, b) => a.priority - b.priority),
  }
}
