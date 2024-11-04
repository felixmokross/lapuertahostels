import { CollectionConfig } from "payload/types";
import { makeCallToActionField } from "../fields/call-to-action";
import { Brands } from "./Brands";
import { cachePurgeHook } from "../hooks/cache-purge-hook";

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
      async ({ req }) => {
        console.log(`Refreshing cache for brands`);

        cachePurgeHook(
          { type: "target", dataUrl: Brands.slug, pageUrl: "/" },
          req,
        );

        console.log(`Refreshed cache for brands`);
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
      required: true,
      type: "text",
    },
    makeCallToActionField({
      optional: true,
      variant: false,
    }),
  ],
};
