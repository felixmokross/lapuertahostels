import { Block, TextField } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { headingField } from "../fields/heading";
import { richTextField } from "../fields/rich-text";
import { makeMoreOptionsField } from "../fields/more-options";

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
  fields: [headingField, richTextField, makeMoreOptionsField(elementIdField)],
};
