import { TextareaField } from "payload";

export function textareaField(
  config: Partial<TextareaField> = {},
): TextareaField {
  return {
    name: "text",
    label: {
      en: "Text",
      es: "Texto",
    },
    type: "textarea",
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
  } as TextareaField;
}
