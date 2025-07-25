import { RichTextField } from "payload";

export function optionalRichTextField(
  config: Partial<RichTextField> = {},
): RichTextField {
  return richTextField({ ...config, required: false });
}

export function richTextField(
  config: Partial<RichTextField> = {},
): RichTextField {
  return {
    name: "text",
    label: {
      en: "Text",
      es: "Texto",
    },
    type: "richText",
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
  };
}
