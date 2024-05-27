import { GlobalConfig } from "payload/types";
import { StoryBlock } from "../blocks/Story";
import { ImageWithFloatingTextBlock } from "../blocks/ImageWithFloatingText";
import { AccommodationSelectorBlock } from "../blocks/AccommodationSelector";
import { LeadBlock } from "../blocks/Lead";
import { FeaturesBlock } from "../blocks/Features";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";
import { SlidesBlock } from "../blocks/Slides";
import { HeroVideoBlock } from "../blocks/HeroVideo";

export const Home: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [makeCachePurgeHook("globals/home", "/")],
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
};
