import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { canManageContent } from "../common/access-control";
import { linkField } from "../fields/link";
import { imageField } from "../fields/image";

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
