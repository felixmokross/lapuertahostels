import { matchPath, type Location } from "@remix-run/react";
import i18n from "~/i18n";

export function getLocaleAndPageUrl(relativeUrl: string) {
  const pathname = toUrl(relativeUrl).pathname;
  const match = matchPath("/:localeCandidate/*", pathname);

  const localeCandidate = match?.params.localeCandidate;
  if (!localeCandidate || !i18n.supportedLngs.includes(localeCandidate)) {
    return { locale: undefined, pageUrl: relativeUrl };
  }

  return {
    locale: localeCandidate,
    pageUrl: relativeUrl.replace(`/${localeCandidate}`, ""),
  };
}

export function buildLocalizedRelativeUrl(
  locale: string | null,
  pageUrl: string,
) {
  const url = toUrl(pageUrl);
  url.pathname = `${locale ? `/${locale}` : ""}${url.pathname === "/" ? "" : url.pathname}`;
  return toRelativeUrl(url);
}

export function getRequestUrl(request: Request) {
  const url = new URL(request.url);
  if (request.headers.get("X-Forwarded-Proto") === "https") {
    url.protocol = "https";
  }

  return url;
}

export function toRelativeUrl(urlOrLocation: URL | Location) {
  if (urlOrLocation instanceof URL) {
    return urlOrLocation.toString().replace(urlOrLocation.origin, "");
  }

  return urlOrLocation.pathname + urlOrLocation.search + urlOrLocation.hash;
}

export function toUrl(relativeUrl: string, baseUrl?: string) {
  return new URL(relativeUrl, baseUrl || "http://dummy");
}
