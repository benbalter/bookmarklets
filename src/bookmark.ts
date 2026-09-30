(() => {
  // Increment the number at the very end of a URL, keeping its width
  // (img007 -> img008, 099 -> 100). Works on the digit string directly so
  // long IDs don't lose precision. Returns null if the URL doesn't end in
  // a number.
  const incrementUrl = (url: string): string | null => {
    const match = url.match(/\d+$/)
    if (!match || match.index === undefined) return null
    const digits = match[0].split("")
    let i = digits.length - 1
    while (i >= 0 && digits[i] === "9") {
      digits[i] = "0"
      i -= 1
    }
    if (i < 0) digits.unshift("1")
    else digits[i] = String(Number(digits[i]) + 1)
    return url.slice(0, match.index) + digits.join("")
  }

  const next = incrementUrl(document.location.href)
  if (next) document.location.href = next
})()
