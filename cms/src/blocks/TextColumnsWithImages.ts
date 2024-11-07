import { Block } from "payload/types";
import { makeRichTextField } from "../fields/rich-text";
import { makeImageField } from "../fields/image";
import { makeMoreOptionsField } from "../fields/more-options";
import { elementIdField } from "../fields/element-id";
import { makeNewHeadingField } from "../fields/new-heading";
import { makeNewCallToActionField } from "../fields/new-call-to-action";

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
    makeNewHeadingField({ optional: true }),
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
        makeNewHeadingField({ optional: true }),
        makeRichTextField({ optional: true }),
        makeNewCallToActionField({ optional: true, showByDefault: false }),
      ],
    },
    makeMoreOptionsField(elementIdField),
  ],
};
