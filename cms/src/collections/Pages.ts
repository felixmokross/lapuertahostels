import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cachePurgeHook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: {
      en: "Page",
      es: "Página",
    },
    plural: {
      en: "Pages",
      es: "Páginas",
    },
  },
  admin: {
    useAsTitle: "id",
  },
  access: {
    read: () => true,
    create: () => false,
    delete: () => false,
  },
  hooks: {
    afterChange: [
      ({ doc, req }) => cachePurgeHook(`pages/${doc.id}`, doc.url, req),
    ],
  },
  fields: [
    {
      name: "id",
      label: {
        en: "ID",
        es: "ID",
      },
      type: "text",
      required: true,
    },
    {
      name: "url",
      label: {
        en: "URL",
        es: "URL",
      },
      type: "text",
      required: true,
    },
    heroField,
    layoutField,
  ],
};
