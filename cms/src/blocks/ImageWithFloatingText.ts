import { slateEditor } from "@payloadcms/richtext-slate";
import { Block } from "payload/types";

export const ImageWithFloatingTextBlock: Block = {
  slug: "ImageWithFloatingText",
  labels: {
    singular: {
      en: "Image with Floating Text",
      es: "Imagen con Texto Flotante",
    },
    plural: {
      en: "Images with Floating Text",
      es: "Imágenes con Texto Flotante",
    },
  },
  imageURL: "/assets/blocks/ImageWithFloatingText.png",
  imageAltText:
    "Preview of the Image with Floating Text block, showing a large image with an integrated heading and a text box on the bottom right.",
  fields: [
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
      name: "heading",
      label: {
        en: "Heading",
        es: "Título",
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
      name: "textPosition",
      label: {
        en: "Text Position",
        es: "Posición del Texto",
      },
      type: "radio",
      options: [
        { label: { en: "Left", es: "Izquierda" }, value: "left" },
        { label: { en: "Right", es: "Derecha" }, value: "right" },
      ],
      defaultValue: "right",
    },
    {
      name: "imageOverlay",
      label: {
        en: "Image Overlay",
        es: "Superposición de la Imagen",
      },
      type: "radio",
      options: [
        { label: { en: "Subtle", es: "Sutil" }, value: "subtle" },
        { label: { en: "Moderate", es: "Moderada" }, value: "moderate" },
        { label: { en: "Intense", es: "Intensa" }, value: "intense" },
      ],
      defaultValue: "moderate",
    },
  ],
};
