---
---

# Increment URL Bookmarklet

Drag this link to your bookmark bar to save the bookmarklet:

<a href='javascript:"use strict";var t,e=document.location.href,c=e.match(/\d+$/);c&&(t=(parseInt(c[0])+1).toString(),document.location.href=e.replace(c[0],t));'>Increment URL</a>

See [github.com/benbalter/increment-url-bookmarklet](https://github.com/benbalter/increment-url-bookmarklet) for more information.
