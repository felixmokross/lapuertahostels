import { matchPath } from "@remix-run/react";
import i18n from "~/i18n";

export function getLocaleAndPagePath(fullPath: string) {
  const match = matchPath("/:localeCandidate/*", fullPath);

  const localeCandidate = match?.params.localeCandidate;
  if (!localeCandidate || !i18n.supportedLngs.includes(localeCandidate)) {
    return { locale: undefined, pagePath: fullPath };
  }

  return {
    locale: localeCandidate,
    pagePath: `/${match.params["*"]}`,
  };
}

export function buildPath(locale: string | null, pagePath: string) {
  return `${locale ? `/${locale}` : ""}${pagePath === "/" ? "" : pagePath}`;
}
