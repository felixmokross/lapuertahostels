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
          localized: true,
          type: "text",
        },
        {
          name: "cta",
          localized: true,
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