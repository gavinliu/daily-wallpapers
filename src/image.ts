function parseImageUrl(host: String, url: String) {
  return host + url.substring(0, url.indexOf("&"));
}

function parseThumbnailUrl(host: string, url: string) {
  return parseImageUrl(host, url) + "&pid=hp&w=384&h=216&rs=1&c=4";
}

export { parseImageUrl, parseThumbnailUrl };
