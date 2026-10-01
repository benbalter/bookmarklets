# Bookmarklets

Small browser bookmarklets I use every day. To install one, go to [ben.balter.com/bookmarklets](https://ben.balter.com/bookmarklets/) and drag its button to your bookmarks bar.

| Bookmarklet | What it does |
| --- | --- |
| [Copy issue link](bookmarklets/copy-issue-link/) ([install](https://ben.balter.com/bookmarklets/#copy-issue-link)) | Copies a Markdown `[title](URL)` link to the GitHub issue, pull request, or discussion you're viewing. |
| [Increment URL](bookmarklets/increment-url/) ([install](https://ben.balter.com/bookmarklets/#increment-url)) | Goes to the next page by adding one to the number at the end of the URL. |
| [View without cache](bookmarklets/view-without-cache/) ([install](https://ben.balter.com/bookmarklets/#view-without-cache)) | Reloads the page with a unique `dontCache` query parameter so caches miss. |
| [Pages toggle](bookmarklets/pages-toggle/) ([install](https://ben.balter.com/bookmarklets/#pages-toggle)) | Toggles between a GitHub Pages site and its source repository. |

## Limitations

- Browsers only allow clipboard writes right after a user action, so Copy issue link has to be clicked from the bookmarks bar.
- Pages toggle reads the URL, so it can't recognize Pages sites on custom domains.
- Some sites' Content Security Policy blocks bookmarklets in Firefox.
- They're tested in Chromium and Firefox.

## How it's built

Each bookmarklet lives in `bookmarklets/<id>/`, with its TypeScript source in `src/bookmark.ts`, tests in `test/`, and a short README. The build turns each source into a minified, self-contained IIFE at `dist/<id>.js`, which is committed. [ben.balter.com](https://github.com/benbalter/benbalter.github.com) vendors those files to build its install links, and Renovate opens a pull request there when this repo's `main` changes.

## Developing

1. `npm install`
2. Edit `bookmarklets/<id>/src/bookmark.ts`.
3. `npm test` builds `dist/` and runs the unit tests, which run the built code in `node:vm` or [jsdom](https://github.com/jsdom/jsdom). Shared helpers are in [`test/helpers.mjs`](test/helpers.mjs).
4. `npm run lint` and `npm run typecheck`.
5. `npx playwright install chromium firefox` once, then `npm run test:browser` to click each built bookmarklet on fixture pages in Chromium (checking the clipboard and navigation) and smoke-test them in Firefox. Every request is served from local fixtures, so they don't touch the network.
6. Commit `dist/` along with the source. CI rebuilds `dist/` and fails if it doesn't match.

To add a bookmarklet, create `bookmarklets/<id>/src/bookmark.ts` (wrap it in `(() => { ... })()`), add tests, add it to the table above, and add it to [`src/data/bookmarklets.ts`](https://github.com/benbalter/benbalter.github.com/blob/main/src/data/bookmarklets.ts) on the site.

## License

[MIT](LICENSE)
