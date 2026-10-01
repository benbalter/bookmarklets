// Chromium: each built bookmarklet, clicked on a fixture page, copies or
// navigates where it should.
import { test, expect } from '@playwright/test'
import { serve, click, errors, fixture } from './helpers'

const toast = (page: import('@playwright/test').Page) => page.locator('div[style*="2147483647"]')

test.describe('copy-issue-link', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://github.com' })
  })

  test('copies a Markdown link to an issue', async ({ page }) => {
    const pageErrors = errors(page)
    await serve(page, { 'https://github.com/octo/repo/issues/12': fixture('copy-issue-link', 'issue') })
    await page.goto('https://github.com/octo/repo/issues/12?q=x')
    await click(page, 'copy-issue-link')
    const link = '[Fix the widget](https://github.com/octo/repo/issues/12)'
    await expect(toast(page)).toHaveText(`Copied: ${link}`)
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(link)
    expect(pageErrors).toEqual([])
  })

  test('copies a pull request comment link with its kind', async ({ page }) => {
    await serve(page, { 'https://github.com/octo/repo/pull/34': fixture('copy-issue-link', 'pull') })
    await page.goto('https://github.com/octo/repo/pull/34#discussion_r99')
    await click(page, 'copy-issue-link')
    await expect(toast(page)).toHaveText(/^Copied: /)
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      '[Add a feature (discussion)](https://github.com/octo/repo/pull/34#discussion_r99)',
    )
  })

  test('falls back to the page title', async ({ page }) => {
    await serve(page, { 'https://github.com/octo/repo/pull/56': fixture('copy-issue-link', 'title-only') })
    await page.goto('https://github.com/octo/repo/pull/56')
    await click(page, 'copy-issue-link')
    await expect(toast(page)).toHaveText(/^Copied: /)
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('[Speed up builds](https://github.com/octo/repo/pull/56)')
  })

  test('shows an error off GitHub issues', async ({ page }) => {
    await serve(page)
    await page.goto('https://github.com/octo/repo')
    await page.evaluate(() => navigator.clipboard.writeText('unchanged'))
    await click(page, 'copy-issue-link')
    await expect(toast(page)).toHaveText('Not a GitHub issue, pull request, or discussion')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('unchanged')
  })
})

test.describe('increment-url', () => {
  test('goes to the next number', async ({ page }) => {
    await serve(page)
    await page.goto('https://example.com/photos/img009')
    await click(page, 'increment-url')
    await expect(page).toHaveURL('https://example.com/photos/img010')
  })

  test('stays put without a trailing number', async ({ page }) => {
    const pageErrors = errors(page)
    await serve(page)
    await page.goto('https://example.com/about')
    await click(page, 'increment-url')
    await page.waitForTimeout(200)
    await expect(page).toHaveURL('https://example.com/about')
    expect(pageErrors).toEqual([])
  })
})

test.describe('view-without-cache', () => {
  test('reloads with a dontCache timestamp, keeping params and hash', async ({ page }) => {
    await serve(page)
    await page.goto('https://example.com/search?q=a%20b#results')
    const before = Date.now()
    await click(page, 'view-without-cache')
    await expect(page).toHaveURL(/^https:\/\/example\.com\/search\?q=a%20b&dontCache=\d+#results$/)
    const stamp = Number(new URL(page.url()).searchParams.get('dontCache'))
    expect(stamp).toBeGreaterThanOrEqual(before)
  })
})

test.describe('pages-toggle', () => {
  const cases: [string, string][] = [
    ['https://github.com/octo/widgets/tree/main/docs', 'https://octo.github.io/widgets/'],
    ['https://github.com/octo/octo.github.io', 'https://octo.github.io/'],
    ['https://github.com/benbalter/benbalter.github.com', 'https://benbalter.github.io/'],
    ['https://octo.github.io/widgets/docs/?x=1#y', 'https://github.com/octo/widgets'],
    ['https://octo.github.io/', 'https://github.com/octo/octo.github.io'],
  ]
  for (const [from, to] of cases) {
    test(`${from} -> ${to}`, async ({ page }) => {
      await serve(page)
      await page.goto(from)
      await click(page, 'pages-toggle')
      await expect(page).toHaveURL(to)
    })
  }

  test('does nothing on other hosts', async ({ page }) => {
    const pageErrors = errors(page)
    await serve(page)
    await page.goto('https://ben.balter.com/about/')
    await click(page, 'pages-toggle')
    await page.waitForTimeout(200)
    await expect(page).toHaveURL('https://ben.balter.com/about/')
    expect(pageErrors).toEqual([])
  })
})
