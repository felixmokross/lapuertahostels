import { Block } from "payload/types";
import { slidesField } from "../fields/slides";

export const SlidesBlock: Block = {
  slug: "Slides",
  labels: {
    singular: {
      en: "Slides",
      es: "Diapositivas",
    },
    plural: {
      en: "Slides",
      es: "Diapositivas",
    },
  },
  // imageURL: "/assets/blocks/Features.png",
  // imageAltText:
  //   "Preview of the Features block, showing an images with a short texts on the side, in alternating manner.",
  fields: [
    slidesField,
    {
      name: "slideCta",
      label: {
        en: "Slide CTA",
        es: "CTA de Diapositiva",
      },
      type: "text",
      required: true,
      localized: true,
    },
  ],
};
