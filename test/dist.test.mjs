// Checks that every bookmarklet has a built, self-contained IIFE in dist/.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { built, isIife } from './helpers.mjs'

const ids = readdirSync(new URL('../bookmarklets/', import.meta.url))

test('every bookmarklet has a built dist file', () => {
  assert.deepEqual(readdirSync(new URL('../dist/', import.meta.url)).sort(), ids.map((id) => `${id}.js`).sort())
})

for (const id of ids) {
  test(`${id}: dist is a single IIFE with no exports`, () => {
    assert.ok(built(id).length > 0)
    assert.ok(isIife(id), built(id))
  })
}
