import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const ns = ["common"];
const supportedLngs = ["en", "es"];

const resources = {};
for (const lng of supportedLngs) {
  resources[lng] = {};
  for (const n of ns) {
    const data = await import(`../public/locales/${lng}/${n}.json`);
    resources[lng][n] = data;
  }
}

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
  });

export default i18n;
