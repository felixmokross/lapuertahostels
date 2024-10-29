import { Block } from "payload/types";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { imageField } from "../fields/image";
import { makeCallToActionField } from "../fields/call-to-action";

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
        makeCallToActionField(),
      ],
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.heading,
        },
      },
    },
  ],
};
