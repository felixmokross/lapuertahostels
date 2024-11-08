export function pageIdToUrl(id: string) {
  return id.replaceAll(":", "/");
}

export function urlToPageId(url: string) {
  return url.replaceAll("/", ":");
}
