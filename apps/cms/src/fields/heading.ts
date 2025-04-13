import { TextField } from "payload";

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
    localized: true,
    required: !optional,
  };
}

export const headingField = makeHeadingField();
