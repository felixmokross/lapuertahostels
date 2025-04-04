import { initReactI18next } from "react-i18next";
import i18n, { Resource } from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const ns = ["common", "admin"];
const supportedLngs = ["en", "es", "de", "fr"];

async function loadResources() {
  const resources = {};
  for (const lng of supportedLngs) {
    resources[lng] = {};
    for (const n of ns) {
      // TODO this seems weird, it produces a warning by Storybook (importing from 'public')
      // Also we can't check if the file exists – we should rethink the approach how we can load these files
      const data = await import(`../public/assets/locales/${lng}/${n}.json`);
      resources[lng][n] = data;
    }
  }
  return resources as Resource | undefined;
}

loadResources().then((resources) =>
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init({
      lng: "en",
      fallbackLng: "en",
      defaultNS: "common",
      ns,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      supportedLngs,
      resources,
    }),
);

export default i18n;
