import { LocalizationConfig } from "payload";
import locales from "./locales.json";

export const localization: LocalizationConfig = {
  defaultLocale: "en",
  fallback: true,
  locales,
  filterAvailableLocales: async ({ locales, req }) => {
    const configuredLocales = await req.payload.find({
      collection: "locale-configs",
      pagination: false,
    });
    return configuredLocales.docs.map((configuredLocale) => ({
      code: configuredLocale.locale,
      label: locales.find((l) => l.code === configuredLocale.locale)!.label,
    }));
  },
};
