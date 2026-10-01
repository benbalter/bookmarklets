# Copy issue link

Copies a Markdown link to the GitHub issue, pull request, or discussion you're viewing, in the form `[title](URL)`.

**Install:** drag the button at [ben.balter.com/bookmarklets/#copy-issue-link](https://ben.balter.com/bookmarklets/#copy-issue-link) to your bookmarks bar.

A small toast in the top-right corner confirms what was copied (`Copied: [title](URL)`) and disappears after two seconds. If the bookmarklet can't copy, the toast explains why instead: the page isn't an issue, pull request, or discussion, the title couldn't be found, or the browser blocked clipboard access.

The query string is dropped from the URL. If the URL points at a comment or other anchor (for example `#issuecomment-123`), the anchor is kept and its kind is appended to the title, as in `[title (issuecomment)](URL)`.

## How the title is found

The bookmarklet reads the title from the page header first. If GitHub's markup changes and the header selectors stop matching, it falls back to the page's `<title>`, which GitHub formats as `<title> · Issue #1 · owner/repo · GitHub`, `<title> by <user> · Pull Request #1 · owner/repo · GitHub`, or `<title> · owner/repo · Discussion #1 · GitHub`. For pull requests, the ` by <user>` part is stripped. If GitHub changes both its header markup and its page title format, it will stop finding titles.

## Source

- [`src/bookmark.ts`](src/bookmark.ts)
- [`test/`](test/): unit tests that load the [`fixtures/`](test/fixtures/) in [jsdom](https://github.com/jsdom/jsdom) with a mocked clipboard. The browser tests in [`/test/browser/`](../../test/browser/) reuse the same fixtures.
