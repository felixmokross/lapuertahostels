import { Block } from "payload/types";
import { headingField } from "../fields/heading";
import { makeImageField } from "../fields/image";

export const HeroHeading: Block = {
  slug: "HeroHeading",
  labels: {
    singular: {
      en: "Hero Heading",
      es: "Encabezado de héroe",
    },
    plural: {
      en: "Hero Headings",
      es: "Encabezados de héroe",
    },
  },
  imageURL: "/assets/blocks/HeroHeading.png",
  imageAltText:
    "Preview of the Hero Heading block, showing a centered heading on a brand color background.",
  fields: [headingField, makeImageField({ optional: true })],
};
