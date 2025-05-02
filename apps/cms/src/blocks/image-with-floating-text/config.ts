import { Block } from "payload";
import { elementIdField } from "../../fields/element-id";
import { moreOptionsField } from "../../fields/more-options";
import { imageField } from "../../fields/image";
import { overlayTitleField } from "@/fields/overlay-title";
import { richTextField } from "@/fields/rich-text";

export const ImageWithFloatingTextBlock: Block = {
  slug: "ImageWithFloatingText",
  interfaceName: "ImageWithFloatingText",
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
    imageField(),
    overlayTitleField({
      supportsCallToAction: false,
      supportsPositions: ["top-left", "top-right"],
      supportsSupportingText: false,
    }),
    richTextField(),
    moreOptionsField(elementIdField()),
  ],
};
