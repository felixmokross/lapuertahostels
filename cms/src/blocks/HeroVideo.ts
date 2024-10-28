import { Block } from "payload/types";
import { makeOverlayTitleField } from "../fields/overlay-title";
import { makeImageField } from "../fields/image";
import { Media } from "../collections/Media";

const optionalImageField = makeImageField({ optional: true });

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
      name: "video",
      label: {
        en: "Video",
        es: "Video",
      },
      type: "upload",
      relationTo: Media.slug,
      filterOptions: {
        mimeType: { contains: "video/" },
      },
      required: true,
      admin: {
        description: {
          en: "The video should be optimized for web pages before uploading it.",
          es: "El video debe estar optimizado para páginas web antes de subirlo.",
        },
      },
    },
    {
      ...optionalImageField,
      name: "previewImage",
      label: {
        en: "Preview Image",
        es: "Imagen de vista previa",
      },
      admin: {
        ...optionalImageField.admin,
        description: {
          en: "The preview image is shown while the video is still loading. It should be the first frame of the video to provide a seamless transition. It needs to be uploaded separately.",
          es: "La imagen de vista previa se muestra mientras el video aún se está cargando. Debe ser el primer fotograma del video para proporcionar una transición sin interrupciones. Debe subirse por separado.",
        },
      },
    },
    makeOverlayTitleField({ optional: true }),
  ],
};
