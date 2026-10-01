// Runs the built bookmarklet (dist/view-without-cache.js) against a fake document.location.
import { test } from "node:test"
import assert from "node:assert/strict"
import { navigate } from "../../../test/helpers.mjs"

// Returns the URL the bookmarklet navigated to, with the timestamp swapped
// for "<now>" after checking it's the current time.
const run = (href) => {
  const before = Date.now()
  const navigatedTo = navigate("view-without-cache", href)
  const after = Date.now()
  assert.notEqual(navigatedTo, null, "bookmarklet should navigate")
  return navigatedTo.replace(/([?&]dontCache=)(\d+)/g, (_, prefix, stamp) => {
    assert.ok(Number(stamp) >= before && Number(stamp) <= after, `timestamp ${stamp} should be now`)
    return `${prefix}<now>`
  })
}

test("adds dontCache when there's no query string", () => {
  assert.equal(run("https://example.com/page"), "https://example.com/page?dontCache=<now>")
})

test("appends dontCache after existing params, keeping their encoding", () => {
  assert.equal(
    run("https://example.com/search?q=a%20b+c&flag"),
    "https://example.com/search?q=a%20b+c&flag&dontCache=<now>",
  )
})

test("replaces an existing dontCache value in place", () => {
  assert.equal(
    run("https://example.com/page?a=1&dontCache=123&b=2"),
    "https://example.com/page?a=1&dontCache=<now>&b=2",
  )
})

test("doesn't mistake a param that only contains the name", () => {
  assert.equal(
    run("https://example.com/page?xdontCache=1&dontCacheX=2"),
    "https://example.com/page?xdontCache=1&dontCacheX=2&dontCache=<now>",
  )
})

test("preserves the hash", () => {
  assert.equal(run("https://example.com/page#section"), "https://example.com/page?dontCache=<now>#section")
  assert.equal(
    run("https://example.com/page?a=1&dontCache=5#section"),
    "https://example.com/page?a=1&dontCache=<now>#section",
  )
})
