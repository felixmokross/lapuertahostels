import { adminGroup } from "@/groups";
import { CollectionConfig } from "payload";
import locales from "@/common/locales.json";
import {
  deeplSourceLanguageCodes,
  deeplTargetLanguage as deeplTargetLanguageCodes,
} from "@fxmk/cms-plugin";
import { googleMapLanguageCodes } from "./google-maps-language-codes";

export const LocaleConfigs: CollectionConfig = {
  slug: "locale-configs",
  labels: {
    singular: {
      en: "Locale Configuration",
      es: "Configuración de Idioma",
    },
    plural: {
      en: "Locale Configurations",
      es: "Configuraciones de Idioma",
    },
  },
  defaultSort: "displayLabel",
  defaultPopulate: {
    displayLabel: true,
    googleMapsLanguage: true,
  },
  admin: {
    useAsTitle: "locale",
    group: adminGroup,
    listSearchableFields: ["locale", "displayLabel"],
    defaultColumns: ["locale", "displayLabel"],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        data.id = data.locale;
      },
    ],
  },
  fields: [
    {
      name: "id",
      label: {
        en: "ID",
        es: "ID",
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "locale",
      label: {
        en: "Locale",
        es: "Idioma",
      },
      type: "select",
      options: locales
        .toSorted((a, b) => a.code.localeCompare(b.code))
        .map((locale) => ({
          label: Object.fromEntries(
            Object.entries(locale.label).map(([key, value]) => [
              key,
              `${value} (${locale.code})`,
            ]),
          ),
          value: locale.code,
        })),
      required: true,
      access: {
        update: () => false,
      },
    },
    {
      name: "displayLabel",
      label: {
        en: "Display Label",
        es: "Etiqueta de Visualización",
      },
      type: "text",
      required: true,
      admin: {
        description: {
          en: "The label to be displayed in the application. This should be the name in the respective language so that it can be easily recognized by speakers of that language. E.g. 'English' for English, 'Español' for Spanish.",
          es: "La etiqueta que se mostrará en la aplicación. Debe ser el nombre en el idioma respectivo para que pueda ser fácilmente reconocido por los hablantes de ese idioma. Por ejemplo, 'English' para inglés, 'Español' para español.",
        },
      },
    },
    {
      name: "deeplSourceLanguage",
      label: {
        en: "DeepL Source Language",
        es: "Idioma de Origen DeepL",
      },
      type: "select",
      options: deeplSourceLanguageCodes
        .toSorted((a, b) => a.localeCompare(b))
        .map((languageCode) => ({
          label: Object.fromEntries(
            Object.entries(
              locales.find((l) => l.code === languageCode)!.label,
            ).map(([key, value]) => [key, `${value} (${languageCode})`]),
          ),
          value: languageCode,
        })),
    },
    {
      name: "deeplTargetLanguage",
      label: {
        en: "DeepL Target Language",
        es: "Idioma de Destino DeepL",
      },
      type: "select",
      options: deeplTargetLanguageCodes
        .toSorted((a, b) => a.localeCompare(b))
        .map((languageCode) => ({
          label: Object.fromEntries(
            Object.entries(
              locales.find((l) => l.code === languageCode)!.label,
            ).map(([key, value]) => [key, `${value} (${languageCode})`]),
          ),
          value: languageCode,
        })),
    },
    {
      name: "googleMapsLanguage",
      label: {
        en: "Google Maps Language",
        es: "Idioma de Google Maps",
      },
      type: "select",

      options: googleMapLanguageCodes
        .toSorted((a, b) => a.localeCompare(b))
        .map((languageCode) => ({
          label: Object.fromEntries(
            Object.entries(
              locales.find((l) => l.code === languageCode)!.label,
            ).map(([key, value]) => [key, `${value} (${languageCode})`]),
          ),
          value: languageCode,
        })),
    },
  ],
};
