import { Block } from "payload";
import { makeImageField } from "../fields/image";
import { makeMoreOptionsField } from "../fields/more-options";
import { elementIdField } from "../fields/element-id";
import { makeRichTextField } from "../fields/rich-text";
import { RowLabelProps } from "@/components/RowLabel";
import { makeHeading2Field } from "@/fields/heading2";
import { makeCallToAction2Field } from "@/fields/call-to-action-2";

export const TextColumnsWithImagesBlock: Block = {
  slug: "TextColumnsWithImages",
  labels: {
    singular: {
      en: "Text Columns with Images",
      es: "Columnas de texto con imágenes",
    },
    plural: {
      en: "Text Columns with Images",
      es: "Columnas de texto con imágenes",
    },
  },
  imageURL: "/assets/blocks/TextColumnsWithImages.png",
  imageAltText:
    "Preview of the Text Columns with Images block, showing a three-column grid in which each columns has a picture, a heading, a text, and a call to action.",
  fields: [
    makeHeading2Field({ optional: true }),
    makeRichTextField({ optional: true }),
    {
      name: "numberOfColumns",
      label: {
        en: "Number of columns",
        es: "Número de columnas",
      },
      type: "number",
      defaultValue: 3,
      min: 2,
      max: 4,
      admin: {
        description: {
          en: "Note that the specified number of columns per row is for standard desktop screens (width of 1280px or more) and will be reduced automatically on smaller screens.",
          es: "Ten en cuenta que el número de columnas por fila especificado es para pantallas de escritorio estándar (con un ancho de 1280px o más) y se reducirá automáticamente en pantallas más pequeñas.",
        },
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
      required: true,
      fields: [
        makeImageField({ optional: true }),
        {
          name: "size",
          label: {
            en: "Size",
            es: "Tamaño",
          },
          type: "radio",
          options: [
            { label: { en: "Full", es: "Completo" }, value: "full" },
            { label: { en: "Medium", es: "Mediano" }, value: "medium" },
            { label: { en: "Small", es: "Pequeño" }, value: "small" },
          ],
          defaultValue: "full",
          admin: {
            layout: "horizontal",
          },
        },
        makeHeading2Field({ optional: true }),
        makeRichTextField({ optional: true }),
        makeCallToAction2Field({ optional: true, showByDefault: false }),
      ],
      admin: {
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
