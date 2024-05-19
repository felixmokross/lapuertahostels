import { GlobalConfig } from "payload/types";

const socialPlatformOptions = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "WhatsApp", value: "whatsapp" },
];

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
        {
          type: "array",
          name: "socialLinks",
          label: {
            en: "Social Links",
            es: "Enlaces Sociales",
          },
          fields: [
            {
              name: "platform",
              type: "select",
              label: {
                en: "Platform",
                es: "Plataforma",
              },
              options: socialPlatformOptions,
              required: true,
            },
            {
              name: "url",
              type: "text",
              label: {
                en: "URL",
                es: "URL",
              },
              required: true,
            },
          ],
          admin: {
            components: {
              RowLabel: ({ data }) =>
                socialPlatformOptions.find((p) => p.value === data?.platform)
                  ?.label,
            },
          },
        },
      ],
    },
  ],
};
