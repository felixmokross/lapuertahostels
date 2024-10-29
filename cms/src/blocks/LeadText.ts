import { Block } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";
import { makeMoreOptionsField } from "../fields/more-options";
import { makeCallToActionField } from "../fields/call-to-action";

export const LeadTextBlock: Block = {
  slug: "Lead",
  labels: {
    singular: {
      en: "Lead Text",
      es: "Texto de introducción",
    },
    plural: {
      en: "Lead Texts",
      es: "Textos de introducción",
    },
  },
  imageURL: "/assets/blocks/LeadText.png",
  imageAltText:
    "Preview of the Lead Text block, showing a heading and a large text",
  fields: [
    { ...headingField, required: false },
    makeRichTextField(),
    makeCallToActionField({ optional: true, showByDefault: false }),
    makeMoreOptionsField(elementIdField),
  ],
};
