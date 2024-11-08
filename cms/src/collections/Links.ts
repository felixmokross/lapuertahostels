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
      name: "comment",
      type: "text",
      label: {
        en: "Comment",
        es: "Comentario",
      },
      admin: {
        position: "sidebar",
        description: {
          en: "Add a comment to make this link easier to find.",
          es: "Agrega un comentario para hacer que este enlace sea más fácil de encontrar.",
        },
      },
    },
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
            let url: string;
            switch (data.type) {
              case "internal":
                url = `${pageIdToUrl(data.page)}${data.queryString ? `?${data.queryString}` : ""}${data.fragment ? `#${data.fragment}` : ""}`;
                break;
              case "external":
                url = `${data.url}`;
                break;
            }

            return data.comment ? `${data.comment} (${url})` : url;
          },
        ],
      },
      admin: {
        description: {
          en: "This field is generated automatically and is only used internally in the CMS to identity the link.",
          es: "Este campo se genera automáticamente y solo se usa internamente en el CMS para identificar el enlace.",
        },
        position: "sidebar",
      },
    },
  ],
};
