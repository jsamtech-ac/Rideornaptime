import fs from 'node:fs'
import path from 'node:path'
import { test, expect } from '@playwright/test'

// Rendering checks for the current weekly roundup, so a broken MDX post can't
// auto-merge. Runs against whatever post weekly-news.json points at.
const ticker = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'content', 'news', 'weekly-news.json'), 'utf8')
) as { currentPostSlug: string }
const route = `/news/${ticker.currentPostSlug}`

test(`news post renders cleanly: ${route}`, async ({ page }) => {
  const response = await page.goto(route, { waitUntil: 'networkidle' })
  expect(response?.status(), `${route} did not return 200`).toBe(200)

  await expect(page.locator('h1')).toHaveCount(1)
  expect(await page.locator('article h2, main h2').count()).toBeGreaterThanOrEqual(3)

  // Raw MDX leaking into the page means a component or table failed to parse.
  const text = await page.locator('main').innerText()
  expect(text).not.toMatch(/<\/?(AffiliateCTA|TicketsCTA)\b/)
  expect(text).not.toMatch(/^\s*\|.*\|\s*$/m)
  expect(text).not.toMatch(/^#{1,6} /m)

  // At least one sponsored affiliate link rendered with the right rel.
  const sponsored = page.locator('a[rel*="sponsored"]')
  expect(await sponsored.count()).toBeGreaterThan(0)
})

test(`news post has no horizontal scroll on mobile: ${route}`, async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-mobile', 'mobile viewport only')
  await page.goto(route, { waitUntil: 'networkidle' })
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  )
  expect(overflow, `horizontal scroll detected on ${route}`).toBe(false)
})
