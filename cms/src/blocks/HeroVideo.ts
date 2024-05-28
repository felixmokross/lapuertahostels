import { Block, Field } from "payload/types";
import { overlayTitleField } from "../fields/overlay-title";
import { mediaUrlFieldPlaceholder } from "../common/constants";

export const HeroVideoBlock: Block = {
  slug: "HeroVideo",
  labels: {
    singular: {
      en: "Hero Video",
      es: "Video de héroe",
    },
    plural: {
      en: "Hero Videos",
      es: "Videos de héroe",
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
      admin: {
        description: {
          en: "The video should be optimized for web pages before uploading it to ImageKit.",
          es: "El video debe estar optimizado para páginas web antes de subirlo a ImageKit.",
        },
        placeholder: mediaUrlFieldPlaceholder,
      },
    },
    {
      name: "previewUrl",
      label: {
        en: "Preview Image URL",
        es: "URL de la imagen de vista previa",
      },
      type: "text",
      admin: {
        description: {
          en: "The preview image is shown while the video is still loading. It should be the first frame of the video to provide a seamless transition. It needs to be uploaded separately to ImageKit.",
          es: "La imagen de vista previa se muestra mientras el video aún se está cargando. Debe ser el primer fotograma del video para proporcionar una transición sin interrupciones. Debe subirse por separado a ImageKit.",
        },
        placeholder: mediaUrlFieldPlaceholder,
      },
    },
    {
      name: "showOverlayTitle",
      label: {
        en: "Show Overlay Title",
        es: "Mostrar título superpuesto",
      },
      type: "checkbox",
    },
    {
      ...overlayTitleField,
      admin: {
        ...overlayTitleField.admin,
        condition: (_, siblingData) => siblingData.showOverlayTitle,
      },
    } as Field,
  ],
};
