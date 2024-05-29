import { slateEditor } from "@payloadcms/richtext-slate";
import { Block } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { imageUrlField } from "../fields/image";

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
    {
      name: "heading",
      label: {
        en: "Heading",
        es: "Título",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      // TODO reuse richTextField
      name: "text",
      label: {
        en: "Text",
        es: "Texto",
      },
      type: "richText",
      required: true,
      localized: true,
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold"],
        },
      }),
      admin: {
        description: {
          en: "Mark parts of the text as bold to make it stand out. Use two line breaks to create a new paragraph.",
          es: "Marca partes del texto como negrita para que destaque. Usa dos saltos de línea para crear un nuevo párrafo.",
        },
      },
    },
    // TODO re-use imageField
    {
      ...imageUrlField,
      name: "imageUrl",
      label: {
        en: "Image URL",
        es: "URL de la imagen",
      },
    },
    {
      name: "imageAlt",
      label: {
        en: "Alternative Text of the Image",
        es: "Texto alternativo de la imagen",
      },
      type: "text",
      required: true,
      localized: true,
    },
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
    },
    {
      name: "grayscale",
      label: {
        en: "Grayscale",
        es: "Escala de grises",
      },
      type: "checkbox",
      admin: {
        description: {
          en: "Check this box to display the image in grayscale.",
          es: "Marca esta casilla para mostrar la imagen en escala de grises.",
        },
      },
    },
    {
      type: "collapsible",
      label: {
        en: "More Options",
        es: "Más opciones",
      },
      fields: [elementIdField],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
