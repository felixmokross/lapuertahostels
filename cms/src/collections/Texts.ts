import { CollectionConfig } from "payload/types";
import { refreshCacheForAllPages } from "../common/frontend-cache";

export const Texts: CollectionConfig = {
  slug: "texts",
  labels: {
    singular: {
      en: "Text",
      es: "Texto",
    },
    plural: {
      en: "Texts",
      es: "Textos",
    },
  },
  defaultSort: "text",
  admin: {
    useAsTitle: "text",
    defaultColumns: ["text", "createdAt", "updatedAt"],
    listSearchableFields: ["text"],
  },
  hooks: {
    afterChange: [({ req }) => refreshCacheForAllPages(req, "purge-and-prime")],
  },
  fields: [
    {
      name: "text",
      type: "text",
      label: {
        en: "Text",
        es: "Texto",
      },
      localized: true,
      required: true,
    },
  ],
};
