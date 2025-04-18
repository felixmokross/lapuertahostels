import { TextField } from "payload";

export function textField(config: Partial<TextField> = {}): TextField {
  return {
    name: "text",
    label: {
      en: "Text",
      es: "Texto",
    },
    type: "text",
    localized: true,
    required: true,
    ...config,
    admin: {
      ...config.admin,
      components: {
        Label: "/src/components/translations-button#TranslationsButton",
        ...config.admin?.components,
      },
    },
  } as TextField;
}
