import { Block } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { makeMoreOptionsField } from "../fields/more-options";
import { imageField } from "../fields/image";
import { makeOverlayTitleField } from "../fields/overlay-title";
import { makeRichTextField } from "../fields/rich-text";

export const ImageWithFloatingTextBlock: Block = {
  slug: "ImageWithFloatingText",
  labels: {
    singular: {
      en: "Image with Floating Text",
      es: "Imagen con texto flotante",
    },
    plural: {
      en: "Images with Floating Text",
      es: "Imágenes con texto flotante",
    },
  },
  imageURL: "/assets/blocks/ImageWithFloatingText.png",
  imageAltText:
    "Preview of the Image with Floating Text block, showing a large image with an integrated heading and a text box on the bottom right.",
  fields: [
    imageField,
    makeOverlayTitleField({
      supportsCallToAction: false,
      supportsPositions: ["top-left", "top-right"],
    }),
    makeRichTextField(),
    makeMoreOptionsField(elementIdField),
  ],
};
