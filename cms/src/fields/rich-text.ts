import { RelationshipField } from "payload";
import { Texts } from "../collections/texts/Texts";

export type RichTextFieldOptions = {
  optional?: boolean;
};

export function makeRichTextField({
  optional = false,
}: RichTextFieldOptions = {}): RelationshipField {
  return {
    name: "text",
    label: {
      en: "Text",
      es: "Texto",
    },
    type: "relationship",
    relationTo: "texts",
    filterOptions: {
      type: { equals: "richText" },
    },
    required: !optional,
  };
}
