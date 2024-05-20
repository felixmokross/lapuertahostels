import { slateEditor } from "@payloadcms/richtext-slate";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { GlobalConfig } from "payload/types";
import { slidesField } from "../fields/slides";
import { StoryBlock } from "../blocks/Story";
import { ImageWithFloatingTextBlock } from "../blocks/ImageWithFloatingText";
import { AccommodationSelectorBlock } from "../blocks/AccommodationSelector";

export const Home: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  access: { read: () => true },
  fields: [
    slidesField,
    {
      name: "slideCta",
      label: {
        en: "Slide CTA",
        es: "CTA de Diapositiva",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "intro",
      label: {
        en: "Intro",
        es: "Introducción",
      },
      type: "group",
      fields: [
        {
          name: "heading",
          label: {
            en: "Heading",
            es: "Título",
          },
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "text",
          label: {
            en: "Text",
            es: "Texto",
          },
          type: "richText",
          required: true,
          localized: true,
          editor: slateEditor({
            admin: {
              elements: [],
              leaves: ["bold"],
            },
          }),
        },
      ],
    },
    {
      name: "layout",
      label: {
        en: "Layout",
        es: "Diseño",
      },
      labels: {
        singular: {
          en: "Block",
          es: "Bloque",
        },
        plural: {
          en: "Blocks",
          es: "Bloques",
        },
      },
      type: "blocks",
      minRows: 0,
      maxRows: 20,
      blocks: [
        AccommodationSelectorBlock,
        ImageWithFloatingTextBlock,
        StoryBlock,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
