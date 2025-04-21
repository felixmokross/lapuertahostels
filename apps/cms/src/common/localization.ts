import { LocalizationConfig } from "payload";

export const locales = [
  {
    code: "en",
    label: {
      en: "English",
      es: "Inglés",
    },
  },
  {
    code: "es",
    label: {
      en: "Spanish",
      es: "Español",
    },
  },
  {
    code: "de",
    label: {
      en: "German",
      es: "Alemán",
    },
  },
  {
    code: "fr",
    label: {
      en: "French",
      es: "Francés",
    },
  },
];

export const localization: LocalizationConfig = {
  defaultLocale: "en",
  fallback: true,
  locales,
};
