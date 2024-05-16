import { slateEditor } from "@payloadcms/richtext-slate";
import { CollectionConfig } from "payload/types";

export const CarouselItems: CollectionConfig = {
  slug: "carouselItems",
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "title",
      type: "richText",
      editor: slateEditor({
        admin: {
          elements: [],
          leaves: ["bold"],
        },
      }),
      required: true,
      localized: true,
    },
    {
      name: "titlePosition",
      type: "select",
      options: [
        "center",
        "top-left",
        "top-right",
        "bottom-right",
        "bottom-left",
      ],
    },
    {
      name: "imageUrl",
      type: "text",
      required: true,
    },
    {
      name: "imageAlt",
      type: "text",
      required: true,
    },
    {
      name: "ctaUrl",
      type: "text",
      required: true,
    },
  ],
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "titlePosition", "imageAlt", "ctaUrl"],
  },
};
