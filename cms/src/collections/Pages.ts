import { CollectionConfig } from "payload/types";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";
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
    // TODO improve this
    afterChange: [
      (args) => makeCachePurgeHook(`pages/${args.doc.id}`, args.doc.url)(args),
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
