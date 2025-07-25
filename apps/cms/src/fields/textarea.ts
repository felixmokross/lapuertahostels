import { TextareaField } from "payload";

export function optionalTextareaField(
  config: Partial<TextareaField> = {},
): TextareaField {
  return textareaField({ ...config, required: false });
}
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
        Label:
          "/src/components/translations-field-label#TranslationsFieldLabel",
        ...config.admin?.components,
      },
    },
  } as TextareaField;
}
