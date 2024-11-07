import { GlobalConfig } from "payload/types";
import { Common as CommonType } from "../payload-types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { validateUrl } from "../common/validation";
import { canManageContent } from "../common/access-control";
import { linkField } from "../fields/link";
import { makeRichTextField } from "../fields/rich-text";
import { headingField } from "../fields/heading";
import { newHeadingField } from "../fields/new-heading";

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
  access: {
    update: canManageContent,
  },
  hooks: {
    afterChange: [
      ({ req }) =>
        cachePurgeHook(
          { type: "target", dataUrl: "globals/common", pageUrl: "/" },
          req,
        ),
    ],
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
    {
      name: "pageNotFoundScreen",
      label: {
        en: "Page Not Found Screen",
        es: "Pantalla de Página No Encontrada",
      },
      admin: {
        description: {
          en: "This screen is shown when a user tries to access a page that does not exist.",
          es: "Esta pantalla se muestra cuando un usuario intenta acceder a una página que no existe.",
        },
      },
      type: "group",
      fields: [newHeadingField, makeRichTextField({ mode: "long-form" })],
    },
    {
      name: "errorScreen",
      label: {
        en: "Internal Server Error Screen",
        es: "Pantalla de Error Interno del Servidor",
      },
      admin: {
        description: {
          en: "This screen is shown when the server encounters an error.",
          es: "Esta pantalla se muestra cuando el servidor encuentra un error.",
        },
      },
      type: "group",
      fields: [newHeadingField, makeRichTextField({ mode: "long-form" })],
    },
  ],
};
