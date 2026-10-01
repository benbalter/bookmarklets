// Shared helpers for the unit tests. Each runs the built bookmarklet
// (dist/<id>.js), so the tests cover the exact code that ships.
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { JSDOM } from 'jsdom'

const root = new URL('../', import.meta.url)

/** The built code for a bookmarklet. */
export const built = (id) => readFileSync(new URL(`dist/${id}.js`, root), 'utf8')

/** Reads an HTML fixture from bookmarklets/<id>/test/fixtures/<name>.html. */
export const fixture = (id, name) =>
  readFileSync(new URL(`bookmarklets/${id}/test/fixtures/${name}.html`, root), 'utf8')

/**
 * Runs a bookmarklet in a bare node:vm context with a fake
 * document.location at `href`. Returns the URL it navigated to, or null.
 */
export function navigate(id, href, globals = {}) {
  let navigatedTo = null
  const location = {
    get href() { return href },
    set href(value) { navigatedTo = value },
  }
  runInNewContext(built(id), { URL, ...globals, document: { location } })
  return navigatedTo
}

/**
 * Loads `html` in jsdom at `url`, mocks navigator.clipboard (`ok`, `reject`,
 * or `missing`), and runs a bookmarklet in the page. Resolves after pending
 * promises settle with what was copied and the window.
 */
export async function runInPage(id, { html = '<!DOCTYPE html><title>x</title>', url, title, clipboard = 'ok' }) {
  const dom = new JSDOM(html, { url, runScripts: 'outside-only' })
  const { window } = dom
  if (title !== undefined) window.document.title = title
  const copied = []
  const clip = clipboard === 'missing' ? undefined : {
    writeText: (text) => {
      copied.push(text)
      return clipboard === 'reject' ? Promise.reject(new Error('denied')) : Promise.resolve()
    },
  }
  Object.defineProperty(window.navigator, 'clipboard', { value: clip, configurable: true })
  window.eval(built(id))
  await new Promise((resolve) => setTimeout(resolve, 10))
  return { copied, window }
}

/** Asserts the built code is a single IIFE expression with no exports. */
export function isIife(id) {
  const code = built(id).trim()
  return /^\(\(\)=>\{[\s\S]*\}\)\(\);$/.test(code) && !/\bexport\b/.test(code)
}
