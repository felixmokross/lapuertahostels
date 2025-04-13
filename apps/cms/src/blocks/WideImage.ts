import { Block } from "payload";
import { imageField } from "../fields/image";
import { overlayTextBox2Field } from "@/fields/overlay-text-box-2";

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
  fields: [imageField, overlayTextBox2Field()],
};
