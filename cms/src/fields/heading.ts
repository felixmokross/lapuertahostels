import { RelationshipField } from "payload";

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
    relationTo: "texts",
    filterOptions: {
      type: { equals: "plainText" },
    },
    required: !optional,
  };
}

export const headingField = makeHeadingField();
