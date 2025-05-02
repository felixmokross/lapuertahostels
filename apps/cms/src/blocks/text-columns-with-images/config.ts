import { Block } from "payload";
import { imageField } from "@/fields/image";
import { moreOptionsField } from "@/fields/more-options";
import { elementIdField } from "@/fields/element-id";
import { RowLabelProps } from "@/components/row-label";
import { callToActionField } from "@/fields/call-to-action";
import { richTextField } from "@/fields/rich-text";
import { textField } from "@/fields/text";

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
    textField({
      name: "heading",
      label: { en: "Heading", es: "Título" },
      required: false,
    }),
    richTextField({ required: false }),
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
        imageField({ optional: true }),
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
        textField({
          name: "heading",
          label: { en: "Heading", es: "Título" },
          required: false,
        }),
        richTextField({ required: false }),
        callToActionField({ optional: true, showByDefault: false }),
      ],
      admin: {
        components: {
          RowLabel: {
            path: "/src/components/row-label",
            exportName: "RowLabel",
            clientProps: {
              textProp: "heading",
            } as RowLabelProps,
          },
        },
      },
    },
    moreOptionsField(elementIdField()),
  ],
};
