import { execSync } from 'node:child_process'
import path from 'node:path'

const FALLBACK_ISO = '2026-04-15T00:00:00.000Z'

/** Raw strict-ISO commit date with the committer's offset (e.g. 2026-11-15T21:51:51-08:00). */
function readGitRaw(relativePath: string): string {
  try {
    const abs = path.resolve(process.cwd(), relativePath)
    const raw = execSync(`git log -1 --format=%cI -- "${abs}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (!raw || Number.isNaN(new Date(raw).getTime())) return FALLBACK_ISO
    return raw
  } catch {
    return FALLBACK_ISO
  }
}

/** Most recent commit (raw ISO with offset) across one or more files. */
function latestRaw(relativePaths: string[]): string {
  return relativePaths
    .map(readGitRaw)
    .reduce((latest, raw) => (new Date(raw) > new Date(latest) ? raw : latest))
}

/** Data file shared by every itinerary page — pass alongside the page file so data-only edits bump the date. */
export const ITINERARY_DATA_FILE = 'src/data/itineraries.ts'

/** Latest git commit timestamp (UTC ISO) across one or more files. */
export function getLastModified(...relativePaths: string[]): string {
  return new Date(latestRaw(relativePaths)).toISOString()
}

/**
 * Latest git commit date (YYYY-MM-DD) across one or more files, in the committer's
 * local date — so a late-evening Pacific commit isn't shown as the next day.
 */
export function getLastModifiedDate(...relativePaths: string[]): string {
  return latestRaw(relativePaths).slice(0, 10)
}
