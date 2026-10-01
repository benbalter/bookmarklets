# Increment URL bookmarklet

Goes to the next page by incrementing the number at the end of the current URL.

## What it does

The bookmarklet takes the number at the very end of the URL, adds one, and navigates there. Only the trailing number changes, and its width is preserved:

| Current URL | Goes to |
| --- | --- |
| `https://example.com/posts/41` | `https://example.com/posts/42` |
| `https://example.com/2024/page/2024` | `https://example.com/2024/page/2025` |
| `https://example.com/img007` | `https://example.com/img008` |
| `https://example.com/099` | `https://example.com/100` |
| `https://example.com/search?page=2` | `https://example.com/search?page=3` |

If the URL doesn't end in a number (including a trailing `/` or `#hash`), nothing happens.

## Usage

1. Visit [ben.balter.com/bookmarklets](https://ben.balter.com/bookmarklets/#increment-url)
2. Drag the link to your bookmark bar
3. Click the bookmarklet on a page whose URL ends in a number to go to the next one

## Developing locally

I'd love your help making the script better. The source lives in `src` and the built files live in `dist`. To build locally:

1. Clone down the repo and `cd` into the directory
2. `npm install`
3. Make your changes
4. `npm test` to type check, lint, build, and run the tests
5. `script/build` to rebuild `dist/bookmark.js` and `index.md`, and commit both
