import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const ROUTES = [
  '/',
  '/first-visit',
  '/characters',
  '/rides',
  '/itineraries',
  '/lightning-lane',
  '/food',
  '/packing-list',
  '/seasonal',
  '/saving-money',
  '/hidden-gems',
  '/fireworks',
  '/best-strollers',
]

for (const route of ROUTES) {
  test(`a11y: ${route}`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: 'networkidle' })

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    )

    await testInfo.attach(`axe-${route.replace(/\//g, '_') || 'root'}.json`, {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    })

    expect(
      serious,
      serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} node(s))`).join('\n')
    ).toEqual([])
  })

  test(`no horizontal scroll on mobile: ${route}`, async ({ page, browserName }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile viewport only')
    await page.goto(route, { waitUntil: 'networkidle' })
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    })
    expect(overflow, `horizontal scroll detected on ${route}`).toBe(false)
  })

  test(`has exactly one h1: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' })
    const count = await page.locator('h1').count()
    expect(count, `expected exactly 1 h1, found ${count}`).toBe(1)
  })
}
