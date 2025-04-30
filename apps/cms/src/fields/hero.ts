import { BlocksField } from "payload";
import { HeroSlidesBlock } from "../blocks/hero-slides/config";
import { HeroVideoBlock } from "../blocks/hero-video/config";
import { HeroHeadingBlock } from "../blocks/hero-heading/config";

export const heroField: BlocksField = {
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
  blocks: [HeroSlidesBlock, HeroVideoBlock, HeroHeadingBlock],
  admin: {
    initCollapsed: true,
    description: {
      en: "A hero section is the first thing a user sees when they visit a page. Only one hero block can be added to a page. To replace the current hero block by a different block type, remove it and add a new one.",
      es: "Una sección de héroe es lo primero que ve un usuario cuando visita una página. Solo se puede añadir un bloque de héroe a una página. Para reemplazar el bloque de héroe actual por un tipo de bloque diferente, elimínalo y añade uno nuevo.",
    },
  },
};
