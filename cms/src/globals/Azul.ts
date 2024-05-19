import { GlobalConfig } from "payload/types";
import { slidesField } from "../fields/slides";
import { slateEditor } from "@payloadcms/richtext-slate";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

export const Azul: GlobalConfig = {
  slug: "azul",
  label: {
    en: "Azul",
    es: "Azul",
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
      name: "features",
      label: {
        en: "Features",
        es: "Características",
      },
      labels: {
        singular: {
          en: "Feature",
          es: "Característica",
        },
        plural: {
          en: "Features",
          es: "Características",
        },
      },
      type: "array",
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
          RowLabel: ({ data }: RowLabelArgs) => data?.title,
        },
      },
    },
  ],
  custom: {
    route: "/azul",
  },
};
