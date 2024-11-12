import {
  LoaderFunctionArgs,
  MetaFunction,
  type LinksFunction,
} from "@remix-run/node";
import {
  Form,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css?url";
import { useTranslation } from "react-i18next";
import { Footer } from "./layout/footer";
import { BrandId } from "./brands";
import { getBrands, getCommon, getMaintenance, tryGetPage } from "./cms-data";
import { OptInLivePreview } from "./common/live-preview";
import { ThemeProvider, useTheme } from "./themes";
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
import { GlobalErrorBoundary } from "./global-error-boundary";
import { AnalyticsScript } from "./analytics-script";
import { getSession } from "./sessions.server";
import { Paragraph } from "./common/paragraph";
import { Button } from "./common/button";
import { Link } from "./common/link";
import { cn } from "./common/cn";
import { useEnvironment } from "./environment";

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const description = data?.common.meta?.description;
  if (description != null && typeof description !== "object") {
    throw new Error("Invalid description");
  }
  return [
    {
      name: "msapplication-TileColor",
      content: "#00aba9",
    },
    {
      name: "theme-color",
      content: "#e2d0b6",
    },
    { name: "description", content: description?.text ?? "" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }
  if (!process.env.IMAGEKIT_BASE_URL) {
    throw new Error("IMAGEKIT_BASE_URL is not set");
  }
  const session = await getSession(request.headers.get("Cookie"));

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
    hasSession: session.has("userId"),
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
  const { brand, common, maintenance, analyticsDomain, allBrands, hasSession } =
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
        <ThemeProvider brandId={brand.id as BrandId}>
          <OptInLivePreview path={`brands/${brand.id}`} data={brand}>
            {(brand) => (
              <OptInLivePreview path="globals/common" data={common}>
                {(common) => (
                  <>
                    {(!maintenance.maintenanceScreen?.show || hasSession) && (
                      <Header
                        brand={brand}
                        allBrands={allBrands}
                        onHeightChanged={setHeaderHeight}
                      />
                    )}
                    <main>
                      <Outlet />
                    </main>
                    {(!maintenance.maintenanceScreen?.show || hasSession) && (
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
          {!!hasSession && (
            <PreviewControlBar className="sticky inset-x-0 bottom-0 z-50" />
          )}
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

type PreviewControlBarProps = {
  className?: string;
};

function PreviewControlBar({ className }: PreviewControlBarProps) {
  const theme = useTheme();
  const { payloadCmsBaseUrl } = useEnvironment();
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-8 border-t border-neutral-300 bg-neutral-800 bg-opacity-90 px-4 py-4 backdrop-blur-sm",
        theme.lightBackgroundColor,
        className,
      )}
    >
      <Paragraph size="small" variant="white">
        The website is currently in maintenance mode and not accessible
        publicly. You are viewing a preview of the website.
      </Paragraph>
      <div className="flex gap-4">
        <Button size="small" as={Link} to={payloadCmsBaseUrl} variant="primary">
          Manage Content…
        </Button>
        <Form action="/logout" className="contents" method="POST">
          <Button type="submit" size="small">
            Log Out
          </Button>
        </Form>
      </div>
    </div>
  );
}
