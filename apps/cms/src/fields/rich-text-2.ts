import { editor } from "@/collections/texts/editor";
import { RichTextField } from "payload";

export type RichText2FieldOptions = {
  optional?: boolean;
};

export function makeRichText2Field({
  optional = false,
}: RichText2FieldOptions = {}): RichTextField {
  return {
    name: "text",
    label: {
      en: "Text",
      es: "Texto",
    },
    type: "richText",
    editor: editor(),
    localized: true,
    required: !optional,
  };
}
