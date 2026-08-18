// Single source of truth for "which routes do the QA gates cover".
//
// Derived from the filesystem rather than a hand-maintained list, so adding
// e.g. src/app/itineraries/dca-3-day/page.tsx puts that route into Lighthouse
// (both profiles) and the axe suite with no further edits. The 7 itinerary
// sub-routes went un-audited in every profile until this was introduced.
//
// CommonJS on purpose: lighthouserc.js is loaded with require() by lhci.

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..', '..')
const APP = path.join(ROOT, 'src', 'app')
const POSTS = path.join(ROOT, 'content', 'news', 'posts')

/**
 * Every statically routable page under src/app, as URL paths.
 *
 * Skips dynamic segments (`[slug]`), route groups, and anything that isn't a
 * navigable HTML page — API handlers, and the file-convention routes Next
 * generates from *.tsx (opengraph-image, twitter-image, icon, sitemap, robots,
 * manifest), which are images/XML and not auditable as pages.
 */
function staticRoutes() {
  const out = []

  const walk = (dir, urlPath) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const name = entry.name
      // dynamic segments, route groups, private folders, and the API surface
      if (name.startsWith('[') || name.startsWith('(') || name.startsWith('_') || name === 'api') {
        continue
      }
      const next = path.join(dir, name)
      const nextUrl = `${urlPath}/${name}`
      if (fs.existsSync(path.join(next, 'page.tsx'))) out.push(nextUrl)
      walk(next, nextUrl)
    }
  }

  if (fs.existsSync(path.join(APP, 'page.tsx'))) out.push('/')
  walk(APP, '')
  return out.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
}

/**
 * One representative news post, so the MDX article template is actually
 * audited. Auditing all 13 would be near-duplicate work; the newest post is
 * the one most likely to expose a template regression.
 */
function newsSampleRoute() {
  if (!fs.existsSync(POSTS)) return null
  const files = fs
    .readdirSync(POSTS)
    .filter((f) => f.endsWith('.mdx'))
    .sort()
  const newest = files[files.length - 1]
  if (!newest) return null
  const raw = fs.readFileSync(path.join(POSTS, newest), 'utf8')
  const slug = raw.match(/^slug:\s*['"]?([^'"\n]+)['"]?\s*$/m)?.[1]
  return slug ? `/news/${slug.trim()}` : null
}

/** Everything the QA gates should cover. */
function allQaRoutes() {
  const sample = newsSampleRoute()
  return sample ? [...staticRoutes(), sample] : staticRoutes()
}

module.exports = { staticRoutes, newsSampleRoute, allQaRoutes }
