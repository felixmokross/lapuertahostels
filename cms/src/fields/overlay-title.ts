import { slateEditor } from "@payloadcms/richtext-slate";
import { Field } from "payload/types";
import { callToAction } from "./call-to-action";

export const overlayTitle = {
  name: "overlayTitle",
  label: {
    en: "Overlay Title",
    es: "Título con Superposición",
  },
  type: "group",
  required: true,
  fields: [
    {
      name: "text",
      label: {
        en: "Text",
        es: "Texto",
      },
      localized: true,
      required: true,
      type: "richText",
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold"],
        },
      }),
    },
    {
      name: "position",
      label: {
        en: "Position",
        es: "Posición",
      },
      type: "radio",
      options: [
        { value: "center", label: { en: "Center", es: "Centro" } },
        {
          value: "top-left",
          label: { en: "Top Left", es: "Arriba a la Izquierda" },
        },
        {
          value: "top-right",
          label: { en: "Top Right", es: "Arriba a la Derecha" },
        },
        {
          value: "bottom-right",
          label: { en: "Bottom Right", es: "Abajo a la Derecha" },
        },
        {
          value: "bottom-left",
          label: { en: "Bottom Left", es: "Abajo a la Izquierda" },
        },
      ],
      defaultValue: "center",
    },
    {
      name: "overlay",
      label: {
        en: "Overlay",
        es: "Superposición",
      },
      type: "radio",
      options: [
        { value: "subtle", label: { en: "Subtle", es: "Sutil" } },
        { value: "moderate", label: { en: "Moderate", es: "Moderado" } },
        { value: "intense", label: { en: "Intense", es: "Intenso" } },
      ],
      defaultValue: "moderate",
    },
    {
      name: "showCta",
      label: {
        en: "Show Call to Action",
        es: "Mostrar Call to Action",
      },
      type: "checkbox",
    },
    {
      ...callToAction,
      admin: { condition: (_, siblingData) => siblingData.showCta },
    },
  ],
} as Field;