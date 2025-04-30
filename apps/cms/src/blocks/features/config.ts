import { Block } from "payload";
import { makeMoreOptionsField } from "@/fields/more-options";
import { elementIdField } from "@/fields/element-id";
import { imageField } from "@/fields/image";
import { RowLabelProps } from "@/components/RowLabel";
import { makeCallToActionField } from "@/fields/call-to-action";
import { richTextField } from "@/fields/rich-text";
import { textField } from "@/fields/text";

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
        textField({ name: "heading", label: { en: "Heading", es: "Título" } }),
        richTextField(),
        makeCallToActionField({ optional: true, showByDefault: false }),
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
