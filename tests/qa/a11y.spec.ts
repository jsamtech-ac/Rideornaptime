import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Routes come from the same filesystem-derived source Lighthouse uses
// (scripts/qa/routes.cjs), so a new page directory is audited automatically and
// the two gates can never cover different route sets.
const { allQaRoutes } = require('../../scripts/qa/routes.cjs') as {
  allQaRoutes: () => string[]
}

const ROUTES: string[] = allQaRoutes()

for (const route of ROUTES) {
  test(`a11y: ${route}`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: 'networkidle' })

    // NOTE: this used to grow the viewport to the full document height to work
    // around "axe false positives on tall pages". That diagnosis was wrong. The
    // real cause was `content-visibility: auto` on .section/.callout: it skips
    // layout for off-screen content, so axe's color-contrast hit-test found
    // nothing at the element's centre point and substituted an unrelated
    // background (the dark footer). Page height only correlated, because taller
    // pages have more skipped content. With those two selectors removed from
    // the content-visibility list, /characters (21,404px) reports zero
    // violations at a normal viewport — so the workaround is gone.
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
