import { TextField } from "payload";

export function optionalTextField(config: Partial<TextField> = {}): TextField {
  return textField({ ...config, required: false });
}

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
        Label:
          "/src/components/translations-field-label#TranslationsFieldLabel",
        ...config.admin?.components,
      },
    },
  } as TextField;
}
