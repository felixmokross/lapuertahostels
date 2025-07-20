import { createCookie } from "react-router";
import { RemixI18Next } from "remix-i18next/server";
import i18n, { fallbackLng, supportedLngs } from "~/i18n"; // your i18n configuration file
import { I18NextBackend } from "./i18next-backend.server";

export const localeCookie = createCookie("locale");

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: supportedLngs,
    fallbackLanguage: fallbackLng,
    order: ["searchParams", "cookie", "header"],
    cookie: localeCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: i18n,
  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system
  // Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
  plugins: [I18NextBackend],
});

export default i18next;
