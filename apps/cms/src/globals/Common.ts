import { GlobalConfig } from "payload";
import { refreshCacheHook } from "../hooks/refresh-cache-hook";
import { canManageContent } from "../common/access-control";
import { showField } from "../fields/show";
import { socialPlatformOptions } from "@/common/social-platforms";
import { SocialPlatformRowLabelProps } from "@/components/SocialPlatformRowLabel";
import { getGlobalCacheKey } from "@/common/frontend-cache";
import { descriptionField } from "@/fields/description";
import { richTextField } from "@/fields/rich-text";
import { headingField } from "@/fields/heading";
import { translationsView } from "@/views/translations/translations-view-config";

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
      refreshCacheHook({ cacheKey: getGlobalCacheKey("common"), pageUrl: "/" }),
    ],
  },
  admin: {
    components: {
      views: {
        edit: {
          translations: translationsView(),
        },
      },
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "footer",
          label: {
            en: "Footer",
            es: "Pie de página",
          },
          fields: [
            {
              ...richTextField(),
              name: "address",
              label: {
                en: "Address",
                es: "Dirección",
              },
            },
            {
              ...richTextField(),
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
                  type: "text",
                  localized: true,
                  admin: {
                    condition: (data) => !!data.footer?.newsletter?.show,
                  },
                },
                {
                  name: "description",
                  label: {
                    en: "Description",
                    es: "Descripción",
                  },
                  required: true,
                  type: "textarea",
                  localized: true,
                  admin: {
                    condition: (data) => !!data?.footer?.newsletter?.show,
                  },
                },
                {
                  name: "emailPlaceholder",
                  label: {
                    en: "Email Placeholder",
                    es: "Marcador de correo electrónico",
                  },
                  required: true,
                  type: "text",
                  localized: true,
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
                  type: "text",
                  localized: true,
                  admin: {
                    condition: (data) => data.footer.newsletter.show,
                  },
                },
              ],
            },
          ],
        },
        {
          name: "maps",
          label: {
            en: "Maps",
            es: "Mapas",
          },
          fields: [
            {
              name: "region",
              type: "text",
              label: {
                en: "Region Code",
                es: "Código de región",
              },
              minLength: 2,
              maxLength: 2,
              admin: {
                description: {
                  en: "Enter the region code for maps, e.g. CO for Colombia. Must be two letters in uppercase. See https://developers.google.com/maps/documentation/javascript/localization#Region",
                  es: "Ingresa el código de región para mapas, por ejemplo CO para Colombia. Debe ser de dos letras en mayúsculas. Consulta https://developers.google.com/maps/documentation/javascript/localization#Region",
                },
              },
            },
            {
              name: "mapId",
              type: "text",
              required: true,
              label: {
                en: "Map ID",
                es: "ID de mapa",
              },
              admin: {
                description: {
                  en: "Enter the ID of the map to display. This is the ID of the map in the Google Maps Platform and defines styling and POI settings.",
                  es: "Ingresa el ID del mapa a mostrar. Este es el ID del mapa en Google Maps Platform y define la configuración de estilo y POI.",
                },
              },
            },
          ],
        },
        {
          name: "pageNotFoundScreen",
          label: {
            en: "Page Not Found Screen",
            es: "Pantalla de Página No Encontrada",
          },
          fields: [
            descriptionField({
              en: "This screen is shown when a user tries to access a page that does not exist.",
              es: "Esta pantalla se muestra cuando un usuario intenta acceder a una página que no existe.",
            }),
            headingField,
            richTextField(),
          ],
        },
        {
          name: "errorScreen",
          label: {
            en: "Internal Server Error Screen",
            es: "Pantalla de Error Interno del Servidor",
          },
          fields: [
            descriptionField({
              en: "This screen is shown when the server encounters an error.",
              es: "Esta pantalla se muestra cuando el servidor encuentra un error.",
            }),
            headingField,
            richTextField(),
          ],
        },
      ],
    },
  ],
};
