import { editor } from "@/collections/texts/editor";
import { RichTextField } from "payload";

export type RichTextFieldOptions = {
  optional?: boolean;
};

export function makeRichTextField({
  optional = false,
}: RichTextFieldOptions = {}): RichTextField {
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
