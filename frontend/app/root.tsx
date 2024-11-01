import {
  LoaderFunctionArgs,
  MetaFunction,
  type LinksFunction,
} from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css?url";
import { Trans, useTranslation } from "react-i18next";
import { Footer } from "./layout/footer";
import { BrandId } from "./brands";
import { getBrands, getCommon, getMaintenance, tryGetPage } from "./cms-data";
import { OptInLivePreview } from "./common/live-preview";
import { ThemeProvider } from "./themes";
import { MaintenanceScreen } from "./layout/maintenance-screen";
import { useState } from "react";
import { Header } from "./layout/header";
import {
  getLocaleAndPageUrl,
  getRequestUrl,
  toRelativeUrl,
  toUrl,
  urlToId,
} from "./common/routing";
import { Brand } from "./payload-types";
import { HeroHeadingBlock } from "./blocks/hero-heading-block";
import { StoryBlock } from "./blocks/story-block";
import { getTitle } from "./common/meta";

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

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  {
    name: "msapplication-TileColor",
    content: "#00aba9",
  },
  {
    name: "theme-color",
    content: "#e2d0b6",
  },
  { name: "description", content: data?.common.meta?.description },
];

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

  const pageId = urlToId(toUrl(pageUrl).pathname);

  const [page, allBrands, common, maintenance] = await Promise.all([
    tryGetPage(pageId, locale),
    getBrands(locale),
    getCommon(locale),
    getMaintenance(locale),
  ]);

  // retrieving the brand from `allBrands`, `page.brand` does not have the right depth
  const brandId = page
    ? ((page.brand as Brand).id as BrandId)
    : ("puerta" as BrandId);
  const brand = allBrands.find((b) => b.id === brandId);
  if (!brand) throw new Error("Brand not found");

  return {
    locale,
    brand,
    allBrands,
    maintenance,
    common,
    environment: {
      payloadCmsBaseUrl: process.env.PAYLOAD_CMS_BASE_URL,
      imagekitBaseUrl: process.env.IMAGEKIT_BASE_URL,
      preview: getRequestUrl(request).searchParams.get("preview") || undefined,
    },
    analyticsDomain: process.env.ANALYTICS_DOMAIN,
  };
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function App() {
  const { brand, common, maintenance, analyticsDomain, allBrands } =
    useLoaderData<typeof loader>();
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
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        <OptInLivePreview path="globals/maintenance" data={maintenance}>
          {(maintenance) =>
            maintenance.maintenanceScreen?.show ? (
              <MaintenanceScreen {...maintenance.maintenanceScreen} />
            ) : (
              <ThemeProvider brandId={brand.id as BrandId}>
                <OptInLivePreview path={`brands/${brand.id}`} data={brand}>
                  {(brand) => (
                    <OptInLivePreview path="globals/common" data={common}>
                      {(common) => (
                        <>
                          <Header
                            brand={brand}
                            banner={common.banner}
                            allBrands={allBrands}
                            onHeightChanged={setHeaderHeight}
                          />
                          <main>
                            <Outlet />
                          </main>
                          <Footer
                            allBrands={allBrands}
                            content={common.footer}
                          />
                        </>
                      )}
                    </OptInLivePreview>
                  )}
                </OptInLivePreview>
              </ThemeProvider>
            )
          }
        </OptInLivePreview>
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

function AnalyticsScript({
  analyticsDomain,
}: {
  analyticsDomain: string | undefined;
}) {
  return (
    !!analyticsDomain && (
      <script
        defer
        data-domain={analyticsDomain}
        src="https://plausible.io/js/script.js"
      ></script>
    )
  );
}

export function ErrorBoundary() {
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  const error = useRouteError();
  const { i18n } = useTranslation();

  console.error(error);

  // Without rootLoaderData, we just render a fatal error screen
  if (!rootLoaderData) return <FatalErrorScreen />;

  const isPageNotFound = isRouteErrorResponse(error) && error.status === 404;

  const errorPageTitle = getTitle(
    isPageNotFound
      ? rootLoaderData.common.pageNotFoundScreen.heading
      : rootLoaderData.common.errorScreen.heading,
    rootLoaderData.brand,
  );

  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <title>{errorPageTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <AnalyticsScript analyticsDomain={rootLoaderData.analyticsDomain} />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        <ThemeProvider brandId="puerta">
          <Header
            brand={rootLoaderData.brand}
            banner={rootLoaderData.common.banner}
            allBrands={rootLoaderData.allBrands}
            onHeightChanged={() => {}}
          />
          <main>
            <HeroHeadingBlock
              blockType="HeroHeading"
              heading={
                isPageNotFound
                  ? rootLoaderData.common.pageNotFoundScreen.heading
                  : rootLoaderData.common.errorScreen.heading
              }
            />

            <StoryBlock
              blockType="Story"
              text={
                isPageNotFound
                  ? rootLoaderData.common.pageNotFoundScreen.text
                  : rootLoaderData.common.errorScreen.text
              }
            />
          </main>
          <Footer
            allBrands={rootLoaderData.allBrands}
            content={rootLoaderData.common.footer}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function FatalErrorScreen() {
  const { i18n, t } = useTranslation();
  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <title>{getTitle(t("errorBoundary.title"), undefined)}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        <main className="mx-auto my-36 max-w-xl text-neutral-800">
          <h1 className="mb-12 font-serif text-4xl leading-relaxed tracking-tight md:text-5xl md:leading-relaxed">
            {t("errorBoundary.title")}
          </h1>
          <Trans
            i18nKey="errorBoundary.text"
            components={{ p: <p className="my-6 text-lg" /> }}
          />
        </main>
        <Scripts />
      </body>
    </html>
  );
}
