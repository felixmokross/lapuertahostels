import { Block } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { makeMoreOptionsField } from "../fields/more-options";
import { makeNewRichTextField } from "../fields/new-rich-text";
import { makeNewCallToActionField } from "../fields/new-call-to-action";
import { newHeadingField } from "../fields/new-heading";

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
    { ...newHeadingField, required: false },
    makeNewRichTextField(),
    makeNewCallToActionField({ optional: true, showByDefault: false }),
    makeMoreOptionsField(elementIdField),
  ],
};
