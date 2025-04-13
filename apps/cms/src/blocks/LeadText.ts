import { Block } from "payload";
import { elementIdField } from "../fields/element-id";
import { makeMoreOptionsField } from "../fields/more-options";
import { makeRichTextField } from "../fields/rich-text";
import { makeCallToAction2Field } from "@/fields/call-to-action-2";
import { heading2Field } from "@/fields/heading2";

export const LeadTextBlock: Block = {
  slug: "LeadText",
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
    { ...heading2Field, required: false },
    makeRichTextField(),
    makeCallToAction2Field({ optional: true, showByDefault: false }),
    makeMoreOptionsField(elementIdField),
  ],
};
