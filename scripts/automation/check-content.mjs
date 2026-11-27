#!/usr/bin/env node
// Content guard for rideornaptime.com.
//
// Runs on every PR (and locally). Compares HEAD against a base ref and fails
// on anything that could break formatting, dates, or affiliate revenue.
//
// Two modes:
//   - default: general content checks (news MDX, ticker JSON, review dates,
//     affiliate IDs). Applies to every PR, human or automated.
//   - strict (AUTOMATION=1, or the branch name starts with "auto/"): adds the
//     file allowlist, code-shape locks (imports, exports, classNames, inline
//     styles), protected-page change caps, and the review-log requirement.
//     These are what make auto-merge safe.
//
// Usage: node scripts/automation/check-content.mjs [--base origin/main]
// Exit 0 = pass, 1 = fail. Warnings never fail the run.

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const args = process.argv.slice(2)
const baseArgIdx = args.indexOf('--base')
const BASE = baseArgIdx >= 0 ? args[baseArgIdx + 1] : process.env.BASE_REF || 'origin/main'

const sh = (cmd) =>
  execSync(cmd, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

const branch =
  process.env.GITHUB_HEAD_REF ||
  (() => {
    try {
      return sh('git rev-parse --abbrev-ref HEAD')
    } catch {
      return ''
    }
  })()
const STRICT = process.env.AUTOMATION === '1' || branch.startsWith('auto/')

const errors = []
const warnings = []
const fail = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

// Today in Pacific time, which is the timezone the site and the owner run on.
const TODAY = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date())
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const validDate = (s) => DATE_RE.test(s) && !Number.isNaN(new Date(`${s}T00:00:00Z`).getTime())

// ---------------------------------------------------------------------------
// Diff helpers
// ---------------------------------------------------------------------------

let mergeBase
try {
  mergeBase = sh(`git merge-base ${BASE} HEAD`)
} catch {
  console.error(`Could not find a merge base with ${BASE}. Fetch it first (git fetch origin main).`)
  process.exit(1)
}

const changes = sh(`git diff --name-status ${mergeBase} HEAD`)
  .split('\n')
  .filter(Boolean)
  .map((line) => {
    const [status, ...rest] = line.split('\t')
    return { status: status[0], file: rest[rest.length - 1], from: rest[0] }
  })

const readHead = (f) =>
  fs.existsSync(path.join(root, f)) ? fs.readFileSync(path.join(root, f), 'utf8') : ''
const readBase = (f) => {
  try {
    return sh(`git show ${mergeBase}:${f}`)
  } catch {
    return ''
  }
}

