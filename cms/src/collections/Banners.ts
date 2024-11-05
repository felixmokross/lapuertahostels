import { CollectionConfig } from "payload/types";
import { Brands } from "./Brands";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { Texts } from "./Texts";
import { Links } from "./Links";

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
  defaultSort: "name",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "message"],
    listSearchableFields: ["name"],
    description: {
      en: "A banner is useful to announce promotions or important news and can have a call to action. Here you can create and manage banners. Go to Brands to enable a banner on all pages of the brand.",
      es: "Un banner es útil para anunciar promociones o noticias importantes y puede tener un call to action. Aquí puedes crear y gestionar banners. Ve a Marcas para habilitar un banner en todas las páginas de la marca.",
    },
  },
  hooks: {
    afterChange: [
      async ({ req }) => {
        console.log(`Refreshing cache for brands`);

        await cachePurgeHook(
          { type: "target", dataUrl: Brands.slug, pageUrl: "/" },
          req,
        );

        console.log(`Refreshed cache for brands`);
      },
    ],
  },
  fields: [
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
      name: "message",
      label: {
        en: "Message",
        es: "Mensaje",
      },
      required: true,
      type: "relationship",
      relationTo: Texts.slug,
    },
    {
      name: "cta",
      label: {
        en: "Call to Action (CTA)",
        es: "Call to Action (CTA)",
      },
      type: "relationship",
      relationTo: Links.slug,
    },
  ],
};
