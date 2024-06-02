import { BlockField } from "payload/types";
import { AccommodationSelectorBlock } from "../blocks/AccommodationSelector";
import { FeaturesBlock } from "../blocks/Features";
import { ImageWithFloatingTextBlock } from "../blocks/ImageWithFloatingText";
import { LeadBlock } from "../blocks/Lead";
import { StoryBlock } from "../blocks/Story";
import { SeparatorBlock } from "../blocks/Separator";
import { WideImageBlock } from "../blocks/WideImage";

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
    SeparatorBlock,
    WideImageBlock,
  ],
  admin: {
    initCollapsed: true,
    description: {
      en: "Add blocks to create the layout of the page. You can reorder the blocks by dragging and dropping them using the handle on the left side.",
      es: "Agrega bloques para crear el diseño de la página. Puedes reordenar los bloques arrastrándolos y soltándolos usando la manija en el lado izquierdo.",
    },
  },
};
