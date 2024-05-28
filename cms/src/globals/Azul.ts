import { GlobalConfig } from "payload/types";
import { LeadBlock } from "../blocks/Lead";
import { AccommodationSelectorBlock } from "../blocks/AccommodationSelector";
import { ImageWithFloatingTextBlock } from "../blocks/ImageWithFloatingText";
import { StoryBlock } from "../blocks/Story";
import { FeaturesBlock } from "../blocks/Features";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";
import { SlidesBlock } from "../blocks/Slides";
import { HeroVideoBlock } from "../blocks/HeroVideo";

export const Azul: GlobalConfig = {
  slug: "azul",
  label: {
    en: "Azul",
    es: "Azul",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [makeCachePurgeHook("globals/azul", "/azul")],
  },
  fields: [
    {
      name: "hero",
      label: {
        en: "Hero",
        es: "Héroe",
      },
      labels: {
        singular: {
          en: "Hero",
          es: "Héroe",
        },
        plural: {
          en: "Heroes",
          es: "Héroes",
        },
      },
      type: "blocks",
      minRows: 0,
      maxRows: 1,
      blocks: [SlidesBlock, HeroVideoBlock],
      admin: {
        initCollapsed: true,
      },
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
  custom: {
    route: "/azul",
  },
};
