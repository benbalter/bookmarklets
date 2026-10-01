// Runs in every browser project (Chromium and Firefox): each bookmarklet runs
// without throwing and does its thing.
import { test, expect } from '@playwright/test'
import { serve, click, errors, fixture } from './helpers'

test('copy-issue-link runs and reports a result', async ({ page }) => {
  const pageErrors = errors(page)
  await serve(page, { 'https://github.com/octo/repo/issues/12': fixture('copy-issue-link', 'issue') })
  await page.goto('https://github.com/octo/repo/issues/12')
  await click(page, 'copy-issue-link')
  // Firefox can't be granted clipboard permissions, so accept either outcome.
  await expect(page.locator('div[style*="2147483647"]')).toHaveText(
    /^(Copied: \[Fix the widget\]\(https:\/\/github\.com\/octo\/repo\/issues\/12\)|Could not copy to the clipboard)$/,
  )
  expect(pageErrors).toEqual([])
})

const navigations: [string, string, string | RegExp][] = [
  ['increment-url', 'https://example.com/page/41', 'https://example.com/page/42'],
  ['view-without-cache', 'https://example.com/page', /^https:\/\/example\.com\/page\?dontCache=\d+$/],
  ['pages-toggle', 'https://github.com/octo/widgets', 'https://octo.github.io/widgets/'],
]

for (const [id, from, to] of navigations) {
  test(`${id} navigates`, async ({ page }) => {
    const pageErrors = errors(page)
    await serve(page)
    await page.goto(from)
    await click(page, id)
    await expect(page).toHaveURL(to)
    expect(pageErrors).toEqual([])
  })
}
