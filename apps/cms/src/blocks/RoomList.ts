import { Block } from "payload";
import { imageField } from "../fields/image";
import { makeRichTextField } from "../fields/rich-text";
import { RowLabelProps } from "@/components/RowLabel";
import { heading2Field } from "@/fields/heading2";
import { makeCallToAction2Field } from "@/fields/call-to-action-2";

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
        heading2Field,
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
              localized: true,
              label: {
                en: "Caption",
                es: "Pie de foto",
              },
            },
          ],
        },
        makeCallToAction2Field(),
      ],
      admin: {
        components: {
          RowLabel: {
            path: "/src/components/RowLabel",
            exportName: "RowLabel",
            clientProps: {
              textProp: "heading",
              fallbackLabelKey: "custom:roomList:roomRowLabel",
            } as RowLabelProps,
          },
        },
      },
    },
  ],
};
