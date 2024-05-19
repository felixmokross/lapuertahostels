import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { CollectionConfig } from "payload/types";

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
  admin: {
    useAsTitle: "id",
  },
  access: {
    read: () => true,
    create: () => false,
    delete: () => false,
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
    },
    {
      name: "homeLinkUrl",
      label: {
        en: "Home Link URL",
        es: "URL del enlace de inicio",
      },
      type: "text",
      required: true,
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
      fields: [
        {
          name: "url",
          label: {
            en: "URL",
            es: "URL",
          },
          type: "text",
          required: true,
        },
        {
          name: "label",
          label: {
            en: "Label",
            es: "Etiqueta",
          },
          type: "text",
          required: true,
          localized: true,
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.label,
        },
      },
    },
    {
      name: "logoUrl",
      label: {
        en: "Logo URL",
        es: "URL del logo",
      },
      type: "text",
      required: true,
    },
  ],
};
