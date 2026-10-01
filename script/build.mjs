// Builds every bookmarklets/<id>/src/bookmark.ts into dist/<id>.js: Babel
// strips the types (using .babelrc), then UglifyJS minifies. Each source is
// already a self-contained IIFE, so the output is too, with no exports.
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { transformFileSync } from '@babel/core'
import UglifyJS from 'uglify-js'

const root = new URL('../', import.meta.url)
const ids = readdirSync(new URL('bookmarklets/', root)).filter((id) =>
  existsSync(new URL(`bookmarklets/${id}/src/bookmark.ts`, root)),
)

mkdirSync(new URL('dist/', root), { recursive: true })

for (const id of ids) {
  const source = new URL(`bookmarklets/${id}/src/bookmark.ts`, root)
  const { code } = transformFileSync(source.pathname, { cwd: root.pathname })
  const minified = UglifyJS.minify(code, { compress: true, mangle: { toplevel: true } })
  if (minified.error) throw minified.error
  writeFileSync(new URL(`dist/${id}.js`, root), `${minified.code}\n`)
  console.log(`dist/${id}.js (${minified.code.length} bytes)`)
}
