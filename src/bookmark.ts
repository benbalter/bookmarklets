const url = document.location.href
const matches = url.match(/\d+$/); 

if (matches) {
  const replacement = (parseInt(matches[0]) + 1).toString();
  document.location.href = url.replace(matches[0], replacement);
}