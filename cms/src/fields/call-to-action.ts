import { Field } from "payload/types";

export const callToActionField = {
  name: "cta",
  label: {
    en: "Call to Action (CTA)",
    es: "Call to Action (CTA)",
  },
  type: "group",
  fields: [
    {
      name: "text",
      label: {
        en: "Text",
        es: "Texto",
      },
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "url",
      label: {
        en: "URL",
        es: "URL",
      },
      type: "text",
      required: true,
    },
  ],
} as Field;
