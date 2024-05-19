import { CollectionConfig } from "payload/types";
import { isAdmin, isSelf } from "../common/access-control";

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
  access: {
    read: ({ req, id }) => isSelf(req, id) || isAdmin(req),
    create: ({ req }) => isAdmin(req),
    update: ({ req, id }) => isSelf(req, id) || isAdmin(req),
    delete: ({ req }) => isAdmin(req),
  },
  fields: [
    {
      name: "role",
      label: {
        en: "Role",
        es: "Rol",
      },
      type: "radio",
      options: [
        { value: "editor", label: { en: "Editor", es: "Editor" } },
        { value: "admin", label: { en: "Admin", es: "Administrador" } },
      ],
      defaultValue: "editor",
      required: true,
      access: {
        read: () => true,
        create: ({ req }) => isAdmin(req),
        update: ({ req }) => isAdmin(req),
      },
    },
  ],
};
