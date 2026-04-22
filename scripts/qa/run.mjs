#!/usr/bin/env node
// Pre-push QA orchestrator (Layer 1 — deterministic checks).
// Runs each tool, captures pass/fail + output, writes qa-report/layer1.json.
// Exit code: 0 = all passed, 1 = one or more blockers failed, 2 = warnings only.

import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const reportDir = resolve(root, 'qa-report')
mkdirSync(reportDir, { recursive: true })

const COLOR = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
}

function log(msg, color = '') {
  process.stdout.write(`${color}${msg}${COLOR.reset}\n`)
}

function run(cmd, args, { env = {} } = {}) {
  return new Promise((resolvePromise) => {
    const start = Date.now()
    const child = spawn(cmd, args, {
      cwd: root,
      env: { ...process.env, ...env },
      shell: false,
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d) => {
      stdout += d.toString()
      process.stdout.write(d)
    })
    child.stderr.on('data', (d) => {
      stderr += d.toString()
      process.stderr.write(d)
    })
    child.on('close', (code) => {
      resolvePromise({
        code,
        stdout,
        stderr,
        durationMs: Date.now() - start,
      })
    })
  })
}

// Each check: { id, label, severity: 'blocker' | 'warning', run: () => Promise<result> }
const checks = [
  {
    id: 'types',
    label: 'TypeScript',
    severity: 'blocker',
    cmd: ['npx', ['tsc', '--noEmit']],
  },
  {
    id: 'lint',
    label: 'ESLint',
    severity: 'blocker',
    cmd: ['npx', ['next', 'lint', '--max-warnings=0']],
  },
  {
    id: 'format',
    label: 'Prettier',
    severity: 'warning',
    cmd: ['npx', ['prettier', '--check', '.']],
  },
  {
    id: 'build',
    label: 'Next build',
    severity: 'blocker',
    cmd: ['npx', ['next', 'build']],
  },
  {
    id: 'links',
    label: 'Link checker',
    severity: 'blocker',
    needsServer: true,
    cmd: [
      'npx',
      [
        'linkinator',
        'http://localhost:3000',
        '--config',
        'linkinator.config.json',
        '--format',
        'json',
      ],
    ],
    output: 'qa-report/links.json',
  },
  {
    id: 'a11y',
    label: 'Playwright + axe',
    severity: 'blocker',
    needsServer: true,
    cmd: ['npx', ['playwright', 'test', '--reporter=list,json']],
  },
  {
    id: 'lhci',
    label: 'Lighthouse CI',
    severity: 'warning',
    needsServer: true,
    cmd: ['npx', ['lhci', 'autorun']],
  },
]

async function killPort(port) {
  // best-effort: kill whatever is on the port before we start
  try {
    const lsof = spawn('lsof', ['-ti', `:${port}`])
    const pids = await new Promise((res) => {
      let out = ''
      lsof.stdout.on('data', (d) => (out += d.toString()))
      lsof.on('close', () => res(out.trim().split('\n').filter(Boolean)))
    })
    for (const pid of pids) {
      try {
        process.kill(Number(pid), 'SIGKILL')
        log(`  killed stale process on :${port} (pid ${pid})`, COLOR.yellow)
      } catch {}
    }
    if (pids.length) await new Promise((r) => setTimeout(r, 500))
  } catch {}
}

async function startServer() {
  log('\n▶ starting next server (background)...', COLOR.cyan)
  await killPort(3000)
  const child = spawn('npx', ['next', 'dev', '-p', '3000'], {
    cwd: root,
    shell: false,
    detached: false,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let lastErr = ''
  child.stderr.on('data', (d) => (lastErr = d.toString()))
  const deadline = Date.now() + 90_000
  let ready = false
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`next server exited early (code ${child.exitCode}): ${lastErr}`)
    }
    try {
      const r = await fetch('http://localhost:3000/', { signal: AbortSignal.timeout(2000) })
      if (r.status >= 200 && r.status < 400) {
        ready = true
        break
      }
    } catch {
      // not up yet
    }
    await new Promise((res) => setTimeout(res, 500))
  }
  if (!ready) {
    child.kill()
    throw new Error(`next server did not become ready within 90s. last stderr: ${lastErr}`)
  }
  log('  server ready on :3000', COLOR.green)
  return child
}

