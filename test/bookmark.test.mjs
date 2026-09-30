// Runs the built bookmarklet (dist/bookmark.js) against a fake
// document.location, so the tests cover the exact code that ships.
import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"

const code = readFileSync(new URL("../dist/bookmark.js", import.meta.url), "utf8")

const run = (href) => {
  let navigatedTo = null
  const location = {
    get href() { return href },
    set href(value) { navigatedTo = value },
  }
  runInNewContext(code, { document: { location } })
  return navigatedTo
}

test("increments the trailing number", () => {
  assert.equal(run("https://example.com/posts/41"), "https://example.com/posts/42")
})

test("only changes the trailing number when it also appears earlier", () => {
  assert.equal(run("https://example.com/2024/page/2024"), "https://example.com/2024/page/2025")
})

test("preserves leading zeros", () => {
  assert.equal(run("https://example.com/img007"), "https://example.com/img008")
  assert.equal(run("https://example.com/009"), "https://example.com/010")
})

test("carries into a new digit", () => {
  assert.equal(run("https://example.com/9"), "https://example.com/10")
  assert.equal(run("https://example.com/99"), "https://example.com/100")
  assert.equal(run("https://example.com/099"), "https://example.com/100")
})

test("increments a number at the end of a query string", () => {
  assert.equal(run("https://example.com/search?q=cats&page=2"), "https://example.com/search?q=cats&page=3")
})

test("keeps precision for long IDs", () => {
  assert.equal(
    run("https://example.com/status/1234567890123456789"),
    "https://example.com/status/1234567890123456790",
  )
})

test("does nothing when the URL doesn't end in a number", () => {
  assert.equal(run("https://example.com/about"), null)
  assert.equal(run("https://example.com/posts/1/"), null)
})
