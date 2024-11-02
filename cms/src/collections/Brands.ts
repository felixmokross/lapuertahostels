import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { canManageContent } from "../common/access-control";
import { linkField } from "../fields/link";
import { imageField } from "../fields/image";
import { Banners } from "./Banners";

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
    afterChange: [({ req }) => cachePurgeHook("brands", "/", req)],
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
      labels: {
        singular: {
          en: "Navigation Link",
          es: "Enlace de navegación",
        },
        plural: {
          en: "Navigation Links",
          es: "Enlaces de navegación",
        },
      },
      type: "array",
      fields: linkField.fields,
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.label,
        },
      },
    },
  ],
};
