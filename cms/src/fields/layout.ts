import { BlockField } from "payload/types";
import { AccommodationSelectorBlock } from "../blocks/AccommodationSelector";
import { FeaturesBlock } from "../blocks/Features";
import { ImageWithFloatingTextBlock } from "../blocks/ImageWithFloatingText";
import { LeadBlock } from "../blocks/Lead";
import { StoryBlock } from "../blocks/Story";

export const layoutField: BlockField = {
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
};
