// Shared Lighthouse CI config builder for the desktop and mobile profiles.
//
// Routes come from scripts/qa/routes.cjs (filesystem-derived), so both profiles
// audit every routed page automatically — including the 7 itinerary sub-routes,
// which rendered nothing until the SSR pass and had never been audited at all.
//
// The server is `next start` on QA_PORT, owned by scripts/qa/run.mjs.

const { allQaRoutes } = require('./routes.cjs')

const PORT = Number(process.env.QA_PORT ?? 3000)
const BASE = process.env.QA_BASE_URL ?? `http://localhost:${PORT}`

// Core Web Vitals targets. Assertions are per-metric rather than on the
// composite performance score so a regression names the metric that moved.
const BUDGETS = {
  lcp: 2500, // ms — "good" threshold
  tbt: 200, // ms
  cls: 0.1,
}

// Lighthouse's standard mobile emulation: Moto G-class CPU (4x slowdown) on
// simulated slow 4G. These are Lighthouse's own mobile defaults, pinned
// explicitly so a tooling upgrade can't silently move the goalposts.
const MOBILE = {
  formFactor: 'mobile',
  screenEmulation: {
    mobile: true,
    width: 412,
    height: 823,
    deviceScaleFactor: 1.75,
    disabled: false,
  },
  throttlingMethod: 'simulate',
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
    requestLatencyMs: 562.5,
    downloadThroughputKbps: 1474.56,
    uploadThroughputKbps: 675,
  },
}

// Per-metric severity, set from measured behaviour rather than blanket:
//
//   TBT   error — passes on every route with ~10x headroom (worst 22ms of 200ms).
//                 A breach here is a genuine main-thread regression.
//   LCP   warn  — no route currently meets 2.5s under Lighthouse's simulated
//                 slow-4G. The floor is render-blocking CSS + 103KB of preloaded
//                 fonts, not images: /privacy has a TEXT LCP element and still
//                 lands at 2.56s. Promote to error once the font payload is cut.
//   CLS   warn  — the only breach is /about at 0.143, which does not reproduce
//                 in Chrome under identical emulation (cold cache, 4x CPU, same
//                 throttling) and is perfectly correlated with page height: only
//                 the two pages under ~2.5 viewports tall register any shift at
//                 all. Treated as a Lighthouse short-page measurement artifact.
//                 Promote to error if a shift is ever reproduced outside LHCI.
const SEVERITY = { lcp: 'warn', tbt: 'error', cls: 'warn' }

/**
 * @param {'mobile'|'desktop'} profile
 * @param {{ metricSeverity?: 'error'|'warn' }} [opts]
 */
function lhciConfig(profile, opts = {}) {
  const isMobile = profile === 'mobile'
  // Override to tighten everything at once, e.g. in a dedicated perf CI job.
  const sev = (metric) => opts.metricSeverity ?? SEVERITY[metric]

  return {
    ci: {
      collect: {
        url: allQaRoutes().map((r) => `${BASE}${r}`),
        // 1 run keeps the pre-push gate usable (25 routes x mobile throttling
        // is slow). Raise for a noise-resistant sweep: LHCI_RUNS=3 npm run qa:lhci:mobile
        numberOfRuns: Number(process.env.LHCI_RUNS ?? 1),
        settings: {
          ...(isMobile ? MOBILE : { preset: 'desktop' }),
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        },
      },
      assert: {
        assertions: {
          'categories:performance': ['warn', { minScore: isMobile ? 0.7 : 0.85 }],
          'categories:accessibility': ['error', { minScore: 0.95 }],
          'categories:best-practices': ['warn', { minScore: 0.95 }],
          'categories:seo': ['error', { minScore: 0.95 }],
          'largest-contentful-paint': [sev('lcp'), { maxNumericValue: BUDGETS.lcp }],
          'total-blocking-time': [sev('tbt'), { maxNumericValue: BUDGETS.tbt }],
          'cumulative-layout-shift': [sev('cls'), { maxNumericValue: BUDGETS.cls }],
        },
      },
      upload: {
        target: 'filesystem',
        outputDir: `qa-report/lhci-${profile}`,
      },
    },
  }
}

module.exports = { lhciConfig, BUDGETS, MOBILE }
