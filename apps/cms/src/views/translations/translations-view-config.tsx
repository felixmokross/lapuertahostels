import { EditViewConfig } from "payload";

export function translationsView(): EditViewConfig {
  return {
    Component: "src/views/translations/translations-view#TranslationsView",
    path: "/translations",
    tab: {
      label: ({ t }) => t("custom:banners:translations"),
      href: "/translations",
    },
  };
}
