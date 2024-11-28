export function getLivePreviewUrl(
  pathname: string,
  dataPath: string,
  locale: string,
) {
  const url = new URL(pathname, process.env.NEXT_PUBLIC_LIVE_PREVIEW_URL!);
  url.searchParams.set("lng", locale);
  url.searchParams.set("preview", dataPath);
  return url.toString();
}
