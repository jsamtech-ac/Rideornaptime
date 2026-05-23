import { execSync } from 'node:child_process'
import path from 'node:path'

const FALLBACK_ISO = '2026-04-15T00:00:00.000Z'

function readGitISO(relativePath: string): string {
  try {
    const abs = path.resolve(process.cwd(), relativePath)
    const raw = execSync(`git log -1 --format=%cI -- "${abs}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (!raw) return FALLBACK_ISO
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return FALLBACK_ISO
    return d.toISOString()
  } catch {
    return FALLBACK_ISO
  }
}

export function getLastModified(relativePath: string): string {
  return readGitISO(relativePath)
}

export function getLastModifiedDate(relativePath: string): string {
  return readGitISO(relativePath).slice(0, 10)
}
