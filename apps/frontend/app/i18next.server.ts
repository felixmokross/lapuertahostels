import { createCookie } from "react-router";
import Backend, { FsBackendOptions } from "i18next-fs-backend/cjs";
import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next/server";
import i18n from "~/i18n"; // your i18n configuration file

export const localeCookie = createCookie("locale");

export const i18nextBackendOptions: FsBackendOptions = {
  loadPath: resolve("./public/assets/locales/{{lng}}/{{ns}}.json"),
};

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    order: ["searchParams", "cookie", "header"],
    cookie: localeCookie,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
    backend: i18nextBackendOptions,
  },
  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system
  // Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
  plugins: [Backend],
});

export default i18next;
