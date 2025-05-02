import { BlocksField } from "payload";
import { AccommodationSelectorBlock } from "../blocks/accommodation-selector/config";
import { FeaturesBlock } from "../blocks/features/config";
import { ImageWithFloatingTextBlock } from "../blocks/image-with-floating-text/config";
import { LeadTextBlock } from "../blocks/lead-text/config";
import { StoryBlock } from "../blocks/story/config";
import { SeparatorBlock } from "../blocks/separator/config";
import { WideImageBlock } from "../blocks/wide-image/config";
import { RoomListBlock } from "../blocks/room-list/config";
import { TextColumnsWithImagesBlock } from "../blocks/text-columns-with-images/config";
import { MapBlock } from "@/blocks/map/config";
import { testimonialsBlock } from "@/blocks/testimonials/config";

export const contentField: BlocksField = {
  name: "content",
  label: {
    en: "Content",
    es: "Contenido",
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
    LeadTextBlock,
    AccommodationSelectorBlock,
    ImageWithFloatingTextBlock,
    StoryBlock,
    FeaturesBlock,
    SeparatorBlock,
    WideImageBlock,
    RoomListBlock,
    TextColumnsWithImagesBlock,
    MapBlock,
    testimonialsBlock,
  ],
  admin: {
    initCollapsed: true,
    description: {
      en: "Add blocks to fill the page with content. You can reorder the blocks by dragging and dropping them using the handle on the left side.",
      es: "Agrega bloques para llenar la página con contenido. Puedes reordenar los bloques arrastrándolos y soltándolos usando la manija en el lado izquierdo.",
    },
  },
};
