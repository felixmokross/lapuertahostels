import { getMaintenance, loadData } from "~/cms-data.server";
import i18n from "~/i18n";
import {
  buildLocalizedRelativeUrl,
  getCanonicalRequestUrl,
} from "~/common/routing";
import { LoaderFunctionArgs } from "react-router";
import { isAuthenticated } from "~/common/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  const maintenance = await getMaintenance(request, i18n.fallbackLng);
  if (
    maintenance.maintenanceScreen?.show &&
    !(await isAuthenticated(request))
  ) {
    throw new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  const pages = (await loadData(`pages`, "all", 0, {})).docs as {
    pathname: Record<string, string>;
    updatedAt: string;
  }[];

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${i18n.supportedLngs
      .flatMap((l) =>
        pages.map(
          (p) => `  <url>
    <loc>${getCanonicalRequestUrl(request).origin}${buildLocalizedRelativeUrl(l, p.pathname[l])}</loc>
    <lastmod>${p.updatedAt.split("T")[0]}</lastmod>
  </url>`,
        ),
      )
      .join("\n")}
</urlset>`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      encoding: "UTF-8",
    },
  });
}
