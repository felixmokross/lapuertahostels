import { slateEditor } from "@payloadcms/richtext-slate";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { Field } from "payload/types";

export const slidesField = {
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
      localized: true,
    },
    {
      name: "imageOverlay",
      label: {
        en: "Image Overlay",
        es: "Superposición de la Imagen",
      },
      type: "select",
      options: ["subtle", "moderate", "intense"],
    },
    {
      name: "imagePosition",
      label: {
        en: "Image Position",
        es: "Posición de la Imagen",
      },
      type: "select",
      options: ["center", "bottom"],
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
} as Field;
