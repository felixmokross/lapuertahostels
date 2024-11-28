import { Block } from "payload";
import { elementIdField } from "../fields/element-id";
import { makeMoreOptionsField } from "../fields/more-options";
import { makeImageField } from "../fields/image";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";

const optionalImageField = makeImageField({ optional: true });

export const StoryBlock: Block = {
  slug: "Story",
  labels: {
    singular: {
      en: "Story",
      es: "Historia",
    },
    plural: {
      en: "Stories",
      es: "Historias",
    },
  },
  imageURL: "/assets/blocks/Story.png",
  imageAltText:
    "Preview of the Story block, showing an image on the left and text on the right",
  fields: [
    { ...headingField, required: false },
    makeRichTextField(),
    optionalImageField,
    {
      name: "imagePosition",
      label: {
        en: "Image Position",
        es: "Posición de la imagen",
      },
      type: "radio",
      options: [
        { label: { en: "Left", es: "Izquierda" }, value: "left" },
        { label: { en: "Right", es: "Derecha" }, value: "right" },
      ],
      admin: {
        condition: (_, siblingData) => !!siblingData?.image,
      },
    },
    {
      name: "grayscaleImage",
      label: {
        en: "Grayscale Image",
        es: "Imagen en escala de grises",
      },
      type: "checkbox",
      admin: {
        description: {
          en: "Check this box to display the image in grayscale.",
          es: "Marca esta casilla para mostrar la imagen en escala de grises.",
        },
        condition: (_, siblingData) => !!siblingData?.image,
      },
    },
    makeMoreOptionsField(elementIdField),
  ],
};
