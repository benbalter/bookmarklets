# Increment URL

Goes to the next page by incrementing the number at the end of the current URL.

**Install:** drag the button at [ben.balter.com/bookmarklets/#increment-url](https://ben.balter.com/bookmarklets/#increment-url) to your bookmarks bar.

The bookmarklet takes the number at the very end of the URL, adds one, and navigates there. Only the trailing number changes, and its width is preserved:

| Current URL | Goes to |
| --- | --- |
| `https://example.com/posts/41` | `https://example.com/posts/42` |
| `https://example.com/2024/page/2024` | `https://example.com/2024/page/2025` |
| `https://example.com/img007` | `https://example.com/img008` |
| `https://example.com/099` | `https://example.com/100` |
| `https://example.com/search?page=2` | `https://example.com/search?page=3` |

If the URL doesn't end in a number (including a trailing `/` or `#hash`), nothing happens.

Source: [`src/bookmark.ts`](src/bookmark.ts). Tests: [`test/`](test/).
