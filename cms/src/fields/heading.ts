import { RelationshipField } from "payload/types";
import { Texts } from "../collections/texts/Texts";

type HeadingFieldOptions = {
  optional?: boolean;
};

export function makeHeadingField({
  optional = false,
}: HeadingFieldOptions = {}): RelationshipField {
  return {
    name: "heading",
    label: {
      en: "Heading",
      es: "Título",
    },
    type: "relationship",
    relationTo: Texts.slug,
    filterOptions: {
      type: { equals: "plainText" },
    },
    required: !optional,
  };
}

export const headingField = makeHeadingField();
