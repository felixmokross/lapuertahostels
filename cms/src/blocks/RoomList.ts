import { Block } from "payload/types";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { makeCallToActionField } from "../fields/call-to-action";
import { imageField } from "../fields/image";

const ctaTemplateField = makeCallToActionField({
  isTemplate: true,
  optional: true,
});

export const RoomListBlock: Block = {
  slug: "RoomList",
  labels: {
    singular: {
      en: "Room List",
      es: "Lista de habitaciones",
    },
    plural: {
      en: "Room Lists",
      es: "Listas de habitaciones",
    },
  },
  imageURL: "/assets/blocks/RoomList.png",
  imageAltText:
    "Preview of the Room List block, showing three room cards which each have title, images, a description, and a CTA button.",
  fields: [
    {
      name: "rooms",
      type: "array",
      required: true,
      label: {
        en: "Rooms",
        es: "Habitaciones",
      },
      labels: {
        singular: {
          en: "Room",
          es: "Habitación",
        },
        plural: {
          en: "Rooms",
          es: "Habitaciones",
        },
      },
      minRows: 1,
      fields: [
        headingField,
        makeRichTextField({ optional: true }),
        {
          name: "images",
          type: "array",
          required: true,
          labels: {
            singular: {
              en: "Image",
              es: "Imagen",
            },
            plural: {
              en: "Images",
              es: "Imágenes",
            },
          },
          minRows: 1,
          fields: [
            imageField,
            {
              name: "caption",
              type: "text",
              label: {
                en: "Caption",
                es: "Pie de foto",
              },
              localized: true,
            },
          ],
        },
        {
          name: "ctaUrl",
          label: {
            en: "Call to Action URL",
            es: "URL de Call to Action",
          },
          type: "text",
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.heading,
        },
      },
    },
    {
      ...ctaTemplateField,
      admin: {
        ...ctaTemplateField.admin,
        description: {
          en: "If enabled, shows a Call to Action button on each room card. The button text and variant will be the same for each card. The URL is defined for each room individually.",
          es: "Si está habilitado, muestra un botón de Call to Action en cada tarjeta de habitación. El texto y la variante del botón serán los mismos para cada tarjeta. La URL se define para cada habitación individualmente.",
        },
      },
    },
  ],
};
