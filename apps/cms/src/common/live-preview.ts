export function getLivePreviewUrl(
  pathname: string,
  dataPath: string,
  locale: string,
) {
  const url = new URL(pathname, process.env.LIVE_PREVIEW_URL!);
  url.searchParams.set("lng", locale);
  url.searchParams.set("preview", dataPath);
  url.searchParams.set("skipcache", "true");
  return url.toString();
}
