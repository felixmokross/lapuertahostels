import { Block } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { headingField } from "../fields/heading";
import { richTextField } from "../fields/rich-text";

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
    headingField,
    richTextField,
    {
      type: "collapsible",
      label: {
        en: "More Options",
        es: "Más opciones",
      },
      fields: [elementIdField],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