/** New-side line numbers touched by the diff (added or modified lines). */
function changedLines(file) {
  const out = sh(`git diff -U0 ${mergeBase} HEAD -- "${file}"`)
  const lines = new Set()
  let removedOnly = 0
  for (const m of out.matchAll(/^@@ -\d+(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[2])
    const count = m[3] === undefined ? 1 : Number(m[3])
    if (count === 0) {
      // Pure deletion: attribute it to the line after the deletion point.
      lines.add(Math.max(1, start))
      removedOnly++
    }
    for (let i = 0; i < count; i++) lines.add(start + i)
  }
  return lines
}

/** Count of added + removed lines for a file. */
function churn(file) {
  const out = sh(`git diff --numstat ${mergeBase} HEAD -- "${file}"`)
  if (!out) return 0
  const [a, d] = out.split('\t')
  return (Number(a) || 0) + (Number(d) || 0)
}

/** Map top-level `export const NAME` blocks to [startLine, endLine] (1-based, HEAD side). */
function exportBlocks(src) {
  const lines = src.split('\n')
  const starts = []
  lines.forEach((l, i) => {
    const m = l.match(/^export (?:const|function|interface|type) (\w+)/)
    if (m) starts.push({ name: m[1], line: i + 1 })
  })
  return starts.map((s, i) => ({
    name: s.name,
    start: s.line,
    end: i + 1 < starts.length ? starts[i + 1].line - 1 : lines.length,
  }))
}
const blockAt = (blocks, line) =>
  blocks.find((b) => line >= b.start && line <= b.end)?.name ?? '(top)'

const changedFiles = changes.map((c) => c.file)
const isChanged = (f) => changedFiles.includes(f)

// ---------------------------------------------------------------------------
// 1. File allowlist (strict only)
// ---------------------------------------------------------------------------

const ALLOW = [
  /^content\/news\/posts\/\d{4}-\d{2}-\d{2}\.mdx$/,
  /^content\/news\/weekly-news\.json$/,
  /^content\/review-log\.json$/,
  /^src\/data\/(characters|itineraries|rides)\.ts$/,
  /^src\/lib\/content\.ts$/,
  /^src\/app\/(?:[a-z0-9-]+\/)*page\.tsx$/,
]
// Content-bearing data blocks the automation may edit inside these files.
// Anything else (types, nav, helpers) is locked.
const EDITABLE_BLOCKS = {
  'src/lib/content.ts': [
    'RIDES',
    'FOOD_SPOTS',
    'PACKING_LIST',
    'EVENTS_2026',
    'SEASONS',
    'RIDES_LAST_REVIEWED',
    'SEASONAL_LAST_REVIEWED',
    'HOLIDAYS_LAST_REVIEWED',
  ],
  'src/data/characters.ts': [
    'characters',
    'DL_LAND_INTROS',
    'DCA_LAND_INTROS',
    'CHARACTERS_LAST_REVIEWED',
  ],
  'src/data/itineraries.ts': ['dayTemplates', 'ITINERARIES_LAST_REVIEWED'],
  'src/data/rides.ts': [],
}
const NEVER_PAGES = [/^src\/app\/privacy\//, /^src\/app\/api\//]

if (STRICT) {
  for (const c of changes) {
    if (c.status === 'D') fail(`[allowlist] Automation may not delete files: ${c.file}`)
    if (c.status === 'R')
      fail(`[allowlist] Automation may not rename files: ${c.from} -> ${c.file}`)
    if (!ALLOW.some((re) => re.test(c.file)) || NEVER_PAGES.some((re) => re.test(c.file))) {
      fail(
        `[allowlist] ${c.file} is outside what automation may edit (styling, layout, components, config and scripts are locked).`
      )
    }
  }
  for (const [file, allowed] of Object.entries(EDITABLE_BLOCKS)) {
    if (!isChanged(file)) continue
    const blocks = exportBlocks(readHead(file))
    for (const ln of changedLines(file)) {
      const name = blockAt(blocks, ln)
      if (!allowed.includes(name)) {
        fail(
          `[allowlist] ${file}:${ln} edits locked block "${name}". Only ${allowed.join(', ') || 'nothing'} may change.`
        )
        break
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Code-shape locks on .ts/.tsx (strict only): imports, exports, styling
// ---------------------------------------------------------------------------

const importsOf = (src) =>
  src
    .split('\n')
    .filter((l) => /^import\s/.test(l))
    .sort()
const exportsOf = (src) =>
  [...src.matchAll(/^export (?:default )?(?:const|function|interface|type|async function) (\w+)/gm)]
    .map((m) => m[1])
    .sort()
const classNamesOf = (src) => {
  const set = new Set()
  for (const m of src.matchAll(/className=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g)) {
    const val = (m[1] ?? m[2] ?? m[3] ?? '').replace(/\$\{[^}]*\}/g, ' ')
    val
      .split(/\s+/)
      .filter(Boolean)
      .forEach((c) => set.add(c))
  }
  return set
}

// Every class the base repo already knows about (components, pages, CSS).
let knownClasses = null
function getKnownClasses() {
  if (knownClasses) return knownClasses
  knownClasses = new Set()
  const css = readBase('src/app/globals.css')
  for (const m of css.matchAll(/\.([a-zA-Z_][\w-]*)/g)) knownClasses.add(m[1])
  const files = sh(`git ls-tree -r --name-only ${mergeBase} -- src`)
    .split('\n')
    .filter((f) => /\.tsx?$/.test(f))
  for (const f of files) classNamesOf(readBase(f)).forEach((c) => knownClasses.add(c))
  return knownClasses
}

if (STRICT) {
  for (const c of changes) {
    if (c.status !== 'M' || !/\.(ts|tsx)$/.test(c.file)) continue
    const before = readBase(c.file)
    const after = readHead(c.file)
    if (JSON.stringify(importsOf(before)) !== JSON.stringify(importsOf(after))) {
      fail(`[shape] ${c.file}: import lines changed. Automation edits copy and data only.`)
    }
    const eb = exportsOf(before)
    const ea = exportsOf(after)
    const isItinerariesData = c.file === 'src/data/itineraries.ts'
    const added = ea.filter(
      (e) => !eb.includes(e) && !(isItinerariesData && e === 'ITINERARIES_LAST_REVIEWED')
    )
    const removed = eb.filter((e) => !ea.includes(e))
    if (added.length || removed.length) {
      fail(
        `[shape] ${c.file}: exports changed (added: ${added.join(', ') || 'none'}; removed: ${removed.join(', ') || 'none'}).`
      )
    }
    const styleBefore = (before.match(/style=\{\{/g) || []).length
    const styleAfter = (after.match(/style=\{\{/g) || []).length
    if (styleAfter > styleBefore)
      fail(`[styling] ${c.file}: new inline style={{...}} added. Use existing classes.`)
    const known = getKnownClasses()
    const novel = [...classNamesOf(after)].filter((cls) => !known.has(cls))
    if (novel.length)
      fail(`[styling] ${c.file}: new CSS class names not defined anywhere: ${novel.join(', ')}`)
    if (/<(font|center|br\s*\/?>\s*<br)/i.test(after) && !/<(font|center)/i.test(before)) {
      fail(`[styling] ${c.file}: legacy formatting tags added.`)
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Review dates
// ---------------------------------------------------------------------------

// constant -> where it lives, and which edits require bumping it.
const REVIEW_DATES = {
  RIDES_LAST_REVIEWED: {
    file: 'src/lib/content.ts',
    covers: [
      { file: 'src/lib/content.ts', blocks: ['RIDES'] },
      { file: 'src/data/rides.ts' },
      { file: 'src/app/rides/page.tsx' },
    ],
  },
  SEASONAL_LAST_REVIEWED: {
    file: 'src/lib/content.ts',
    covers: [
      { file: 'src/lib/content.ts', blocks: ['EVENTS_2026', 'SEASONS'] },
      { file: 'src/app/seasonal/page.tsx' },
    ],
  },
  HOLIDAYS_LAST_REVIEWED: {
    file: 'src/lib/content.ts',
    covers: [{ file: 'src/app/holidays/page.tsx' }],
  },
  PRIVACY_LAST_REVIEWED: {
    file: 'src/lib/content.ts',
    covers: [{ file: 'src/app/privacy/page.tsx' }],
  },
  CHARACTERS_LAST_REVIEWED: {
    file: 'src/data/characters.ts',
    covers: [
      {
        file: 'src/data/characters.ts',
        blocks: ['characters', 'DL_LAND_INTROS', 'DCA_LAND_INTROS'],
      },
      { file: 'src/app/characters/page.tsx' },
    ],
  },
  ITINERARIES_LAST_REVIEWED: {
    file: 'src/data/itineraries.ts',
    covers: [
      { file: 'src/data/itineraries.ts', blocks: ['dayTemplates'] },
      { prefix: 'src/app/itineraries/' },
    ],
  },
  BLUEY_LAST_REVIEWED: {
    file: 'src/app/bluey-at-disneyland/page.tsx',
    local: true,
    covers: [{ file: 'src/app/bluey-at-disneyland/page.tsx', ignoreConstLine: true }],
  },
}

const constRe = (name) => new RegExp(`^(?:export )?const ${name} = '([^']*)'`, 'm')
const readConst = (src, name) => src.match(constRe(name))?.[1]

const bumped = []
for (const [name, cfg] of Object.entries(REVIEW_DATES)) {
  const head = readConst(readHead(cfg.file), name)
  const base = readConst(readBase(cfg.file), name)
  if (head === undefined) {
    if (base !== undefined) fail(`[dates] ${name} was removed from ${cfg.file}.`)
    continue
  }
  if (!validDate(head)) fail(`[dates] ${name} = '${head}' is not a valid YYYY-MM-DD date.`)
  else if (head > TODAY) fail(`[dates] ${name} = '${head}' is in the future (today is ${TODAY}).`)
  if (base !== undefined && head < base)
    fail(`[dates] ${name} moved backwards (${base} -> ${head}).`)
  if (base !== undefined && head !== base) bumped.push(name)

  // Did covered content change?
  let touched = false
  for (const cov of cfg.covers) {
    const files = cov.prefix
      ? changedFiles.filter((f) => f.startsWith(cov.prefix))
      : [cov.file].filter(isChanged)
    for (const f of files) {
      if (!cov.blocks && !cov.ignoreConstLine) {
        touched = true
        continue
      }
      const src = readHead(f)
      const srcLines = src.split('\n')
      const blocks = exportBlocks(src)
      for (const ln of changedLines(f)) {
        if (cov.ignoreConstLine && constRe(name).test(srcLines[ln - 1] ?? '')) continue
        if (!cov.blocks || cov.blocks.includes(blockAt(blocks, ln))) {
          touched = true
          break
        }
      }
    }
  }
  if (touched && head !== TODAY) {
    fail(
      `[dates] Content covered by ${name} changed but the date is still ${head}. Set it to ${TODAY}.`
    )
  }
}

// Review log: every bumped date must be backed by today's entry (strict), and
// the log must stay well-formed (always).
const LOG_FILE = 'content/review-log.json'
let todaysEntries = []
if (fs.existsSync(path.join(root, LOG_FILE))) {
  let log
  try {
    log = JSON.parse(readHead(LOG_FILE))
  } catch (e) {
    fail(`[review-log] ${LOG_FILE} is not valid JSON: ${e.message}`)
  }
  if (log) {
    if (!Array.isArray(log.runs)) fail(`[review-log] ${LOG_FILE} must have a "runs" array.`)
    else {
      for (const r of log.runs) {
        if (!validDate(r.date) || r.date > TODAY) fail(`[review-log] bad run date: ${r.date}`)
        if (!['weekly-roundup', 'content-audit'].includes(r.job))
          fail(`[review-log] unknown job "${r.job}" on ${r.date}`)
        if (!Array.isArray(r.pagesReviewed))
          fail(`[review-log] run ${r.date} ${r.job} needs pagesReviewed[]`)
        for (const p of r.pagesReviewed || []) {
          if (!p.page || !Array.isArray(p.sources) || p.sources.length === 0) {
            fail(
              `[review-log] run ${r.date}: every reviewed page needs at least one source URL (${p.page || '?'}).`
            )
          }
        }
      }
      todaysEntries = log.runs.filter((r) => r.date === TODAY)
    }
  }
}
if (STRICT) {
  if (!isChanged(LOG_FILE) || todaysEntries.length === 0) {
    fail(`[review-log] Automated PRs must append a run dated ${TODAY} to ${LOG_FILE}.`)
  }
  const reviewedConsts = new Set(
    todaysEntries.flatMap((r) => (r.pagesReviewed || []).map((p) => p.dateField).filter(Boolean))
  )
  for (const name of bumped) {
    if (!reviewedConsts.has(name)) {
      fail(
        `[review-log] ${name} was bumped but today's log entry has no reviewed page with dateField "${name}".`
      )
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Protected pages: Characters, Rides, Itineraries are the best performers.
//    Automation may make factual updates there, not rewrites.
// ---------------------------------------------------------------------------

const PROTECTED_CAP = Number(process.env.PROTECTED_CHURN_CAP || 160)
if (STRICT) {
  const protectedFiles = changedFiles.filter(
    (f) =>
      f === 'src/data/characters.ts' ||
      f === 'src/data/itineraries.ts' ||
      f === 'src/app/characters/page.tsx' ||
      f === 'src/app/rides/page.tsx' ||
      f.startsWith('src/app/itineraries/')
  )
  let total = protectedFiles.reduce((n, f) => n + churn(f), 0)
  // RIDES lives in content.ts alongside other data; count only RIDES-block lines.
  if (isChanged('src/lib/content.ts')) {
    const blocks = exportBlocks(readHead('src/lib/content.ts'))
    total += [...changedLines('src/lib/content.ts')].filter(
      (ln) => blockAt(blocks, ln) === 'RIDES'
    ).length
  }
  if (total > PROTECTED_CAP) {
    fail(
      `[protected] ${total} lines changed across Characters/Rides/Itineraries (cap ${PROTECTED_CAP}). That's a rewrite, not a factual update. Leave this PR for Ashu.`
    )
  }
  for (const f of [
    'src/app/characters/page.tsx',
    'src/app/rides/page.tsx',
    'src/app/itineraries/page.tsx',
  ]) {
    if (!isChanged(f)) continue
    const h1 = (s) => s.match(/<h1[\s\S]*?<\/h1>/)?.[0]
    const metaTitle = (s) => s.match(/title:\s*(['"`])([\s\S]*?)\1/)?.[2]
    if (h1(readBase(f)) !== h1(readHead(f)))
      fail(`[protected] ${f}: H1 changed. Ranking pages keep their H1.`)
    if (metaTitle(readBase(f)) !== metaTitle(readHead(f)))
      fail(`[protected] ${f}: metadata title changed.`)
  }
}

// ---------------------------------------------------------------------------
// 5. News posts (MDX)
// ---------------------------------------------------------------------------

const POSTS_DIR = 'content/news/posts'
const allPosts = fs.readdirSync(path.join(root, POSTS_DIR)).filter((f) => f.endsWith('.mdx'))
const ALLOWED_FM = ['title', 'slug', 'date', 'description', 'heroImage']
const ALLOWED_TAGS = new Set(['AffiliateCTA', 'TicketsCTA'])
const PARTNERS = new Set(['getawaytoday', 'undercovertourist', 'amazon'])

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return null
  const fm = {}
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) continue
    let v = kv[2].trim()
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"')))
      v = v.slice(1, -1)
    fm[kv[1]] = v.replace(/''/g, "'")
  }
  return { fm, body: src.slice(m[0].length) }
}

const slugs = new Map()
for (const f of allPosts) {
  const parsed = parseFrontmatter(readHead(`${POSTS_DIR}/${f}`))
  if (parsed?.fm.slug) slugs.set(parsed.fm.slug, (slugs.get(parsed.fm.slug) || 0) + 1)
}
for (const [s, n] of slugs) if (n > 1) fail(`[news] duplicate slug "${s}" used by ${n} posts.`)

const touchedPosts = changes.filter((c) => c.file.startsWith(`${POSTS_DIR}/`) && c.status !== 'D')
for (const c of touchedPosts) {
  const file = c.file
  const src = readHead(file)
  const parsed = parseFrontmatter(src)
  if (!parsed) {
    fail(`[news] ${file}: missing or malformed frontmatter block.`)
    continue
  }
  const { fm, body } = parsed
  const keys = Object.keys(fm)
  for (const k of ALLOWED_FM)
    if (!fm[k]) fail(`[news] ${file}: frontmatter "${k}" is missing or empty.`)
  for (const k of keys)
    if (!ALLOWED_FM.includes(k)) fail(`[news] ${file}: unexpected frontmatter key "${k}".`)
  const fileDate = path.basename(file, '.mdx')
  if (fm.date && !validDate(fm.date)) fail(`[news] ${file}: date "${fm.date}" is not YYYY-MM-DD.`)
  if (fm.date && fm.date > TODAY) fail(`[news] ${file}: date ${fm.date} is in the future.`)
  if (fm.date && fm.date !== fileDate)
    fail(`[news] ${file}: frontmatter date ${fm.date} doesn't match filename.`)
  if (fm.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fm.slug))
    fail(`[news] ${file}: slug "${fm.slug}" must be lowercase-dashed.`)
  if (c.status === 'M') {
    const old = parseFrontmatter(readBase(file))
    if (old && old.fm.slug !== fm.slug)
      fail(`[news] ${file}: slug changed on a published post (breaks URLs).`)
  }
  if (fm.title && !/^Disneyland News for Families/.test(fm.title))
    warn(`[news] ${file}: title doesn't follow "Disneyland News for Families — ..." pattern.`)
  if (fm.description && fm.description.length > 360)
    warn(`[news] ${file}: description is ${fm.description.length} chars; aim for under 300.`)
  if (fm.heroImage && !fs.existsSync(path.join(root, 'public', fm.heroImage))) {
    warn(
      `[news] ${file}: heroImage ${fm.heroImage} doesn't exist in public/ (pre-existing pattern on all posts).`
    )
  }

  // Body structure
  if (/^# /m.test(body))
    fail(
      `[news] ${file}: body has an H1 (#). The page renders the title as H1; use ## for sections.`
    )
  if (/^#{4,} /m.test(body))
    warn(`[news] ${file}: uses #### or deeper headings; existing posts stop at ###.`)
  const tags = [...body.matchAll(/<\/?([A-Za-z][\w.]*)/g)].map((m) => m[1])
  for (const t of new Set(tags)) {
    if (!ALLOWED_TAGS.has(t))
      fail(
        `[news] ${file}: <${t}> is not allowed in news MDX (only AffiliateCTA, TicketsCTA; use markdown for formatting).`
      )
  }
  if (/style\s*=/.test(body)) fail(`[news] ${file}: inline style attribute in MDX.`)
  if (/^(import|export)\s/m.test(body))
    fail(`[news] ${file}: import/export statements are not allowed in MDX.`)
  for (const m of body.matchAll(/<AffiliateCTA\b([^>]*)\/>/g)) {
    const partner = m[1].match(/partner="([^"]+)"/)?.[1]
    if (!PARTNERS.has(partner))
      fail(
        `[news] ${file}: AffiliateCTA partner "${partner}" is not one of ${[...PARTNERS].join(', ')}.`
      )
  }
  if (!/<AffiliateCTA\b[^>]*\/>/.test(body))
    fail(`[news] ${file}: no <AffiliateCTA ... /> in the post.`)
  const unclosed = (body.match(/<AffiliateCTA\b(?![^>]*\/>)/g) || []).length
  if (unclosed) fail(`[news] ${file}: AffiliateCTA must be self-closing (<AffiliateCTA ... />).`)
  const h2s = [...body.matchAll(/^## (.*)$/gm)].map((m) => m[1])
  for (const need of ['Trip-Planning Impact', 'Ride Status', "What We're Watching"]) {
    if (!h2s.some((h) => h.includes(need)))
      fail(`[news] ${file}: missing the "${need}" section (## heading).`)
  }
  if (!h2s.some((h) => h.includes('Deals'))) warn(`[news] ${file}: no Deals & Tickets section.`)
  // Markdown tables: every row in a table must have the same column count.
  const tableBlocks = body.split(/\n(?!\|)/).filter((b) => b.trim().startsWith('|'))
  for (const tb of tableBlocks) {
    const rows = tb
      .trim()
      .split('\n')
      .filter((r) => r.trim().startsWith('|'))
    const cols = rows.map(
      (r) =>
        r
          .trim()
          .replace(/^\||\|$/g, '')
          .split('|').length
    )
    if (new Set(cols).size > 1)
      fail(
        `[news] ${file}: a markdown table has rows with different column counts (${cols.join(',')}).`
      )
  }
  if (body.trim().split(/\s+/).length < 400)
    warn(`[news] ${file}: under 400 words; recent roundups run 1,200+.`)
}

// ---------------------------------------------------------------------------
// 6. Ticker JSON
// ---------------------------------------------------------------------------

const TICKER = 'content/news/weekly-news.json'
if (isChanged(TICKER) || touchedPosts.length) {
  let t
  try {
    t = JSON.parse(readHead(TICKER))
  } catch (e) {
    fail(`[ticker] ${TICKER} is not valid JSON: ${e.message}`)
  }
  if (t) {
    if (!validDate(t.weekOf)) fail(`[ticker] weekOf "${t.weekOf}" is not YYYY-MM-DD.`)
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(t.lastUpdated || ''))
      fail(`[ticker] lastUpdated must be ISO 8601 UTC with Z.`)
    else if (new Date(t.lastUpdated).getTime() > Date.now() + 10 * 60 * 1000)
      fail(`[ticker] lastUpdated is in the future.`)
    if (!slugs.has(t.currentPostSlug))
      fail(`[ticker] currentPostSlug "${t.currentPostSlug}" doesn't match any post.`)
    if (!Array.isArray(t.ticker) || t.ticker.length !== 5)
      fail(`[ticker] ticker must have exactly 5 items.`)
    else {
      const pr = t.ticker.map((i) => i.priority).sort()
      if (pr.join(',') !== '1,2,3,4,5')
        fail(`[ticker] priorities must be 1 through 5, each used once.`)
      const ids = new Set(t.ticker.map((i) => i.id))
      if (ids.size !== 5) fail(`[ticker] ticker ids must be unique.`)
      for (const i of t.ticker) {
        if (!i.headline || /\.$/.test(i.headline.trim()))
          fail(`[ticker] headline "${i.headline}" is empty or ends with a period.`)
        if (i.headline && i.headline.length > 90)
          warn(`[ticker] headline is ${i.headline.length} chars; long for a ticker.`)
        if (!/^\//.test(i.link || ''))
          fail(`[ticker] link "${i.link}" must be a site-relative path.`)
        const m = (i.link || '').match(/^\/news\/([^#?]+)/)
        if (m && !slugs.has(m[1]))
          fail(`[ticker] link ${i.link} points to a post that doesn't exist.`)
      }
    }
    const latest = allPosts.sort().at(-1)
    const latestSlug = parseFrontmatter(readHead(`${POSTS_DIR}/${latest}`))?.fm.slug
    if (touchedPosts.some((c) => c.status === 'A') && latestSlug !== t.currentPostSlug) {
      fail(
        `[ticker] a new post was added but currentPostSlug still points at "${t.currentPostSlug}".`
      )
    }
  }
}

// ---------------------------------------------------------------------------
// 7. Voice and affiliate integrity
// ---------------------------------------------------------------------------

// Added lines only, across content files.
const addedText = sh(
  `git diff -U0 ${mergeBase} HEAD -- content src/data src/lib/content.ts src/app`
)
  .split('\n')
  .filter((l) => l.startsWith('+') && !l.startsWith('+++'))
  .join('\n')
if (/\bmagical\b/i.test(addedText)) fail(`[voice] "magical" is banned in site copy.`)
if (/\b(lorem ipsum|TODO|TBD|\[insert|PLACEHOLDER)\b/i.test(addedText) && STRICT) {
  fail(`[voice] placeholder text (TODO/TBD/lorem/[insert) in added content.`)
}

const AFFILIATE_TOKENS = ['rideornaptime-20', '9474', 'RIDETIME']
const countIn = (ref, token) => {
  try {
    const out = ref
      ? sh(`git grep -c -w -F "${token}" ${ref} -- src content`)
      : sh(`git grep -c -w -F "${token}" -- src content`)
    return out.split('\n').reduce((n, l) => n + Number(l.split(':').pop() || 0), 0)
  } catch {
    return 0
  }
}
for (const tok of AFFILIATE_TOKENS) {
  const before = countIn(mergeBase, tok)
  const after = countIn(null, tok)
  if (after < before)
    fail(
      `[affiliate] "${tok}" appears ${after}x, down from ${before}x. An affiliate ID or promo code was removed.`
    )
}
// Raw affiliate URLs should go through AffiliateLink/AffiliateCTA, not bare <a>.
if (
  /https?:\/\/(www\.)?(getawaytoday\.com|undercovertourist\.com|amazon\.com|amzn\.to)/i.test(
    addedText
  )
) {
  warn(
    `[affiliate] a raw partner URL was added; make sure it goes through AffiliateLink/AffiliateCTA so tracking and rel="sponsored" apply.`
  )
}

// ---------------------------------------------------------------------------

const mode = STRICT ? 'strict (automation)' : 'default'
console.log(`Content guard: ${mode} mode, base ${BASE} (${mergeBase.slice(0, 7)}), today ${TODAY}`)
console.log(`Files changed: ${changedFiles.length}`)
for (const w of warnings) console.log(`  warn  ${w}`)
for (const e of errors) console.log(`  FAIL  ${e}`)
if (errors.length) {
  console.log(`\n${errors.length} failure(s). Not safe to merge.`)
  process.exit(1)
}
console.log(`\nPassed${warnings.length ? ` with ${warnings.length} warning(s)` : ''}.`)
