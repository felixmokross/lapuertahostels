import { slateEditor } from "@payloadcms/richtext-slate";
import { Block } from "payload/types";

export const LeadBlock: Block = {
  slug: "Lead",
  labels: {
    singular: {
      en: "Lead",
      es: "Encabezado",
    },
    plural: {
      en: "Leads",
      es: "Encabezados",
    },
  },
  imageURL: "/assets/blocks/Lead.png",
  imageAltText: "Preview of the Lead block, showing a heading and a large text",
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
  ],
};
