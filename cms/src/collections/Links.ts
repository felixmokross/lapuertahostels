import { CollectionConfig } from "payload";
import {
  refreshCacheForAllBrands,
  refreshCacheForGlobals,
  refreshCacheForPages,
} from "../hooks/cache-purge-hook";
import { validateUrl } from "../common/validation";
import {
  getUniqueCollectionItemIds,
  getUniqueGlobals,
  usagesField,
} from "@/fields/usages";

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
  defaultPopulate: {
    type: true,
    url: true,
    newPage: true,
    queryString: true,
    fragment: true,
    title: true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type"],
    listSearchableFields: ["title", "type"],
  },
  hooks: {
    afterChange: [
      async ({ req, doc }) => {
        const globals = getUniqueGlobals(doc.usages);
        if (globals.length > 0) {
          console.log(`Refreshing cache for globals: ${globals.join(", ")}`);
          await refreshCacheForGlobals(globals, req);
        }

        const bannerIds = getUniqueCollectionItemIds(doc.usages, "banners");
        const brandIds = getUniqueCollectionItemIds(doc.usages, "brands");

        if (brandIds.length > 0 || bannerIds.length > 0) {
          // banners are inlined into brands, therefore banners and brands both use the 'all brands' cache key
          console.log(`Refreshing cache for all brands`);
          await refreshCacheForAllBrands(req);
        }

        const pageIds = getUniqueCollectionItemIds(doc.usages, "new-pages");
        if (pageIds.length > 0) {
          console.log(`Refreshing cache for ${pageIds.length} pages`);
          await refreshCacheForPages(pageIds, req);
        }
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Edit",
            es: "Editar",
          },
          fields: [
            {
              name: "newPage",
              label: {
                en: "Page",
                es: "Página",
              },
              type: "relationship",
              relationTo: "new-pages",
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.type === "internal",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "queryString",
                  label: {
                    en: "Query String",
                    es: "Cadena de consulta",
                  },
                  type: "text",
                  admin: {
                    width: "50%",
                    description: {
                      en: "If a query string is provided, it will be appended to the URL with a '?' character.",
                      es: "Si se proporciona una cadena de consulta, se añadirá a la URL con un carácter '?'.",
                    },
                    condition: (_, siblingData) =>
                      siblingData.type === "internal",
                  },
                },
                {
                  name: "fragment",
                  label: {
                    en: "Fragment",
                    es: "Fragmento",
                  },
                  type: "text",
                  admin: {
                    width: "50%",
                    description: {
                      en: "If a fragment is provided, it will be appended to the URL with a '#' character. Use this to link to a section of a page, defined by an 'Element ID'.",
                      es: "Si se proporciona un fragmento, se añadirá a la URL con un carácter '#'. Úsalo para enlazar a una sección de una página, definida por un 'ID de elemento'.",
                    },
                    condition: (_, siblingData) =>
                      siblingData.type === "internal",
                  },
                },
              ],
            },
            {
              name: "url",
              label: {
                en: "URL",
                es: "URL",
              },
              type: "text",
              required: true,
              validate: validateUrl,
              admin: {
                condition: (_, siblingData) => siblingData.type === "external",
              },
            },
          ],
        },

        {
          label: {
            en: "Usages",
            es: "Usos",
          },
          fields: [
            usagesField("relationship", "links", {
              collections: ["new-pages", "banners", "brands"],
              globals: ["common"],
            }),
          ],
        },
      ],
    },

    {
      name: "type",
      label: {
        en: "Type",
        es: "Tipo",
      },
      type: "radio",
      required: true,
      defaultValue: "internal",
      options: [
        {
          label: {
            en: "Internal",
            es: "Interno",
          },
          value: "internal",
        },
        {
          label: {
            en: "External",
            es: "Externo",
          },
          value: "external",
        },
      ],
      admin: {
        position: "sidebar",
        description: {
          en: "Use 'internal' to link to a page within the site. 'External' allows you to enter a URL.",
          es: "Usa 'interno' para enlazar a una página dentro del sitio. 'Externo' te permite introducir una URL.",
        },
      },
    },

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
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (!data) throw new Error("Data is missing.");

            let url: string = "";
            switch (data.type) {
              case "internal":
                const page = await req.payload.findByID({
                  collection: "new-pages",
                  id: data.newPage,
                });
                url = `${page.pathname}${data.queryString ? `?${data.queryString}` : ""}${data.fragment ? `#${data.fragment}` : ""}`;
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
          en: "This field is generated automatically and is only used internally in the CMS to identify the link.",
          es: "Este campo se genera automáticamente y solo se usa internamente en el CMS para identificar el enlace.",
        },
        position: "sidebar",
      },
    },
  ],
};
