import { CollectionConfig } from "payload/types";
import { makeCallToActionField } from "../fields/call-to-action";
import { refreshCacheForTarget } from "../common/frontend-cache";
import { Brands } from "./Brands";

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
  defaultSort: "message",
  admin: {
    useAsTitle: "message",
    defaultColumns: ["message"],
    listSearchableFields: ["message"],
    description: {
      en: "A banner is useful to announce promotions or important news and can have a call to action. Here you can create and manage banners. Go to Brands to enable a banner on all pages of the brand.",
      es: "Un banner es útil para anunciar promociones o noticias importantes y puede tener un call to action. Aquí puedes crear y gestionar banners. Ve a Marcas para habilitar un banner en todas las páginas de la marca.",
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        const brands = (
          await req.payload.find({
            collection: "brands",
            pagination: false,
            where: { banner: { equals: doc.id } },
          })
        ).docs;

        if (brands.length === 0) return;

        console.log(`Refreshing cache for ${brands.length} affected brands`);

        await Promise.allSettled(
          brands.map((b) =>
            refreshCacheForTarget({
              type: "purge-and-prime",
              pageUrl: b.homeLinkUrl,
              dataUrl: `${Brands.slug}/${b.id}`,
            }),
          ),
        );

        console.log(`Refreshed cache for affected brands`);
      },
    ],
  },
  fields: [
    {
      name: "message",
      label: {
        en: "Message",
        es: "Mensaje",
      },
      localized: true,
      type: "text",
    },
    makeCallToActionField({
      optional: true,
      variant: false,
    }),
  ],
};
