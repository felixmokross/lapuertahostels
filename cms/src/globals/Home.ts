import { GlobalConfig } from "payload/types";
import { slidesField } from "../fields/slides";
import { StoryBlock } from "../blocks/Story";
import { ImageWithFloatingTextBlock } from "../blocks/ImageWithFloatingText";
import { AccommodationSelectorBlock } from "../blocks/AccommodationSelector";
import { LeadBlock } from "../blocks/Lead";
import { FeaturesBlock } from "../blocks/Features";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";

export const Home: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [makeCachePurgeHook("globals/home")],
  },
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
        LeadBlock,
        AccommodationSelectorBlock,
        ImageWithFloatingTextBlock,
        StoryBlock,
        FeaturesBlock,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};
