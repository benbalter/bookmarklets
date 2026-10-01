# Pages toggle

Toggles between a GitHub Pages site and the repository that publishes it.

**Install:** drag the button at [ben.balter.com/bookmarklets/#pages-toggle](https://ben.balter.com/bookmarklets/#pages-toggle) to your bookmarks bar.

| Current URL | Goes to |
| --- | --- |
| `https://github.com/octo/widgets` (or any page in the repo) | `https://octo.github.io/widgets/` |
| `https://github.com/octo/octo.github.io` | `https://octo.github.io/` |
| `https://github.com/octo/octo.github.com` (legacy user-site name) | `https://octo.github.io/` |
| `https://octo.github.io/widgets/docs/` | `https://github.com/octo/widgets` |
| `https://octo.github.io/` | `https://github.com/octo/octo.github.io` |

The query string and `#hash` are ignored. On any other page, including `github.com/<owner>` with no repo, it does nothing.

## Limitations

It works by rewriting the URL, so it guesses rather than asking GitHub:

- **Custom domains:** a Pages site on a custom domain (like `ben.balter.com`) isn't recognized, so nothing happens there. Going from such a repo to its site lands on `<owner>.github.io/<repo>/`, which GitHub usually redirects to the custom domain.
- **User sites with paths:** on a user site, `https://octo.github.io/about/` is treated as the project site for a repo named `about`.
- **Sites that don't exist:** it doesn't check that the repo publishes a Pages site.

Source: [`src/bookmark.ts`](src/bookmark.ts). Tests: [`test/`](test/).

## History

Ported from CoffeeScript to TypeScript in 2026. The port switched to `https://` URLs, stopped handling the retired `*.github.com` Pages hosts, and stopped throwing on `github.com/<owner>` pages.
