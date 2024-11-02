import { GlobalConfig } from "payload/types";
import { canManageContent } from "../common/access-control";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { showField } from "../fields/show";

export const Maintenance: GlobalConfig = {
  slug: "maintenance",
  label: {
    en: "Maintenance",
    es: "Mantenimiento",
  },
  access: {
    update: canManageContent,
  },
  hooks: {
    afterChange: [({ req }) => cachePurgeHook("globals/maintenance", "/", req)],
  },
  fields: [
    {
      name: "maintenanceScreen",
      label: {
        en: "Maintenance Screen",
        es: "Pantalla de Mantenimiento",
      },
      type: "group",
      admin: {
        description: {
          en: "Hide the complete website and show a maintenance screen instead.",
          es: "Oculta el sitio web completo y muestra una pantalla de mantenimiento en su lugar.",
        },
      },
      fields: [
        showField,
        {
          name: "message",
          label: {
            en: "Message",
            es: "Mensaje",
          },
          required: true,
          localized: true,
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData.show,
          },
        },
      ],
    },
  ],
};
