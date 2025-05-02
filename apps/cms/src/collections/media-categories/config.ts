import { adminGroup } from "@/groups";
import { CollectionConfig } from "payload";

export const MediaCategories: CollectionConfig = {
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
  defaultPopulate: {
    name: true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "updatedAt"],
    listSearchableFields: ["id", "name"],
    description: {
      en: "Use media categories to organize your media as you find it useful. When you select media, you can filter by category.",
      es: "Usa las categorías de medios para organizar tus medios como te sea útil. Al seleccionar medios, puedes filtrar por categoría.",
    },
    group: adminGroup,
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
    {
      name: "media",
      label: {
        en: "Media",
        es: "Medios",
      },
      type: "join",
      collection: "media",
      on: "category",
    },
  ],
};
