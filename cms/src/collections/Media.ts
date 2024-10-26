import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: {
      en: "Media",
      es: "Medio",
    },
    plural: {
      en: "Media",
      es: "Medios",
    },
  },
  upload: {
    staticURL: "/media",
    disableLocalStorage: true,
  },
  fields: [],
};
