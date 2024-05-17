import { slateEditor } from "@payloadcms/richtext-slate";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { GlobalConfig } from "payload/types";

export const Home: GlobalConfig = {
  slug: "home",
  access: { read: () => true },
  fields: [
    {
      name: "slides",
      type: "array",
      required: true,
      maxRows: 6,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
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
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.name || `Slide ${String(index).padStart(2, "0")}`;
          },
        },
      },
    },
    {
      name: "slideCta",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "intro",
      type: "group",
      fields: [
        {
          name: "heading",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "text",
          type: "richText",
          required: true,
          localized: true,
          editor: slateEditor({
            admin: {
              elements: [],
              leaves: ["bold"],
            },
          }),
        },
      ],
    },
  ],
};
