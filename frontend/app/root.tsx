import {
  LoaderFunctionArgs,
  MetaFunction,
  type LinksFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./global.css?url";
import { useTranslation } from "react-i18next";
import { Footer } from "./layout/footer";
import { BrandId } from "./brands";
import { getBrands, getCommon, getMaintenance, tryGetPage } from "./cms-data";
import { OptInLivePreview } from "./common/live-preview";
import { ThemeProvider } from "./themes";
import { useState } from "react";
import { Header } from "./layout/header";
import {
  getLocaleAndPageUrl,
  getRequestUrl,
  toRelativeUrl,
  toUrl,
} from "./common/routing";
import { Brand } from "./payload-types";
import { GlobalErrorBoundary } from "./global-error-boundary";
import { AnalyticsScript } from "./analytics-script";
import { PreviewBar } from "./layout/preview-bar";
import { LanguageDetector } from "remix-i18next/server";
import i18next from "./i18next.server";
import { isAuthenticated } from "./common/auth";
import { getVersion } from "./common/version.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Playfair%20Display:wght@400..500&display=swap",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
  {
    rel: "mask-icon",
    href: "/safari-pinned-tab.svg",
    color: "#603f1f",
  },
];

export const meta: MetaFunction<typeof loader> = () => {
  return [
    {
      name: "msapplication-TileColor",
      content: "#00aba9",
    },
    {
      name: "theme-color",
      content: "#e2d0b6",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }
  if (!process.env.IMAGEKIT_BASE_URL) {
    throw new Error("IMAGEKIT_BASE_URL is not set");
  }

  const url = getRequestUrl(request);
  const { pageUrl, locale } = getLocaleAndPageUrl(toRelativeUrl(url));
  if (!locale) throw new Error("Locale has not been determined");

  const [page, allBrands, common, maintenance] = await Promise.all([
    tryGetPage(toUrl(pageUrl).pathname, locale),
    getBrands(locale),
    getCommon(locale),
    getMaintenance(locale),
  ]);

  // If maintenance screen is not enabled, public access is authorized
  // Otherwise, check if the user is authenticated
  const isAuthorized =
    !maintenance.maintenanceScreen?.show || (await isAuthenticated(request));

  // retrieving the brand from `allBrands`, `page.brand` does not have the right depth
  const brandId = page
    ? ((page.brand as Brand).id as BrandId)
    : ("puerta" as BrandId);
  const brand = allBrands.find((b) => b.id === brandId);
  if (!brand) throw new Error("Brand not found");

  return {
    isAuthorized,
    locale,
    adminLocale: maintenance.maintenanceScreen?.show
      ? await loadAdminLocale()
      : undefined,
    brand,
    allBrands,
    maintenance,
    common,
    environment: {
      version: getVersion(),
      payloadCmsBaseUrl: process.env.PAYLOAD_CMS_BASE_URL,
      imagekitBaseUrl: process.env.IMAGEKIT_BASE_URL,
      lobbyPmsToken: process.env.LOBBY_PMS_TOKEN,
      preview: getRequestUrl(request).searchParams.get("preview") || undefined,
      useImageCacheBuster: false, // Cache busting is only used in Storybook for Chromatic
    },
    analyticsDomain: process.env.ANALYTICS_DOMAIN,
  };

  async function loadAdminLocale() {
    // The admin should be able to test the page in any locale, but see the admin controls in their preferred locale.
    // Therefore only using header for the admin locale (unfortunately we cannot get the user's locale from Payload CMS)
    return await new LanguageDetector({
      ...i18next["options"].detection,
      order: ["header"],
    }).detect(request);
  }
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function App() {
  const {
    brand,
    common,
    maintenance,
    analyticsDomain,
    allBrands,
    isAuthorized,
    adminLocale,
    environment,
  } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <html
      lang={i18n.language}
      dir={i18n.dir()}
      style={{ scrollPaddingTop: getScrollTopPadding(headerHeight) }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <AnalyticsScript analyticsDomain={analyticsDomain} />
        <link
          rel="stylesheet"
          href="https://app.lobbypms.com/public/css/widget/lobby-date-rage-selector.min.css?v=Z6Ee3dou8BsZPpEpNVS9vb0sK"
        />
        <script src="https://app.lobbypms.com/public/js/widget/lobby-date-rage-selector.min.js?v=0bJZUrpSzrf5nhKxph7nDuJXi"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `var ldrs = new LobbyDateRangeSelector({
      apiBaseUrl: 'https://api.lobbypms.com/api/ldrs/',
      token: '${environment.lobbyPmsToken}'
      lang: 'en',
    });`,
          }}
        />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        <ThemeProvider brandId={brand.id as BrandId}>
          {maintenance.maintenanceScreen?.show && isAuthorized && (
            <PreviewBar adminLocale={adminLocale!} />
          )}
          <OptInLivePreview path={`brands/${brand.id}`} data={brand}>
            {(brand) => (
              <OptInLivePreview path="globals/common" data={common}>
                {(common) => (
                  <>
                    {isAuthorized && (
                      <Header
                        brand={brand}
                        allBrands={allBrands}
                        onHeightChanged={setHeaderHeight}
                      />
                    )}
                    <main>
                      <Outlet />
                    </main>
                    {isAuthorized && (
                      <Footer
                        brand={brand}
                        allBrands={allBrands}
                        content={common.footer}
                      />
                    )}
                  </>
                )}
              </OptInLivePreview>
            )}
          </OptInLivePreview>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const ADDITIONAL_SCROLL_PADDING = 32;

function getScrollTopPadding(headerHeight: number) {
  return headerHeight + ADDITIONAL_SCROLL_PADDING;
}

export const ErrorBoundary = GlobalErrorBoundary;
