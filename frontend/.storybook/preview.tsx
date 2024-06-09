import type { Decorator, Preview } from "@storybook/react";
import { createRemixStub } from "@remix-run/testing";
import "../app/tailwind.css";
import React from "react";
import i18n from "./i18next";
import { ThemeProvider } from "../app/themes";
import { Brand } from "../app/payload-types";

const withRemix: Decorator = (Story) => {
  const RemixStub = createRemixStub([
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
              // @ts-ignore
              imagekitBaseUrl: import.meta.env.STORYBOOK_IMAGEKIT_BASE_URL,
            },
          },
        },
      }}
    />
  );
};

const preview: Preview = {
  globals: {
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
  },
  decorators: [
    withRemix,
    (Story, { globals }) => (
      <ThemeProvider brand={{ id: globals.brand } as Brand}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
