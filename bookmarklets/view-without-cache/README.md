# View without cache

Reloads the current page with a unique `dontCache` query parameter so caches see a URL they haven't stored and the server sends a fresh copy.

**Install:** drag the button at [ben.balter.com/bookmarklets/#view-without-cache](https://ben.balter.com/bookmarklets/#view-without-cache) to your bookmarks bar.

## Why

Popular websites use content distribution networks (CDNs) and other caching strategies to reduce the load on their servers during high-traffic periods. While normally that's fine, sometimes you'd like to quickly bypass that cache, for example, when diagnosing a caching issue, or testing a new feature.

## What it does

The bookmarklet sets `dontCache` to the current Unix timestamp in milliseconds and navigates there. Other query parameters and the `#hash` are kept exactly as they were, and clicking again updates the existing `dontCache` value instead of adding another:

| Current URL | Goes to |
| --- | --- |
| `https://example.com/page` | `https://example.com/page?dontCache=1727740800000` |
| `https://example.com/search?q=cats` | `https://example.com/search?q=cats&dontCache=1727740800000` |
| `https://example.com/page?dontCache=1427733996267&a=1` | `https://example.com/page?dontCache=1727740800000&a=1` |
| `https://example.com/page?xdontCache=1` | `https://example.com/page?xdontCache=1&dontCache=1727740800000` |
| `https://example.com/docs#install` | `https://example.com/docs?dontCache=1727740800000#install` |

It only helps with caches keyed on the full URL, which covers most CDNs and proxies. A cache that ignores the query string will still serve the cached page.

Source: [`src/bookmark.ts`](src/bookmark.ts). Tests: [`test/`](test/).

## History

Originally, [a Gist](https://gist.github.com/benbalter/1695742), migrated March 2015.
