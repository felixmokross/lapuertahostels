import { GlobalConfig } from "payload/types";
import { Common as CommonType } from "../payload-types";
import { cachePurgeHook } from "../hooks/cachePurgeHook";
import { showField } from "../fields/show";
import { validateUrl } from "../common/validation";
import { canManageContent } from "../common/access-control";
import { linkField } from "../fields/link";
import { makeCallToActionField } from "../fields/call-to-action";

const socialPlatformOptions = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "WhatsApp", value: "whatsapp" },
];

const callToActionField = makeCallToActionField({
  optional: true,
  variant: false,
});

export const Common: GlobalConfig = {
  slug: "common",
  label: {
    en: "Common",
    es: "Común",
  },
  access: {
    update: canManageContent,
  },
  hooks: {
    afterChange: [({ req }) => cachePurgeHook("globals/common", "/", req)],
  },
  fields: [
    {
      name: "meta",
      label: {
        en: "Meta",
        es: "Meta",
      },
      type: "group",
      fields: [
        {
          name: "description",
          label: {
            en: "Description",
            es: "Descripción",
          },
          localized: true,
          type: "textarea",
          maxLength: 500,
          admin: {
            description: {
              en: "A short description of the website that will be shown on search results, social media, and messenger apps.",
              es: "Una breve descripción del sitio web que se mostrará en los resultados de búsqueda, redes sociales y aplicaciones de mensajería.",
            },
          },
        },
      ],
    },
    {
      name: "banner",
      label: {
        en: "Banner",
        es: "Banner",
      },
      type: "group",
      admin: {
        description: {
          en: "The banner is useful to announce promotions or important news and can have a call to action. It is shown on all pages.",
          es: "El banner es útil para anunciar promociones o noticias importantes y puede tener un call to action. Se muestra en todas las páginas.",
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
          localized: true,
          type: "text",
          admin: {
            condition: (_, siblingData) => siblingData.show,
          },
        },
        {
          ...callToActionField,
          admin: {
            ...callToActionField.admin,
            condition: (_, siblingData) => siblingData.show,
          },
        },
      ],
    },
    {
      name: "footer",
      label: {
        en: "Footer",
        es: "Pie de página",
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
            es: "Derechos de autor",
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
            es: "Enlaces sociales",
          },
          labels: {
            singular: {
              en: "Social Link",
              es: "Enlace social",
            },
            plural: {
              en: "Social Links",
              es: "Enlaces sociales",
            },
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
              validate: validateUrl,
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
            es: "Grupos de enlaces",
          },
          labels: {
            singular: {
              en: "Link Group",
              es: "Grupo de enlaces",
            },
            plural: {
              en: "Link Groups",
              es: "Grupos de enlaces",
            },
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
              labels: {
                singular: {
                  en: "Link",
                  es: "Enlace",
                },
                plural: {
                  en: "Links",
                  es: "Enlaces",
                },
              },
              type: "array",
              required: true,
              fields: linkField.fields,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: ({ data }) =>
                    (
                      data as CommonType["footer"]["linkGroups"][number]["links"][number]
                    )?.label,
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
            en: "Newsletter Form",
            es: "Formulario de Boletín",
          },
          type: "group",
          fields: [
            {
              name: "show",
              label: {
                en: "Show",
                es: "Mostrar",
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
                es: "Marcador de correo electrónico",
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
                es: "Etiqueta del botón",
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
