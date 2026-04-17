import { defineConfig, devices } from '@playwright/test'

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
    baseURL: 'http://localhost:3000',
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
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
