(() => {
  // Toggle between a GitHub Pages site and the repository that publishes it,
  // by rewriting the URL. The query string and hash are ignored, and nothing
  // happens on any other host (including Pages sites on custom domains).
  const { hostname, pathname } = new URL(document.location.href)
  const segments = pathname.split("/").filter(Boolean)

  // Source -> site: github.com/<owner>/<repo>/...
  if (hostname === "github.com") {
    const [owner, repo] = segments
    if (!owner || !repo) return
    const host = `${owner.toLowerCase()}.github.io`
    // <owner>.github.io (or the legacy <owner>.github.com) is a user site
    const name = repo.toLowerCase()
    const userSite = name === host || name === `${owner.toLowerCase()}.github.com`
    document.location.href = `https://${host}/${userSite ? "" : `${repo}/`}`
    return
  }

  // Site -> source: <owner>.github.io/<repo>/... (or the user site's root)
  const match = hostname.match(/^([a-z0-9-]+)\.github\.io$/i)
  if (!match) return
  const owner = match[1]
  const repo = segments[0] || `${owner}.github.io`
  document.location.href = `https://github.com/${owner}/${repo}`
})()
