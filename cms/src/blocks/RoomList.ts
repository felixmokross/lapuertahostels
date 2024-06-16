import { Block } from "payload/types";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";
import { imageField } from "../fields/image";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";

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
  // imageURL: "/assets/blocks/Lead.png",
  // imageAltText: "Preview of the Lead block, showing a heading and a large text",
  fields: [
    {
      name: "rooms",
      type: "array",
      required: true,
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
      ],
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.heading,
        },
      },
    },
  ],
};
