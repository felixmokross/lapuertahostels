import { slateEditor } from "@payloadcms/richtext-slate";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { Block, GlobalConfig } from "payload/types";
import { slidesField } from "../fields/slides";

const StoryBlock: Block = {
  slug: "Story",
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

export const Home: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  access: { read: () => true },
  fields: [
    slidesField,
    {
      name: "slideCta",
      label: {
        en: "Slide CTA",
        es: "CTA de Diapositiva",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "intro",
      label: {
        en: "Intro",
        es: "Introducción",
      },
      type: "group",
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
      ],
    },
    {
      name: "accommodations",
      label: {
        en: "Accommodations",
        es: "Alojamientos",
      },
      type: "group",
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
          name: "cards",
          label: {
            en: "Cards",
            es: "Tarjetas",
          },
          type: "array",
          minRows: 2,
          maxRows: 2,
          required: true,
          fields: [
            {
              name: "brand",
              label: {
                en: "Brand",
                es: "Marca",
              },
              type: "relationship",
              relationTo: "brands",
              filterOptions: { id: { not_equals: "puerta" } },
              required: true,
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
              name: "description",
              label: {
                en: "Description",
                es: "Descripción",
              },
              type: "text",
              required: true,
              localized: true,
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data }: RowLabelArgs) => data?.name,
            },
          },
        },
      ],
    },
    {
      name: "aboutSantaMarta",
      label: {
        en: "About Santa Marta",
        es: "Sobre Santa Marta",
      },
      type: "group",
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
      ],
    },
    {
      name: "layout",
      type: "blocks",
      minRows: 0,
      maxRows: 20,
      blocks: [StoryBlock],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
