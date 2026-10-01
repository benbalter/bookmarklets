import { test } from 'node:test'
import assert from 'node:assert/strict'
import { navigate } from '../../../test/helpers.mjs'

const run = (href) => navigate('pages-toggle', href)

test('project repo goes to its project site', () => {
  assert.equal(run('https://github.com/octo/widgets'), 'https://octo.github.io/widgets/')
})

test('deep repo paths, query strings, and hashes go to the project site root', () => {
  assert.equal(run('https://github.com/octo/widgets/tree/main/docs?x=1#readme'), 'https://octo.github.io/widgets/')
})

test('lowercases the owner for the github.io host', () => {
  assert.equal(run('https://github.com/Octo/Widgets'), 'https://octo.github.io/Widgets/')
})

test('user site repos go to the user site', () => {
  assert.equal(run('https://github.com/octo/octo.github.io'), 'https://octo.github.io/')
  assert.equal(run('https://github.com/Octo/octo.GitHub.io/blob/main/index.md'), 'https://octo.github.io/')
})

test('legacy <owner>.github.com repos are user sites too', () => {
  assert.equal(run('https://github.com/benbalter/benbalter.github.com'), 'https://benbalter.github.io/')
})

test('github.com pages without a repo do nothing', () => {
  assert.equal(run('https://github.com/'), null)
  assert.equal(run('https://github.com/octo'), null)
  assert.equal(run('https://github.com/octo/'), null)
})

test('project site goes to its repo', () => {
  assert.equal(run('https://octo.github.io/widgets/'), 'https://github.com/octo/widgets')
  assert.equal(run('https://octo.github.io/widgets/docs/page.html?x=1#y'), 'https://github.com/octo/widgets')
})

test('user site root goes to the <owner>.github.io repo', () => {
  assert.equal(run('https://octo.github.io/'), 'https://github.com/octo/octo.github.io')
  assert.equal(run('https://octo.github.io/?x=1#top'), 'https://github.com/octo/octo.github.io')
})

test('other hosts do nothing', () => {
  for (const href of [
    'https://ben.balter.com/',
    'https://example.com/octo/widgets',
    'https://gist.github.com/octo/123',
    'https://octo.github.com/widgets',
    'https://evil.com/x.github.io',
    'https://a.b.github.io/',
    'https://notgithub.io/',
  ]) {
    assert.equal(run(href), null, href)
  }
})
