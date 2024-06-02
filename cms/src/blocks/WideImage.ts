import { Block } from "payload/types";
import { imageField } from "../fields/image";

export const WideImageBlock: Block = {
  slug: "WideImage",
  labels: {
    singular: {
      en: "Wide Image",
      es: "Imagen ancha",
    },
    plural: {
      en: "Wide Images",
      es: "Imágenes anchas",
    },
  },
  // imageURL: "/assets/blocks/HeroVideo.png",
  // imageAltText:
  //   "Preview of the Hero Video block, showing a image with an overlay title and a CTA.",
  fields: [imageField],
};
