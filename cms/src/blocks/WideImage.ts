import { Block } from "payload";
import { imageField } from "../fields/image";
import { overlayTextBoxField } from "@/fields/overlay-text-box";

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
  imageURL: "/assets/blocks/WideImage.png",
  imageAltText:
    "Preview of the Wide Image block, showing an image spanning the whole page width with an overlay text box including a call to action.",
  fields: [imageField, overlayTextBoxField()],
};
