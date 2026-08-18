import { defineConfig, devices } from '@playwright/test'

// Port comes from the QA orchestrator (scripts/qa/run.mjs), which already owns
// a production server on it. Falls back to 3000 for a bare `npm run qa:a11y`.
const PORT = Number(process.env.QA_PORT ?? 3000)
const BASE_URL = process.env.QA_BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/qa',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  workers: 2,
  reporter: [['list'], ['json', { outputFile: 'qa-report/playwright.json' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'chromium-mobile',
      use: {
        ...devices['Pixel 5'],
        browserName: 'chromium',
        defaultBrowserType: 'chromium',
      },
    },
  ],
  // When QA_PORT is set the orchestrator has already started a production
  // server, so Playwright must not spawn its own — under CI,
  // reuseExistingServer is false and the second server would fight for the
  // port. Standalone runs still get a dev server started for them.
  webServer: process.env.QA_PORT
    ? undefined
    : {
        command: 'npm run dev',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
