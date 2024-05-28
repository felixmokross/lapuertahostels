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
    description: {
      en: "A hero section is the first thing a user sees when they visit a page. It is used to set the tone and provide a visual introduction to the content of the page.",
      es: "Una sección de héroe es lo primero que ve un usuario cuando visita una página. Se utiliza para establecer el tono y proporcionar una introducción visual al contenido de la página.",
    },
  },
};
