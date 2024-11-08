import { Block } from "payload/types";
import { makeMoreOptionsField } from "../fields/more-options";
import { elementIdField } from "../fields/element-id";
import { imageField } from "../fields/image";
import { newHeadingField } from "../fields/new-heading";
import { makeNewRichTextField } from "../fields/new-rich-text";
import { makeNewCallToActionField } from "../fields/new-call-to-action";

export const FeaturesBlock: Block = {
  slug: "Features",
  labels: {
    singular: {
      en: "Features",
      es: "Características",
    },
    plural: {
      en: "Features",
      es: "Características",
    },
  },
  imageURL: "/assets/blocks/Features.png",
  imageAltText:
    "Preview of the Features block, showing images with short texts on the side, in alternating manner.",
  fields: [
    {
      type: "radio",
      name: "orientation",
      label: {
        en: "Orientation",
        es: "Orientación",
      },
      options: [
        {
          value: "first-image-left",
          label: {
            en: "First Image Left",
            es: "Primera imagen a la izquierda",
          },
        },
        {
          value: "first-image-right",
          label: {
            en: "First Image Right",
            es: "Primera imagen a la derecha",
          },
        },
      ],
      defaultValue: "first-image-left",
      admin: {
        layout: "horizontal",
      },
    },
    {
      name: "items",
      label: {
        en: "Items",
        es: "Elementos",
      },
      labels: {
        singular: {
          en: "Item",
          es: "Elemento",
        },
        plural: {
          en: "Items",
          es: "Elementos",
        },
      },
      type: "array",
      minRows: 1,
      required: true,
      fields: [
        imageField,
        newHeadingField,
        makeNewRichTextField(),
        makeNewCallToActionField({ optional: true, showByDefault: false }),
      ],
      admin: {
        initCollapsed: true,
      },
    },
    makeMoreOptionsField(elementIdField),
  ],
};
