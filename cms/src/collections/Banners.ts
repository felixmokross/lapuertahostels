import { CollectionConfig } from "payload";
import { refreshCacheHook } from "../hooks/refresh-cache-hook";
import { makeCallToActionField } from "../fields/call-to-action";
import { getFullCollectionCacheKey } from "@/common/frontend-cache";

export const Banners: CollectionConfig = {
  slug: "banners",
  labels: {
    singular: {
      en: "Banner",
      es: "Banner",
    },
    plural: {
      en: "Banners",
      es: "Banners",
    },
  },
  defaultSort: "message.text",
  defaultPopulate: {
    message: true,
    cta: true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "message"],
    listSearchableFields: ["message.text"],
    description: {
      en: "A banner is useful to announce promotions or important news and can have a call to action. Here you can create and manage banners. Go to Brands to enable a banner on all pages of the brand.",
      es: "Un banner es útil para anunciar promociones o noticias importantes y puede tener un call to action. Aquí puedes crear y gestionar banners. Ve a Marcas para habilitar un banner en todas las páginas de la marca.",
    },
  },
  hooks: {
    afterChange: [
      refreshCacheHook({
        cacheKey: getFullCollectionCacheKey("brands"),
        pageUrl: "/",
      }),
    ],
  },
  fields: [
    // TODO auto-generate title field like we have for other collections – but not sure how to handle the locales
    {
      name: "name",
      label: {
        en: "Name",
        es: "Nombre",
      },
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
        description: {
          en: "The name is only used within the CMS to easily identify the banner.",
          es: "El nombre solo se usa dentro del CMS para identificar fácilmente el banner.",
        },
      },
    },

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
              name: "message",
              label: {
                en: "Message",
                es: "Mensaje",
              },
              required: true,
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "plainText" },
              },
            },
            makeCallToActionField({ optional: true, variant: false }),
          ],
        },

        {
          label: {
            en: "Usages",
            es: "Usos",
          },
          fields: [
            {
              name: "brands",
              label: {
                en: "Brands",
                es: "Marcas",
              },
              type: "join",
              collection: "brands",
              on: "banner",
            },
          ],
        },
      ],
    },
  ],
};
