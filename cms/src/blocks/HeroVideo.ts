import { Block } from "payload/types";
import { overlayTitleField } from "../fields/overlay-title";

export const HeroVideoBlock: Block = {
  slug: "HeroVideo",
  labels: {
    singular: {
      en: "Hero Video",
      es: "Video de Héroe",
    },
    plural: {
      en: "Hero Videos",
      es: "Videos de Héroe",
    },
  },
  imageURL: "/assets/blocks/HeroVideo.png",
  imageAltText:
    "Preview of the Hero Video block, showing a image with an overlay title and a CTA.",
  fields: [
    {
      name: "videoUrl",
      label: {
        en: "Video URL",
        es: "URL del Video",
      },
      type: "text",
      required: true,
    },
    {
      name: "previewUrl",
      label: {
        en: "Preview Image URL",
        es: "URL de la Imagen de Vista Previa",
      },
      type: "text",
    },
    {
      name: "showOverlayTitle",
      label: {
        en: "Show Overlay Title",
        es: "Mostrar Título con Superposición",
      },
      type: "checkbox",
    },
    {
      ...overlayTitleField,
      admin: { condition: (_, siblingData) => siblingData.showOverlayTitle },
    },
  ],
};
