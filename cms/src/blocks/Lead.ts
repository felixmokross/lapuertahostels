import { Block } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";
import { makeMoreOptionsField } from "../fields/more-options";
import { makeCallToActionField } from "../fields/call-to-action";

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
    { ...headingField, required: false },
    makeRichTextField(),
    makeCallToActionField({ optional: true, showByDefault: false }),
    makeMoreOptionsField(elementIdField),
  ],
};
