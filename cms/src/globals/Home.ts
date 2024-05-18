import { slateEditor } from "@payloadcms/richtext-slate";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { GlobalConfig } from "payload/types";

export const Home: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  access: { read: () => true },
  fields: [
    {
      name: "slides",
      label: {
        en: "Slides",
        es: "Diapositivas",
      },
      labels: {
        singular: {
          en: "Slide",
          es: "Diapositiva",
        },
        plural: {
          en: "Slides",
          es: "Diapositivas",
        },
      },
      type: "array",
      required: true,
      maxRows: 6,
      fields: [
        {
          name: "name",
          label: {
            en: "Name",
            es: "Nombre",
          },
          type: "text",
          required: true,
        },
        {
          name: "title",
          label: {
            en: "Title",
            es: "Título",
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
        {
          name: "titlePosition",
          label: {
            en: "Title Position",
            es: "Posición del Título",
          },
          type: "select",
          options: [
            "center",
            "top-left",
            "top-right",
            "bottom-right",
            "bottom-left",
          ],
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
        },
        {
          name: "ctaUrl",
          label: {
            en: "CTA URL",
            es: "URL del CTA",
          },
          type: "text",
          required: true,
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.name,
        },
      },
    },
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
              name: "name",
              label: {
                en: "Name",
                es: "Nombre",
              },
              type: "text",
              required: true,
            },
            {
              name: "color",
              label: {
                en: "Color",
                es: "Color",
              },
              type: "select",
              options: ["aqua", "azul"],
              required: true,
            },
            {
              name: "to",
              label: {
                en: "Link",
                es: "Enlace",
              },
              type: "text",
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
            components: {
              RowLabel: ({ data }: RowLabelArgs) => data?.name,
            },
          },
        },
      ],
    },
  ],
};
