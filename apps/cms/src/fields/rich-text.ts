import { editor } from "@/collections/texts/editor";
import { RichTextField } from "payload";

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
    editor: editor(),
    localized: true,
    required: true,
    ...config,
  };
}
