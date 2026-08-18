/**
 * Last-updated dates for routed pages.
 *
 * These used to be resolved by shelling out to `git log -1 --format=%cI`, which
 * had two defects serious enough to drive visibly wrong dates into production:
 *
 *   1. On a shallow CI clone (Vercel's default) `git log` returns nothing for
 *      files outside the fetched depth, and the helper silently substituted a
 *      hardcoded 2026-04-15. A brand-new page therefore advertised a
 *      modified date from before it existed.
 *   2. It parsed the commit's local timestamp and re-serialised it as UTC, so
 *      any evening commit displayed as the following day.
 *
 * The dates now live as explicit `lastUpdated` fields in the PAGES registry in
 * `./pages`, are validated at module load, and are parsed as UTC-fixed calendar
 * dates so no timezone conversion can shift them.
 */

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export interface LastUpdated {
  /** Full ISO timestamp — for article:modified_time. */
  iso: string
  /** YYYY-MM-DD — for JSON-LD dateModified and <time dateTime>. */
  date: string
  /** "Jul 28" — for compact visible UI such as hub cards. */
  short: string
  /** "July 28, 2026" — for long-form visible UI. */
  long: string
}

/** True only for a real `YYYY-MM-DD` calendar date (rejects e.g. 2026-02-31). */
function isValidCalendarDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false
  const d = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value
}

/**
 * Expands one `YYYY-MM-DD` into every shape the page needs. Callers take all
 * strings from the returned object, which is what keeps the meta tag, the
 * JSON-LD and the visible UI in lockstep.
 *
 * Throws on a malformed date rather than falling back to anything.
 */
export function buildLastUpdated(date: string): LastUpdated {
  if (!isValidCalendarDate(date)) {
    throw new Error(
      `Invalid lastUpdated ${JSON.stringify(date)} — expected a real YYYY-MM-DD calendar date.`
    )
  }

  // Fixed to UTC on both ends: the value is a calendar date, not an instant, so
  // it must not shift with the build machine's timezone.
  const d = new Date(`${date}T00:00:00Z`)

  return {
    iso: d.toISOString(),
    date,
    short: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
    long: d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }),
  }
}

/**
 * Build-time gate over the whole page registry: every routed page must carry a
 * well-formed, non-future `lastUpdated`. Called at module load in `./pages`, so
 * a violation fails `next build` with the offending routes named.
 */
export function assertRegistryDates(pages: Record<string, { lastUpdated?: string }>): void {
  const today = new Date().toISOString().slice(0, 10)
  const problems: string[] = []

  for (const [route, entry] of Object.entries(pages)) {
    const value = entry.lastUpdated
    if (!value) {
      problems.push(`  ${route} — missing lastUpdated`)
      continue
    }
    if (!isValidCalendarDate(value)) {
      problems.push(`  ${route} — "${value}" is not a valid YYYY-MM-DD date`)
      continue
    }
    if (value > today) {
      problems.push(`  ${route} — "${value}" is in the future (today is ${today})`)
    }
  }

  if (problems.length) {
    throw new Error(
      `Invalid lastUpdated values in the page registry (src/lib/pages.ts):\n${problems.join('\n')}`
    )
  }
}