async function main() {
  const results = []
  let server

  const fast = process.argv.includes('--fast') || process.env.SKIP_LHCI === '1'
  const skip = new Set()
  if (fast) skip.add('lhci')

  const activeChecks = checks.filter((c) => !skip.has(c.id))
  if (fast) {
    log(`\n▶ --fast mode: skipping ${[...skip].join(', ')}`, COLOR.yellow)
  }

  for (const check of activeChecks) {
    log(`\n═══ ${check.label} (${check.severity}) ═══`, COLOR.bold + COLOR.cyan)

    if (check.needsServer && !server) {
      try {
        server = await startServer()
      } catch (e) {
        results.push({
          id: check.id,
          label: check.label,
          severity: check.severity,
          passed: false,
          error: e.message,
        })
        continue
      }
    }

    const r = await run(check.cmd[0], check.cmd[1])
    const passed = r.code === 0
    results.push({
      id: check.id,
      label: check.label,
      severity: check.severity,
      passed,
      exitCode: r.code,
      durationMs: r.durationMs,
    })
    log(
      passed
        ? `✓ ${check.label} passed (${(r.durationMs / 1000).toFixed(1)}s)`
        : `✗ ${check.label} FAILED`,
      passed ? COLOR.green : COLOR.red
    )
  }

  if (server) {
    server.kill('SIGTERM')
  }

  // Summary
  const blockers = results.filter((r) => !r.passed && r.severity === 'blocker')
  const warnings = results.filter((r) => !r.passed && r.severity === 'warning')
  const passed = results.filter((r) => r.passed)

  log('\n\n' + '═'.repeat(60), COLOR.bold)
  log(' Layer 1 — Deterministic QA Summary', COLOR.bold + COLOR.cyan)
  log('═'.repeat(60), COLOR.bold)
  log(`\n  passed:   ${passed.length}/${results.length}`, COLOR.green)
  log(`  warnings: ${warnings.length}`, warnings.length ? COLOR.yellow : '')
  log(`  blockers: ${blockers.length}`, blockers.length ? COLOR.red : '')

  if (blockers.length) {
    log('\nBLOCKERS:', COLOR.red + COLOR.bold)
    for (const b of blockers) log(`  ✗ ${b.label}`, COLOR.red)
  }
  if (warnings.length) {
    log('\nWARNINGS:', COLOR.yellow + COLOR.bold)
    for (const w of warnings) log(`  ⚠ ${w.label}`, COLOR.yellow)
  }

  const report = {
    timestamp: new Date().toISOString(),
    results,
    summary: { passed: passed.length, warnings: warnings.length, blockers: blockers.length },
  }
  writeFileSync(resolve(reportDir, 'layer1.json'), JSON.stringify(report, null, 2))
  log(`\nfull report → qa-report/layer1.json`, COLOR.cyan)

  if (blockers.length) {
    log('\n❌ DO NOT PUSH — Layer 1 blockers must be fixed first.\n', COLOR.red + COLOR.bold)
    process.exit(1)
  }
  if (warnings.length) {
    log(
      '\n⚠  Layer 1 passed with warnings — run Layer 2 (/qa in Claude Code) before deciding to push.\n',
      COLOR.yellow
    )
    process.exit(2)
  }
  log(
    '\n✅ Layer 1 clean — run /qa in Claude Code for qualitative Layer 2 review.\n',
    COLOR.green + COLOR.bold
  )
  process.exit(0)
}

main().catch((e) => {
  log(`\nOrchestrator crashed: ${e.message}`, COLOR.red)
  process.exit(1)
})
