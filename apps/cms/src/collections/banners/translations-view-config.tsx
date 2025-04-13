import { EditViewConfig } from "payload";

export function translationsView(): EditViewConfig {
  return {
    Component: "src/collections/banners/translations-view#TranslationsView",
    path: "/translations",
    tab: {
      label: ({ t }) => t("custom:banners:translations"),
      href: "/translations",
    },
  };
}
