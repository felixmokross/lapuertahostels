import { InitOptions } from "i18next";
import { adminResources } from "./i18n.admin-resources";

export const supportedLngs = ["en", "es", "de", "fr"];
export const fallbackLng = "en";

export default {
  // This is the list of languages your application supports
  supportedLngs,
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng,
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: "ui-labels",
  // Disabling suspense is recommended
  react: { useSuspense: false },
  partialBundledLanguages: true,
  resources: adminResources,
} as InitOptions;

export function getLocaleLabel(locale: string) {
  switch (locale) {
    case "en":
      return "English";
    case "es":
      return "Español";
    case "de":
      return "Deutsch";
    case "fr":
      return "Français";
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
