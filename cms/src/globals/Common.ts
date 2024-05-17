import { GlobalConfig } from "payload/types";

export const Common: GlobalConfig = {
  slug: "common",
  label: {
    en: "Common",
    es: "Común",
  },
  access: { read: () => true },
  fields: [
    {
      name: "banner",
      label: {
        en: "Banner",
        es: "Banner",
      },
      type: "group",
      fields: [
        {
          name: "message",
          label: {
            en: "Message",
            es: "Mensaje",
          },
          localized: true,
          type: "text",
        },
        {
          name: "cta",
          label: {
            en: "CTA",
            es: "CTA",
          },
          localized: true,
          type: "text",
        },
        {
          name: "ctaUrl",
          label: {
            en: "CTA URL",
            es: "URL del CTA",
          },
          type: "text",
        },
      ],
    },
    {
      name: "footer",
      label: {
        en: "Footer",
        es: "Pie de Página",
      },
      type: "group",
      fields: [
        {
          name: "address",
          label: {
            en: "Address",
            es: "Dirección",
          },
          type: "textarea",
          required: true,
        },
        {
          name: "copyright",
          label: {
            en: "Copyright",
            es: "Derechos de Autor",
          },
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
  ],
};
