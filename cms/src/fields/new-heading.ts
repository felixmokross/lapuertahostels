import { RelationshipField } from "payload/types";
import { Texts } from "../collections/Texts";

type NewHeadingFieldOptions = {
  optional?: boolean;
};

export function makeNewHeadingField({
  optional = false,
}: NewHeadingFieldOptions = {}): RelationshipField {
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

export const newHeadingField = makeNewHeadingField();
