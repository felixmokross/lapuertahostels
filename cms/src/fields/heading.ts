import { TextField } from "payload/types";

type HeadingFieldOptions = {
  optional?: boolean;
};

export function makeHeadingField({
  optional = false,
}: HeadingFieldOptions = {}): TextField {
  return {
    name: "heading",
    label: {
      en: "Heading",
      es: "Título",
    },
    type: "text",
    required: !optional,
    localized: true,
  };
}

export const headingField = makeHeadingField();
