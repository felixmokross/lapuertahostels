import { CollectionConfig } from "payload/types";
import { refreshCacheForAllPages } from "../common/frontend-cache";
import { linkField } from "../fields/link";
import { Texts } from "./Texts";

export const Links: CollectionConfig = {
  slug: "links",
  labels: {
    singular: {
      en: "Link",
      es: "Enlace",
    },
    plural: {
      en: "Links",
      es: "Enlaces",
    },
  },
  defaultSort: "name",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "label", "type", "page", "url"],
    listSearchableFields: ["name"],
  },
  hooks: {
    afterChange: [({ req }) => refreshCacheForAllPages(req, "purge-and-prime")],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: {
        en: "Name",
        es: "Nombre",
      },
      required: true,
      admin: {
        position: "sidebar",
        description: {
          en: "The name is only used within the CMS to easily identify the link.",
          es: "El nombre solo se usa dentro del CMS para identificar fácilmente el enlace.",
        },
      },
    },
    {
      name: "label",
      label: {
        en: "Label",
        es: "Etiqueta",
      },
      type: "relationship",
      relationTo: Texts.slug,
      required: true,
    },
    ...linkField.fields.slice(1),
  ],
};
