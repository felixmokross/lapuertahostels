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
  imageURL: "/assets/blocks/Slides.png",
  imageAltText:
    "Preview of the Slides block, showing an image with an overlay title, CTA, and controls to switch slides.",
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
