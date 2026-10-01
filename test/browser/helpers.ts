import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Page } from '@playwright/test'

const root = join(__dirname, '..', '..')

/** The built code for a bookmarklet. */
export const built = (id: string) => readFileSync(join(root, 'dist', `${id}.js`), 'utf8').trim()

/** An HTML fixture from bookmarklets/<id>/test/fixtures/<name>.html. */
export const fixture = (id: string, name: string) =>
  readFileSync(join(root, 'bookmarklets', id, 'test', 'fixtures', `${name}.html`), 'utf8')

const blank = '<!DOCTYPE html><html><head><title>Fixture</title></head><body><p>Fixture page</p></body></html>'

/**
 * Serves every request from fixtures: `pages` maps a URL (without query or
 * hash) to HTML, and anything else gets a blank page. That lets the tests use
 * real hostnames like github.com without the network.
 */
export async function serve(page: Page, pages: Record<string, string> = {}) {
  await page.context().route('**/*', (route) => {
    const url = new URL(route.request().url())
    const body = pages[`${url.origin}${url.pathname}`] ?? blank
    return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body })
  })
}

/**
 * Runs a bookmarklet the way a browser does: as a javascript: link the user
 * clicks, so it gets user activation (which the clipboard needs).
 */
export async function click(page: Page, id: string) {
  await page.evaluate((href) => {
    const a = document.createElement('a')
    a.id = 'bookmarklet'
    a.href = href
    a.textContent = 'Run bookmarklet'
    a.style.cssText = 'position:fixed;bottom:0;left:0'
    document.body.append(a)
  }, `javascript:${encodeURIComponent(built(id))}`)
  await page.click('#bookmarklet')
}

/** Collects uncaught page errors. */
export function errors(page: Page) {
  const list: Error[] = []
  page.on('pageerror', (error) => list.push(error))
  return list
}
