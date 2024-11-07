import { slateEditor } from "@payloadcms/richtext-slate";
import { RelationshipField, RichTextField } from "payload/types";
import { Texts } from "../collections/Texts";

export type NewRichTextFieldOptions = {
  optional?: boolean;
};

export function makeNewRichTextField({
  optional = false,
}: NewRichTextFieldOptions = {}): RelationshipField {
  return {
    name: "text",
    label: {
      en: "Text",
      es: "Texto",
    },
    type: "relationship",
    relationTo: Texts.slug,
    filterOptions: {
      type: { equals: "richText" },
    },
    required: !optional,
  };
}
