import { Block } from "payload";
import { callToActionField } from "@/fields/call-to-action";
import {
  textField,
  richTextField,
  moreOptionsField,
  elementIdField,
} from "@fxmk/cms-plugin";

export const LeadTextBlock: Block = {
  slug: "LeadText",
  interfaceName: "LeadText",
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
    textField({
      name: "heading",
      label: { en: "Heading", es: "Título" },
      required: false,
    }),
    richTextField(),
    callToActionField({ optional: true, showByDefault: false }),
    moreOptionsField(elementIdField()),
  ],
};
