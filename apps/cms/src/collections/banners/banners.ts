import { CollectionConfig } from "payload";
import { refreshCacheHook } from "../../hooks/refresh-cache-hook";
import { getFullCollectionCacheKey } from "@/common/frontend-cache";
import { bannerUsagesField } from "./usages";
import { makeCallToAction2Field } from "@/fields/call-to-action-2";

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
    useAsTitle: "message",
    defaultColumns: ["message", "createdAt", "updatedAt"],
    listSearchableFields: ["id", "message"],
    description: {
      en: "A banner is useful to announce promotions or important news and can have a call to action. Here you can create and manage banners. Go to Brands to enable a banner on all pages of the brand.",
      es: "Un banner es útil para anunciar promociones o noticias importantes y puede tener un call to action. Aquí puedes crear y gestionar banners. Ve a Marcas para habilitar un banner en todas las páginas de la marca.",
    },
    components: {
      views: {
        edit: {
          translations: {
            Component:
              "src/collections/banners/translations-view#TranslationsView",
            path: "/translations",
            tab: {
              label: ({ t }) => t("custom:banners:translations"),
              href: "/translations",
            },
          },
        },
      },
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
              type: "text",
              localized: true,
            },
            makeCallToAction2Field({ optional: true, variant: false }),
          ],
        },

        {
          label: {
            en: "Usages",
            es: "Usos",
          },
          fields: [bannerUsagesField()],
        },
      ],
    },
  ],
};
