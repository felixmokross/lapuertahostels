import { Block } from "payload/types";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { makeOverlayTitleField } from "../fields/overlay-title";
import { makeMoreOptionsField } from "../fields/more-options";
import { imageField } from "../fields/image";

export const SlidesBlock: Block = {
  slug: "Slides",
  labels: {
    singular: {
      en: "Slides",
      es: "Diapositivas",
    },
    plural: {
      en: "Slides",
      es: "Diapositivas",
    },
  },
  imageURL: "/assets/blocks/Slides.png",
  imageAltText:
    "Preview of the Slides block, showing an image with an overlay title, CTA, and controls to switch slides.",
  fields: [
    {
      name: "slides",
      label: {
        en: "Slides",
        es: "Diapositivas",
      },
      labels: {
        singular: {
          en: "Slide",
          es: "Diapositiva",
        },
        plural: {
          en: "Slides",
          es: "Diapositivas",
        },
      },
      type: "array",
      required: true,
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: "name",
          label: {
            en: "Name",
            es: "Nombre",
          },
          type: "text",
          required: true,
          admin: {
            description: {
              en: "Give the slide a name to identify it in the list. This name is not shown to the user.",
              es: "Dale a la diapositiva un nombre para identificarla en la lista. Este nombre no se muestra al usuario.",
            },
          },
        },
        imageField,
        {
          // TODO consider to support this in other blocks/groups as well and add more values (together with imageField?)
          name: "imageAlignment",
          label: {
            en: "Image Alignment",
            es: "Alineación de la imagen",
          },
          type: "radio",
          options: [
            { value: "center", label: { en: "Center", es: "Centro" } },
            { value: "bottom", label: { en: "Bottom", es: "Abajo" } },
          ],
          defaultValue: "center",
          admin: {
            description: {
              en: "Depending on the user’s device or window size, the slide often has a different aspect ratio than the image. This setting defines how the image is aligned within the slide area.",
              es: "Dependiendo del dispositivo del usuario o del tamaño de la ventana, la diapositiva a menudo tiene una relación de aspecto diferente a la de la imagen. Este ajuste define cómo se alinea la imagen dentro del área de la diapositiva.",
            },
          },
        },
        makeOverlayTitleField({ optional: true }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.name,
        },
        description: {
          en: "You can use this either for a single hero image or a slideshow with multiple images. Each slide can have an overlay title and a call-to-action button. You can add up to six slides.",
          es: "Puedes usar esto para una sola imagen de héroe o una presentación de diapositivas con varias imágenes. Cada diapositiva puede tener un título superpuesto y un botón de call to action. Puedes agregar hasta seis diapositivas.",
        },
      },
    },
    makeMoreOptionsField({
      name: "autoplayIntervalInSeconds",
      type: "number",
      label: {
        en: "Autoplay Interval in Seconds",
        es: "Intervalo de reproducción automática en segundos",
      },
      defaultValue: 7,
      admin: {
        description: {
          en: "Depending on the amount of information in the slides (title, CTA), different intervals might be more suitable. The default value is 7 seconds.",
          es: "Dependiendo de la cantidad de información en las diapositivas (título, CTA), pueden ser más adecuados diferentes intervalos. El valor predeterminado es de 7 segundos.",
        },
      },
    }),
  ],
};
