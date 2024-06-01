import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cachePurgeHook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";
import { text } from "payload/dist/fields/validations";

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
    useAsTitle: "url",
  },
  access: {
    read: () => true,
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
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "url",
      label: {
        en: "URL",
        es: "URL",
      },
      type: "text",
      required: true,
      validate: (_, args) =>
        text(args.data._id ? idToUrl(args.data._id) : "", args),
      access: {
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            data._id = data.url ? urlToId(data.url as string) : "";

            // ensures data is not stored in DB
            delete data["url"];
          },
        ],
        afterRead: [
          ({ data }) => {
            return idToUrl(data.id as string);
          },
        ],
      },
      admin: {
        position: "sidebar",
      },
    },
    heroField,
    layoutField,
  ],
};

function idToUrl(id: string) {
  return id.replace(":", "/");
}

function urlToId(url: string) {
  return url.replace("/", ":");
}
