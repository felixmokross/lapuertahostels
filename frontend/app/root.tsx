import {
  json,
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
  ShouldRevalidateFunctionArgs,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css?url";
import { useTranslation } from "react-i18next";
import { Banner } from "./components/banner";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer";
import { getBrandIdFromPath, ThemeProvider } from "./brands";
import i18next from "./i18next.server";
import { Brand, Common } from "./payload-types";

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

export const meta: MetaFunction = () => [
  {
    name: "msapplication-TileColor",
    content: "#00aba9",
  },
  {
    name: "theme-color",
    content: "#e2d0b6",
  },
];

export function shouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  const currentBrandId = getBrandIdFromPath(currentUrl.pathname);
  const nextBrandId = getBrandIdFromPath(nextUrl.pathname);
  if (currentBrandId !== nextBrandId) {
    console.log("Brand changed, revalidating");
    return true;
  }

  return defaultShouldRevalidate;
}

export async function loader({ request }: LoaderFunctionArgs) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }

  const brandId = getBrandIdFromPath(new URL(request.url).pathname);
  const locale = await i18next.getLocale(request);

  const allBrands = (
    await (
      await fetch(
        `${process.env.PAYLOAD_CMS_BASE_URL}/api/brands?locale=${locale}`,
      )
    ).json()
  ).docs as Brand[];

  const brand = allBrands.find((b) => b.id === brandId);
  if (!brand) throw new Error(`Brand not found: ${brandId}`);

  // TODO provide an function for this
  const common = (await (
    await fetch(
      `${process.env.PAYLOAD_CMS_BASE_URL}/api/globals/common?locale=${locale}`,
    )
  ).json()) as Common;

  return json({
    brand,
    allBrands,
    common,
    imagekitBaseUrl: process.env.IMAGEKIT_BASE_URL,
    analyticsDomain: process.env.ANALYTICS_DOMAIN,
    comingSoon: !!process.env.COMING_SOON,
  });
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function App() {
  const { common, analyticsDomain, comingSoon, brand, allBrands } =
    useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {analyticsDomain && (
          <script
            defer
            data-domain={analyticsDomain}
            src="https://plausible.io/js/script.js"
          ></script>
        )}
      </head>
      <body className="bg-white text-neutral-900 antialiased">
        {comingSoon ? (
          <div className="flex h-screen items-center justify-center bg-gradient-to-br text-6xl font-light tracking-tighter text-neutral-800">
            Coming soon…
          </div>
        ) : (
          <ThemeProvider brand={brand}>
            {common.banner?.message && (
              <Banner
                cta={`${common.banner.cta} →`}
                ctaTo={common.banner.ctaUrl || "#"}
              >
                {common.banner.message}
              </Banner>
            )}
            <Header brand={brand} allBrands={allBrands} />
            <main>
              <Outlet />
            </main>
            <Footer allBrands={allBrands} content={common.footer} />
          </ThemeProvider>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
