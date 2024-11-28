import { redirect } from "@remix-run/node";
import i18next from "~/i18next.server";
import {
  getLocaleAndPageUrl,
  toRelativeUrl,
  getRequestUrl,
  buildLocalizedRelativeUrl,
} from "./routing";
import { getMaintenance } from "~/cms-data";
import { isAuthenticated } from "./auth";

export async function handleIncomingRequest(request: Request) {
  const url = getRequestUrl(request);

  redirectIfBrandSubdomain(url, "aqua");
  redirectIfBrandSubdomain(url, "azul");

  redirectIfNonCanonicalHostname(url);

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
    throw redirect(url.toString());
  }
}

function redirectIfNonCanonicalHostname(url: URL) {
  const canonicalHostname = process.env.CANONICAL_HOSTNAME;
  if (!canonicalHostname) throw new Error("Missing CANONICAL_HOSTNAME");
  if (url.hostname !== canonicalHostname) {
    url.hostname = canonicalHostname;
    throw redirect(url.toString(), { status: 301 });
  }
}

function redirectToLocalizedRoute(url: URL, locale: string): never {
  throw redirect(buildLocalizedRelativeUrl(locale, toRelativeUrl(url)));
}
