import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { canManageContent } from "../common/access-control";
import { imageField } from "../fields/image";
import { Banners } from "./Banners";
import { Brand } from "payload/generated-types";
import { Texts } from "./Texts";
import { Links } from "./Links";

export const Brands: CollectionConfig = {
  slug: "brands",
  labels: {
    singular: {
      en: "Brand",
      es: "Marca",
    },
    plural: {
      en: "Brands",
      es: "Marcas",
    },
  },
  defaultSort: "homeLinkUrl",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "logo", "homeLinkUrl", "updatedAt"],
    listSearchableFields: ["name"],
  },
  access: {
    create: () => false,
    update: canManageContent,
    delete: () => false,
  },
  hooks: {
    afterChange: [
      ({ req }) =>
        cachePurgeHook(
          { type: "target", dataUrl: "brands", pageUrl: "/" },
          req,
        ),
    ],
  },
  fields: [
    {
      name: "id",
      label: {
        en: "ID",
        es: "ID",
      },
      type: "text",
      required: true,
    },
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
      },
    },
    {
      name: "homeLinkUrl",
      label: {
        en: "Home Link URL",
        es: "URL del enlace de inicio",
      },
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      ...imageField,
      name: "logo",
      label: {
        en: "Logo",
        es: "Logo",
      },
    },
    {
      name: "banner",
      label: {
        en: "Banner",
        es: "Banner",
      },
      type: "relationship",
      relationTo: Banners.slug,
      admin: {
        description: {
          en: "A banner is useful to announce promotions or important news and can have a call to action. It will be shown on all pages of the brand.",
          es: "Un banner es útil para anunciar promociones o noticias importantes y puede tener un call to action. Se mostrará en todas las páginas de la marca.",
        },
      },
    },
    {
      name: "navLinks",
      label: {
        en: "Navigation Links",
        es: "Enlaces de navegación",
      },
      type: "relationship",
      relationTo: Links.slug,
      hasMany: true,
    },
    {
      name: "footer",
      type: "group",
      fields: [
        {
          name: "linkGroups",
          label: {
            en: "Link Groups",
            es: "Grupos de enlaces",
          },
          labels: {
            singular: {
              en: "Link Group",
              es: "Grupo de enlaces",
            },
            plural: {
              en: "Link Groups",
              es: "Grupos de enlaces",
            },
          },
          type: "array",
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
                description: {
                  en: "The name is only used within the CMS to easily identify the link group.",
                  es: "El nombre solo se usa dentro del CMS para identificar fácilmente el grupo de enlaces.",
                },
              },
            },
            {
              name: "title",
              label: {
                en: "Title",
                es: "Título",
              },
              required: true,
              type: "relationship",
              relationTo: Texts.slug,
            },
            {
              name: "links",
              label: {
                en: "Links",
                es: "Enlaces",
              },
              type: "relationship",
              required: true,
              relationTo: Links.slug,
              hasMany: true,
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data }) =>
                (data as Brand["footer"]["linkGroups"][number]).name,
            },
          },
        },
      ],
    },
  ],
};
