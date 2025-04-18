import { CollectionConfig } from "payload";
import { refreshCacheHook } from "../../hooks/refresh-cache-hook";
import { getFullCollectionCacheKey } from "@/common/frontend-cache";
import { bannerUsagesField } from "./usages";
import { makeCallToActionField } from "@/fields/call-to-action";
import { textField } from "@/fields/text";

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
            textField({
              name: "message",
              label: {
                en: "Message",
                es: "Mensaje",
              },
            }),
            makeCallToActionField({ optional: true, variant: false }),
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
