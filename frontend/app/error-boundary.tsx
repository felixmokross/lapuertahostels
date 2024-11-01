import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { Trans, useTranslation } from "react-i18next";
import { type loader } from "./root";
import { getTitle } from "./common/meta";
import { ThemeProvider } from "./themes";
import { Header } from "./layout/header";
import { HeroHeadingBlock } from "./blocks/hero-heading-block";
import { StoryBlock } from "./blocks/story-block";
import { Footer } from "./layout/footer";
import { AnalyticsScript } from "./analytics-script";

export function GlobalErrorBoundary() {
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  const error = useRouteError();
  console.error(error);

  const { i18n } = useTranslation();

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
