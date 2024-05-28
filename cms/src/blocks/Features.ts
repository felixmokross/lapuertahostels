import { slateEditor } from "@payloadcms/richtext-slate";
import { Block } from "payload/types";

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
      name: "items",
      label: {
        en: "Items",
        es: "Elementos",
      },
      type: "array",
      minRows: 1,
      required: true,
      fields: [
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
          name: "title",
          label: {
            en: "Title",
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
          editor: slateEditor({
            admin: {
              elements: [],
              leaves: ["bold"],
            },
          }),
          required: true,
          localized: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }) => data?.title,
        },
      },
    },
  ],
};
