import type { Decorator, Preview } from "@storybook/react";
import { createRoutesStub } from "react-router";
import "../app/global.css";
import React from "react";
import i18n from "./i18next";
import { ThemeProvider } from "../app/themes";

import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { allModes } from "./modes";

const withRemix: Decorator = (Story) => {
  const RemixStub = createRoutesStub([
    {
      path: "/*",
      Component: Story,
    },
  ]);

  return (
    <RemixStub
      hydrationData={{
        loaderData: {
          root: {
            environment: {
              version: "0.0.0-storybook",
              // @ts-ignore
              imagekitBaseUrl: import.meta.env.STORYBOOK_IMAGEKIT_BASE_URL,
              payloadCmsBaseUrl: "http://wwww.example.com",
              useImageCacheBuster:
                // @ts-ignore
                import.meta.env.STORYBOOK_USE_IMAGE_CACHE_BUSTER === "true",
              // @ts-ignore
              googleMapsApiKey: import.meta.env.STORYBOOK_GOOGLE_MAPS_API_KEY,
            },
            common: {
              maps: { mapId: "7686c4d7ba62c06", region: "CO" },
            },
          },
        },
      }}
    />
  );
};

const preview: Preview = {
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      es: "Español",
      de: "Deutsch",
      fr: "Français",
    },
  },
  globalTypes: {
    brand: {
      defaultValue: "puerta",
      toolbar: {
        title: "Brand",
        icon: "verified",
        items: ["puerta", "aqua", "azul"],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    i18n,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        desktop: {
          name: "Desktop",
          styles: {
            width: "1280px",
            height: "800px",
          },
          type: "desktop",
        },
        "large-desktop": {
          name: "Large desktop",
          styles: {
            width: "1536px",
            height: "1000px",
          },
          type: "desktop",
        },
      },
    },
    chromatic: {
      diffThreshold: 0.8,
      modes: {
        "viewport-small-mobile": allModes["viewport-small-mobile"],
        "viewport-large-mobile": allModes["viewport-large-mobile"],
        "viewport-tablet": allModes["viewport-tablet"],
        "viewport-desktop": allModes["viewport-desktop"],
        "viewport-large-desktop": allModes["viewport-large-desktop"],
      },
    },
  },
  decorators: [
    withRemix,
    (Story, { globals }) => (
      <ThemeProvider brandId={globals.brand}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
