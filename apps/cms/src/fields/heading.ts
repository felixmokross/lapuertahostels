import { TextField } from "payload";
import { textField } from "./text";

type HeadingFieldOptions = {
  optional?: boolean;
};

// TODO inline this
export function makeHeadingField({
  optional = false,
}: HeadingFieldOptions = {}): TextField {
  return textField({
    name: "heading",
    label: { en: "Heading", es: "Título" },
    required: !optional,
  });
}

export const headingField = makeHeadingField();
