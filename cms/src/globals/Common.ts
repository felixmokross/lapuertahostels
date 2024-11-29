import { GlobalConfig } from "payload";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { canManageContent } from "../common/access-control";
import { headingField } from "../fields/heading";
import { makeRichTextField } from "../fields/rich-text";
import { showField } from "../fields/show";
import { socialPlatformOptions } from "@/common/social-platforms";
import { SocialPlatformRowLabelProps } from "@/components/SocialPlatformRowLabel";
import { getGlobalCacheKey } from "@/common/frontend-cache";

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
          {
            type: "target",
            cacheKey: getGlobalCacheKey("common"),
            pageUrl: "/",
          },
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
          type: "relationship",
          relationTo: "texts",
          filterOptions: {
            type: { equals: "plainText" },
          },
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
          ...makeRichTextField(),
          name: "address",
          label: {
            en: "Address",
            es: "Dirección",
          },
        },
        {
          ...makeRichTextField(),
          name: "copyright",
          label: {
            en: "Copyright",
            es: "Derechos de autor",
          },
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
              name: "link",
              label: {
                en: "Link",
                es: "Enlace",
              },
              type: "relationship",
              relationTo: "links",
              required: true,
            },
          ],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: {
                path: "@/components/SocialPlatformRowLabel",
                exportName: "SocialPlatformRowLabel",
                clientProps: {
                  fallbackLabelKey: "custom:common:socialLinkRowLabel",
                } as SocialPlatformRowLabelProps,
              },
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
            showField,
            {
              name: "title",
              label: {
                en: "Title",
                es: "Título",
              },
              required: true,
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "plainText" },
              },
              admin: {
                condition: (data: any) => !!data.footer?.newsletter?.show,
              },
            },
            {
              name: "description",
              label: {
                en: "Description",
                es: "Descripción",
              },
              required: true,
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "plainText" },
              },
              admin: {
                condition: (data: any) => !!data?.footer?.newsletter?.show,
              },
            },
            {
              name: "emailPlaceholder",
              label: {
                en: "Email Placeholder",
                es: "Marcador de correo electrónico",
              },
              required: true,
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "plainText" },
              },
              admin: {
                condition: (data) => data.footer.newsletter.show,
              },
            },
            {
              name: "buttonLabel",
              label: {
                en: "Button Label",
                es: "Etiqueta del botón",
              },
              required: true,
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "plainText" },
              },
              admin: {
                condition: (data) => data.footer.newsletter.show,
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
      fields: [headingField, makeRichTextField()],
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
      fields: [headingField, makeRichTextField()],
    },
  ],
};
