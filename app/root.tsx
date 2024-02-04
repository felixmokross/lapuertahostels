import {
  json,
  MetaFunction,
  type LinksFunction,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  matchPath,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { useTranslation } from "react-i18next";
import { Banner } from "./components/banner";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer";
import i18n from "./i18n";
import i18next from "./i18next.server";
import { RoutingBrandProvider } from "./brands";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;700&display=swap",
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

export async function loader({ request }: LoaderFunctionArgs) {
  const match = matchPath(":locale?/*", new URL(request.url).pathname);
  if (
    !match?.params?.locale ||
    !i18n.supportedLngs.includes(match.params.locale)
  ) {
    const autoDetectedLocale = await i18next.getLocale(request);
    return redirect(
      `/${autoDetectedLocale}${match?.pathname === "/" ? "" : `${match?.pathname}`}`,
    );
  }

  return json({
    imagekitBaseUrl: process.env.IMAGEKIT_BASE_URL,
    analyticsDomain: process.env.ANALYTICS_DOMAIN,
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
  const { analyticsDomain } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();
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
        {/* <div className="flex h-screen items-center justify-center bg-gradient-to-br text-6xl font-light tracking-tighter text-neutral-800">
          Coming soon…
        </div> */}
        <RoutingBrandProvider>
          <Banner cta={t("bannerCta")} ctaTo="/">
            {t("bannerMessage")}
          </Banner>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </RoutingBrandProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
