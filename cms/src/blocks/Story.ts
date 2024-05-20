import { slateEditor } from "@payloadcms/richtext-slate";
import { Block } from "payload/types";

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
  imageURL:
    "https://ik.imagekit.io/lapuertahostels/cms/blocks/Story.png?updatedAt=1716207873579",
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
    },
    {
      name: "elementId",
      label: {
        en: "Element ID",
        es: "ID de Elemento",
      },
      type: "text",
      admin: {
        description: {
          en: "An element ID allows you to link to this element from other parts of the site. If the ID is 'about-us', you can link to it with an URL ending in '#about-us'.",
          es: "Un ID de elemento te permite enlazar a este elemento desde otras partes del sitio. Si el ID es 'about-us', puedes enlazar a él con una URL que termine en '#about-us'.",
        },
      },
    },
    {
      name: "imageUrl",
      label: {
        en: "Image URL",
        es: "URL de la Imagen",
      },
      type: "text",
      required: true,
    },
    {
      name: "imageAlt",
      label: {
        en: "Alternative Text of the Image",
        es: "Texto Alternativo de la Imagen",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "imagePosition",
      label: {
        en: "Image Position",
        es: "Posición de la Imagen",
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
        es: "Escala de Grises",
      },
      type: "checkbox",
    },
  ],
};
