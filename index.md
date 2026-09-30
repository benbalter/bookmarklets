---
---

# Increment URL Bookmarklet

Drag this link to your bookmark bar to save the bookmarklet:

<a href='javascript:(()=>{var n=(n=>{var e=n.match(/\d+$/);if(!e||void 0===e.index)return null;var r=e[0].split("");let t=r.length-1;for(;0<=t&&"9"===r[t];)r[t]="0",--t;return t<0?r.unshift("1"):r[t]=String(Number(r[t])+1),n.slice(0,e.index)+r.join("")})(document.location.href);n&&(document.location.href=n)})();'>Increment URL</a>

See [github.com/benbalter/increment-url-bookmarklet](https://github.com/benbalter/increment-url-bookmarklet) for more information.
