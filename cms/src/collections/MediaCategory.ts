import { CollectionConfig } from "payload/types";

export const MediaCategory: CollectionConfig = {
  slug: "mediaCategory",
  labels: {
    singular: {
      en: "Media Category",
      es: "Categoría de medios",
    },
    plural: {
      en: "Media Categories",
      es: "Categorías de medios",
    },
  },
  defaultSort: "name",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "updatedAt"],
    description: {
      en: "Use media categories to organize your media as you find it useful. When you select media, you can filter by category.",
      es: "Usa las categorías de medios para organizar tus medios como te sea útil. Al seleccionar medios, puedes filtrar por categoría.",
    },
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
    },
  ],
};
