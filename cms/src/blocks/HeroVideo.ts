import { Block } from "payload/types";

export const HeroVideoBlock: Block = {
  slug: "HeroVideo",
  labels: {
    singular: {
      en: "Hero Video",
      es: "Video de Héroe",
    },
    plural: {
      en: "Hero Videos",
      es: "Videos de Héroe",
    },
  },
  // imageURL: "/assets/blocks/Features.png",
  // imageAltText:
  //   "Preview of the Features block, showing an images with a short texts on the side, in alternating manner.",
  fields: [
    {
      name: "videoUrl",
      label: {
        en: "Video URL",
        es: "URL del Video",
      },
      type: "text",
      required: true,
    },
  ],
};
