#!/usr/bin/env node
// Asserts, against the built HTML, that every routed page's last-updated date
// is identical across all three places it surfaces:
//
//   1. <meta property="article:modified_time">
//   2. JSON-LD "dateModified"
//   3. the visible "Updated ___" UI (<time> inside .updated-badge / .hub-card-updated)
//
// They all derive from PAGES[path].lastUpdated in src/lib/pages.ts, so a
// mismatch here means a consumer started formatting its own date again.
//
// Run after `next build`. Exit 0 = consistent, 1 = drift found.

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const APP = join(process.cwd(), '.next', 'server', 'app')

if (!existsSync(APP)) {
  console.error('✗ .next/server/app not found — run `next build` first.')
  process.exit(1)
}

function walk(dir) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.name.endsWith('.html')) out.push(p)
  }
  return out
}

const all = (html, re) => [...html.matchAll(re)].map((m) => m[1])

let checked = 0
const problems = []

for (const file of walk(APP).sort()) {
  const route =
    '/' +
    relative(APP, file)
      .replace(/\.html$/, '')
      .replace(/^index$/, '')
  const html = readFileSync(file, 'utf8')

  // <meta property="article:modified_time" content="2026-07-28T00:00:00.000Z">
  const metaDates = all(html, /<meta property="article:modified_time" content="([^"]{10})[^"]*"/g)
  // JSON-LD "dateModified":"2026-07-28"
  const jsonDates = all(html, /"dateModified":"([^"]{10})[^"]*"/g)
  // visible <time datetime="2026-07-28"> inside an updated badge or hub card
  const visibleDates = all(
    html,
    /class="(?:updated-badge-date|hub-card-updated)"[^>]*\sdate[tT]ime="([^"]{10})"/g
  ).concat(all(html, /class="hub-card-updated">[^<]*<time date[tT]ime="([^"]{10})"/g))

  const found = [...metaDates, ...jsonDates]
  if (!found.length && !visibleDates.length) continue
  checked++

  // Per page, the meta tag and JSON-LD describe THIS page and must agree.
  const pageLevel = new Set(found)
  if (pageLevel.size > 1) {
    problems.push(
      `${route}: article:modified_time and JSON-LD dateModified disagree -> ${[...pageLevel].join(' vs ')}`
    )
  }

  // A visible badge on the page itself must match the page's own date.
  // (hub-card dates on / describe OTHER pages, so they are checked separately.)
  const badge = all(html, /class="updated-badge-date"[^>]*\sdate[tT]ime="([^"]{10})"/g)
  for (const b of badge) {
    if (pageLevel.size && !pageLevel.has(b)) {
      problems.push(
        `${route}: visible UpdatedBadge shows ${b} but meta/JSON-LD say ${[...pageLevel].join('/')}`
      )
    }
  }
}

// Cross-page check: each hub card on / must show the target page's own date.
const home = join(APP, 'index.html')
if (existsSync(home)) {
  const html = readFileSync(home, 'utf8')
  const cards = [
    ...html.matchAll(
      /class="hub-card" href="([^"]+)"[\s\S]*?class="hub-card-updated">Updated <time date[tT]ime="([^"]{10})"/g
    ),
  ]
  for (const [, href, shown] of cards) {
    const target = join(APP, `${href.replace(/^\//, '')}.html`)
    if (!existsSync(target)) continue
    const targetHtml = readFileSync(target, 'utf8')
    const own = all(
      targetHtml,
      /<meta property="article:modified_time" content="([^"]{10})[^"]*"/g
    )[0]
    checked++
    if (own && own !== shown) {
      problems.push(`/ hub card for ${href}: shows ${shown} but ${href} reports ${own}`)
    }
  }
}

if (problems.length) {
  console.error(`✗ last-updated drift detected (${problems.length}):`)
  for (const p of problems) console.error(`   ${p}`)
  process.exit(1)
}

console.log(`✓ last-updated consistent across meta, JSON-LD and visible UI (${checked} checks)`)
