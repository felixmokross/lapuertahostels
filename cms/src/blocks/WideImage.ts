import { Block, RelationshipField } from "payload/types";
import { imageField } from "../fields/image";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";
import { makeCallToActionField } from "../fields/call-to-action";

const richTextField = makeRichTextField();
const callToActionField = makeCallToActionField({
  optional: true,
  showByDefault: false,
});

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
  fields: [
    imageField,
    {
      name: "overlayTextBox",
      label: {
        en: "Overlay Text Box",
        es: "Caja de texto superpuesta",
      },
      type: "group",
      fields: [
        {
          name: "show",
          type: "checkbox",
          label: {
            en: "Show",
            es: "Mostrar",
          },
        },
        {
          ...headingField,
          admin: {
            ...headingField.admin,
            condition: (_, siblingData) => siblingData.show,
          },
        } as RelationshipField,
        {
          ...richTextField,
          admin: {
            ...richTextField.admin,
            condition: (_, siblingData) => siblingData.show,
          },
        } as RelationshipField,
        {
          ...callToActionField,
          admin: {
            ...callToActionField.admin,
            condition: (_, siblingData) => siblingData.show,
          },
        },
        {
          name: "position",
          label: {
            en: "Position",
            es: "Posición",
          },
          type: "radio",
          options: [
            {
              label: { en: "Top Left", es: "Arriba a la izquierda" },
              value: "top-left",
            },
            {
              label: { en: "Top Right", es: "Arriba a la derecha" },
              value: "top-right",
            },
            {
              label: { en: "Bottom Left", es: "Abajo a la izquierda" },
              value: "bottom-left",
            },
            {
              label: { en: "Bottom Right", es: "Abajo a la derecha" },
              value: "bottom-right",
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData.show,
          },
        },
      ],
    },
  ],
};
