import { Block } from "payload";
import { makeMoreOptionsField } from "../fields/more-options";
import { elementIdField } from "../fields/element-id";
import { imageField } from "../fields/image";
import { RowLabelProps } from "@/components/RowLabel";
import { heading2Field } from "@/fields/heading2";
import { makeCallToAction2Field } from "@/fields/call-to-action-2";
import { makeRichText2Field } from "@/fields/rich-text-2";

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
        heading2Field,
        makeRichText2Field(),
        makeCallToAction2Field({ optional: true, showByDefault: false }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: {
            path: "/src/components/RowLabel",
            exportName: "RowLabel",
            clientProps: {
              textProp: "heading",
            } as RowLabelProps,
          },
        },
      },
    },
    makeMoreOptionsField(elementIdField),
  ],
};
