import { redirect } from "react-router";
import i18next from "~/i18next.server";
import {
  getLocaleAndPageUrl,
  toRelativeUrl,
  getRequestUrl,
  buildLocalizedRelativeUrl,
  getCanonicalRequestUrl,
} from "./routing";
import { getMaintenance } from "~/cms-data.server";
import { isAuthenticated } from "./auth";

export async function handleIncomingRequest(request: Request) {
  const url = getRequestUrl(request);

  redirectIfBrandSubdomain(url, "aqua");
  redirectIfBrandSubdomain(url, "azul");

  redirectIfNonCanonicalHostname(request);
  redirectIfPathnameEndsWithSlash(url);

  const { locale, pageUrl } = getLocaleAndPageUrl(toRelativeUrl(url));

  if (!locale) {
    const locale = await i18next.getLocale(request);
    redirectToLocalizedRoute(url, locale);
  }

  const maintenance = await getMaintenance(locale);
  if (
    maintenance.maintenanceScreen?.show &&
    !(await isAuthenticated(request)) &&
    pageUrl !== "/login"
  ) {
    throw new Response(null, {
      status: 503,
      statusText: "Service Unavailable",
    });
  }

  return { locale, pageUrl };
}

function redirectIfBrandSubdomain(url: URL, brandName: string) {
  const domainPrefix = `${brandName}.`;
  if (url.hostname.startsWith(domainPrefix)) {
    url.hostname = url.hostname.replace(domainPrefix, "");
    url.pathname = `/${brandName}${url.pathname === "/" ? "" : url.pathname}`;
    throw redirect(url.href);
  }
}

function redirectIfNonCanonicalHostname(request: Request) {
  const canonicalRequestUrl = getCanonicalRequestUrl(request);
  if (getRequestUrl(request).hostname !== canonicalRequestUrl.hostname) {
    throw redirect(canonicalRequestUrl.href, { status: 301 });
  }
}

function redirectIfPathnameEndsWithSlash(url: URL) {
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    throw redirect(toRelativeUrl(url), { status: 301 });
  }
}

function redirectToLocalizedRoute(url: URL, locale: string): never {
  throw redirect(buildLocalizedRelativeUrl(locale, toRelativeUrl(url)));
}
