import { Block } from "payload/types";
import { mediaUrlFieldPlaceholder } from "../common/constants";
import { makeOverlayTitleField } from "../fields/overlay-title";
import { imageUrlField } from "../fields/image";
import { validateUrl } from "../common/validation";

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
      validate: validateUrl,
      admin: {
        description: {
          en: "The video should be optimized for web pages before uploading it to ImageKit.",
          es: "El video debe estar optimizado para páginas web antes de subirlo a ImageKit.",
        },
        placeholder: mediaUrlFieldPlaceholder,
      },
    },
    {
      ...imageUrlField,
      name: "previewUrl",
      label: {
        en: "Preview Image URL",
        es: "URL de la imagen de vista previa",
      },
      admin: {
        ...imageUrlField.admin,
        description: {
          en: "The preview image is shown while the video is still loading. It should be the first frame of the video to provide a seamless transition. It needs to be uploaded separately to ImageKit.",
          es: "La imagen de vista previa se muestra mientras el video aún se está cargando. Debe ser el primer fotograma del video para proporcionar una transición sin interrupciones. Debe subirse por separado a ImageKit.",
        },
      },
    },
    makeOverlayTitleField({ optional: true }),
  ],
};
