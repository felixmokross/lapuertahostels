import { GlobalConfig } from "payload/types";

export const Common: GlobalConfig = {
  slug: "common",
  access: { read: () => true },
  fields: [
    {
      name: "banner",
      type: "group",
      fields: [
        {
          name: "message",
          type: "text",
        },
        {
          name: "cta",
          type: "text",
        },
        {
          name: "ctaUrl",
          type: "text",
        },
      ],
    },
  ],
};
