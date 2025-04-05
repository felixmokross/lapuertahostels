import { canManageContent, isAdmin, isSelf } from "@/common/access-control";
import { CollectionConfig } from "payload";

export const ApiKeys: CollectionConfig = {
  slug: "api-keys",
  labels: {
    singular: { en: "API Key", es: "Clave API" },
    plural: { en: "API Keys", es: "Claves API" },
  },
  access: {
    read: ({ req }) => isAdmin(req),
    create: ({ req }) => isAdmin(req),
    update: ({ req }) => isAdmin(req),
    delete: ({ req }) => isAdmin(req),
    admin: canManageContent,
  },
  auth: {
    disableLocalStrategy: true,
    useAPIKey: true,
  },
  admin: {
    defaultColumns: ["name", "createdAt", "updatedAt"],
    useAsTitle: "name",
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
      unique: true,
    },
  ],
};
