import { GroupField } from "payload/types";
import { showField } from "./show";

export const callToActionField: GroupField = {
  name: "cta",
  label: {
    en: "Call to Action (CTA)",
    es: "Call to Action (CTA)",
  },
  type: "group",
  fields: [
    showField,
    {
      name: "text",
      label: {
        en: "Text",
        es: "Texto",
      },
      type: "text",
      localized: true,
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.show,
      },
    },
    {
      name: "url",
      label: {
        en: "URL",
        es: "URL",
      },
      type: "text",
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.show,
      },
    },
  ],
};
