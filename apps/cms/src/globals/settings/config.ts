import { GlobalConfig } from "payload";
import { canManageContent } from "../../common/access-control";
import { showField, textField } from "@fxmk/cms-plugin";
import { adminGroup } from "@/groups";
import { Settings as SettingsType } from "@/payload-types";

export const Settings: GlobalConfig = {
  slug: "settings",
  typescript: {
    interface: "Settings",
  },
  label: {
    en: "Settings",
    es: "Configuración",
  },
  access: {
    update: canManageContent,
  },
  admin: {
    group: adminGroup,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "publishedLocales",
          label: {
            en: "Published Locales",
            es: "Idiomas Publicados",
          },
          fields: [
            {
              name: "publishedLocales",
              label: { en: "Published Locales", es: "Idiomas Publicados" },
              type: "relationship",
              relationTo: "locale-configs",
              hasMany: true,
              required: true,
              admin: {
                description: {
                  en: "Select locales with completely translated content to make them available to the user on the website. To add a new locale, it must be first added to the 'Locale Configurations' collection.",
                  es: "Selecciona los idiomas con contenido completamente traducido para hacerlos disponibles al usuario en el sitio web. Para agregar un nuevo idioma, primero debe agregarse a la colección 'Configuraciones de Idioma'.",
                },
              },
            },
            {
              name: "fallbackLocale",
              label: {
                en: "Fallback Locale",
                es: "Idioma predeterminado",
              },
              type: "relationship",
              relationTo: "locale-configs",
              filterOptions: ({ siblingData }) => ({
                id: { in: (siblingData as SettingsType).publishedLocales },
              }),
              required: true,
              admin: {
                description: {
                  en: "The fallback locale is used when a translation is not available in the requested locale. It must be one of the published locales.",
                  es: "El idioma predeterminado se utiliza cuando no hay una traducción disponible en el idioma solicitado. Debe ser uno de los idiomas publicados.",
                },
              },
            },
          ],
        },
        {
          name: "maintenanceScreen",
          label: {
            en: "Maintenance Screen",
            es: "Pantalla de Mantenimiento",
          },
          admin: {
            description: {
              en: "Hide the complete website and show a maintenance screen instead.",
              es: "Oculta el sitio web completo y muestra una pantalla de mantenimiento en su lugar.",
            },
          },
          fields: [
            showField(),
            textField({
              name: "message",
              label: { en: "Message", es: "Mensaje" },
              admin: {
                condition: (_, siblingData) => siblingData.show,
              },
            }),
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
                  en: "Enter the region code for maps, e.g. CO for Colombia. Must be two letters in uppercase. See https://developers.google.com/maps/coverage#coverage-legend",
                  es: "Ingresa el código de región para mapas, por ejemplo CO para Colombia. Debe ser de dos letras en mayúsculas. Consulta https://developers.google.com/maps/coverage#coverage-legend",
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
      ],
    },
  ],
};
