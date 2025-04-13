import { TextField } from "payload";

type Heading2FieldOptions = {
  optional?: boolean;
};

export function makeHeading2Field({
  optional = false,
}: Heading2FieldOptions = {}): TextField {
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

export const heading2Field = makeHeading2Field();
