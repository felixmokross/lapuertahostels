import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: {
      en: "User",
      es: "Usuario",
    },
    plural: {
      en: "Users",
      es: "Usuarios",
    },
  },
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
