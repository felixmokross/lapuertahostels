import { GlobalConfig } from "payload/types";

export const Home: GlobalConfig = {
  slug: "home",
  access: { read: () => true },
  fields: [
    {
      name: "hero",
      type: "relationship",
      required: true,
      maxRows: 6,
      relationTo: "carouselItems",
      hasMany: true,
    },
  ],
};
