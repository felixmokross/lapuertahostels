import { GlobalConfig } from "payload/types";
import { Common as CommonType } from "../payload-types";
import { makeCachePurgeHook } from "../hooks/cachePurgeHook";

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
  hooks: {
    afterChange: [makeCachePurgeHook("globals/common", "/")],
  },
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
            initCollapsed: true,
            components: {
              RowLabel: ({ data }) =>
                socialPlatformOptions.find(
                  (p) =>
                    p.value ===
                    (data as CommonType["footer"]["socialLinks"][number])
                      .platform,
                )?.label,
            },
          },
        },
        {
          name: "linkGroups",
          label: {
            en: "Link Groups",
            es: "Grupos de Enlaces",
          },
          type: "array",
          fields: [
            {
              name: "title",
              label: {
                en: "Title",
                es: "Título",
              },
              localized: true,
              required: true,
              type: "text",
            },
            {
              name: "links",
              label: {
                en: "Links",
                es: "Enlaces",
              },
              type: "array",
              required: true,
              fields: [
                {
                  name: "name",
                  label: {
                    en: "Name",
                    es: "Nombre",
                  },
                  localized: true,
                  required: true,
                  type: "text",
                },
                {
                  name: "url",
                  label: {
                    en: "URL",
                    es: "URL",
                  },
                  required: true,
                  type: "text",
                },
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: ({ data }) =>
                    (
                      data as CommonType["footer"]["linkGroups"][number]["links"][number]
                    )?.name,
                },
              },
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: ({ data }) =>
                (data as CommonType["footer"]["linkGroups"][number]).title,
            },
          },
        },
        {
          name: "newsletter",
          label: {
            en: "Newsletter",
            es: "Boletín",
          },
          type: "group",
          fields: [
            {
              name: "show",
              label: {
                en: "Show Newsletter Form",
                es: "Mostrar Formulario de Boletín",
              },
              type: "checkbox",
            },
            {
              name: "title",
              label: {
                en: "Title",
                es: "Título",
              },
              localized: true,
              required: true,
              type: "text",
              admin: {
                condition: (data: CommonType) => data.footer.newsletter.show,
              },
            },
            {
              name: "description",
              label: {
                en: "Description",
                es: "Descripción",
              },
              localized: true,
              required: true,
              type: "text",
              admin: {
                condition: (data: CommonType) => data.footer.newsletter.show,
              },
            },
            {
              name: "emailPlaceholder",
              label: {
                en: "Email Placeholder",
                es: "Marcador de Correo Electrónico",
              },
              localized: true,
              required: true,
              type: "text",
              admin: {
                condition: (data: CommonType) => data.footer.newsletter.show,
              },
            },
            {
              name: "buttonLabel",
              label: {
                en: "Button Label",
                es: "Etiqueta del Botón",
              },
              localized: true,
              required: true,
              type: "text",
              admin: {
                condition: (data: CommonType) => data.footer.newsletter.show,
              },
            },
          ],
        },
      ],
    },
  ],
};
