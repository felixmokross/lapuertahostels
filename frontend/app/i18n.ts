export default {
  // This is the list of languages your application supports
  supportedLngs: ["en", "es", "de", "fr"],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: "en",
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: "common",
  // Disabling suspense is recommended
  react: { useSuspense: false },
};

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
