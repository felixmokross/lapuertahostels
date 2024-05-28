import { Block } from "payload/types";
import { overlayTitle } from "../fields/overlay-title";

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
  // imageURL: "/assets/blocks/Features.png",
  // imageAltText:
  //   "Preview of the Features block, showing an images with a short texts on the side, in alternating manner.",
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
      ...overlayTitle,
      admin: { condition: (_, siblingData) => siblingData.showOverlayTitle },
    },
  ],
};
