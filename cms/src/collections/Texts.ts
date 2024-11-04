import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";

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
    afterChange: [({ req }) => cachePurgeHook({ type: "all-pages" }, req)],
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
