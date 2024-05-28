import { Field } from "payload/types";
import { SlidesBlock } from "../blocks/Slides";
import { HeroVideoBlock } from "../blocks/HeroVideo";

export const heroField: Field = {
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
};
