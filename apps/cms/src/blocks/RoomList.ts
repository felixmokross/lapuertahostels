import { Block } from "payload";
import { imageField } from "../fields/image";
import { RowLabelProps } from "@/components/RowLabel";
import { headingField } from "@/fields/heading";
import { makeCallToActionField } from "@/fields/call-to-action";
import { richTextField } from "@/fields/rich-text";

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
        richTextField({ required: false }),
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
        makeCallToActionField(),
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
