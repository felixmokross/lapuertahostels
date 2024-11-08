import { CollectionConfig } from "payload/types";
import { linkField } from "../fields/link";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { pageIdToUrl } from "../common/page-urls";

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
  defaultSort: "title",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type"],
    listSearchableFields: ["title", "type"],
  },
  hooks: {
    afterChange: [({ req }) => cachePurgeHook({ type: "all-pages" }, req)],
  },
  fields: [
    ...linkField.fields.slice(1),
    {
      name: "title",
      label: {
        en: "Title (internal)",
        es: "Título (interno)",
      },
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
      localized: true,
      hooks: {
        beforeChange: [
          ({ data }) => {
            switch (data.type) {
              case "internal":
                return `${pageIdToUrl(data.page)}${data.queryString ? `?${data.queryString}` : ""}${data.fragment ? `#${data.fragment}` : ""}`;
              case "external":
                return `${data.url}`;
            }
          },
        ],
      },
      admin: {
        description: {
          en: "This field is generated automatically and is only used internally in the CMS to identity the text.",
          es: "Este campo se genera automáticamente y solo se usa internamente en el CMS para identificar el texto.",
        },
        position: "sidebar",
      },
    },
  ],
};
