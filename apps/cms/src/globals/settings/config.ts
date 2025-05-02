import { GlobalConfig } from "payload";
import { canManageContent } from "../../common/access-control";
import { showField } from "../../fields/show";
import { textField } from "@/fields/text";
import { adminGroup } from "@/groups";

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
      ],
    },
  ],
};
