import { GlobalConfig } from "payload";
import { canManageContent } from "../common/access-control";
import { refreshCacheHook } from "../hooks/refresh-cache-hook";
import { showField } from "../fields/show";
import { getGlobalCacheKey } from "@/common/frontend-cache";

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
    afterChange: [
      refreshCacheHook({
        cacheKey: getGlobalCacheKey("maintenance"),
        pageUrl: "/",
      }),
    ],
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
          type: "relationship",
          relationTo: "texts",
          filterOptions: {
            type: { equals: "plainText" },
          },
          admin: {
            condition: (_, siblingData) => siblingData.show,
          },
        },
      ],
    },
  ],
};
