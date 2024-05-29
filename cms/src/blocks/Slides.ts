import { Block } from "payload/types";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { imageField } from "../fields/image";
import { makeOverlayTitleField } from "../fields/overlay-title";

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
        {
          ...imageField,
          fields: [
            ...imageField.fields,
            {
              // TODO consider to support this in other blocks/groups as well and add more values (together with imageField?)
              name: "alignment",
              label: {
                en: "Alignment",
                es: "Alineación",
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
          ],
        },
        makeOverlayTitleField({ optional: true }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.name,
        },
        description: {
          en: "When the user visits the page, the slides are automatically displayed in a loop. The user can also switch slides using the controls. You can add up to six slides.",
          es: "Cuando el usuario visita la página, las diapositivas se muestran automáticamente en un bucle. El usuario también puede cambiar las diapositivas utilizando los controles. Puedes añadir hasta seis diapositivas.",
        },
      },
    },
  ],
};
