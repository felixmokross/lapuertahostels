import { adminGroup } from "@/groups";
import { CollectionConfig } from "payload";
import locales from "@/common/locales.json";

export const Locales: CollectionConfig = {
  slug: "locales",
  labels: {
    singular: {
      en: "Locale",
      es: "Idioma",
    },
    plural: {
      en: "Locales",
      es: "Idiomas",
    },
  },
  defaultSort: "displayLabel",
  defaultPopulate: {
    locale: true,
    displayLabel: true,
    googleMapsLanguage: true,
  },
  admin: {
    useAsTitle: "displayLabel",
    group: adminGroup,
  },
  fields: [
    {
      name: "locale",
      label: {
        en: "Locale",
        es: "Idioma",
      },
      type: "select",
      options: locales.map((locale) => ({
        label: Object.fromEntries(
          Object.entries(locale.label).map(([key, value]) => [
            key,
            `${value} – ${locale.code}`,
          ]),
        ),
        value: locale.code,
      })),
      required: true,
      unique: true,
      index: true,
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
      type: "text",
      admin: {
        description: {
          en: "Use a supported DeepL source language code. See https://developers.deepl.com/docs/getting-started/supported-languages#translation-source-languages.",
          es: "Utiliza un código de idioma de origen compatible con DeepL. Consulta https://developers.deepl.com/docs/getting-started/supported-languages#translation-source-languages.",
        },
      },
    },
    {
      name: "deeplTargetLanguage",
      label: {
        en: "DeepL Target Language",
        es: "Idioma de Destino DeepL",
      },
      type: "text",
      admin: {
        description: {
          en: "Use a supported DeepL target language code. See https://developers.deepl.com/docs/getting-started/supported-languages#translation-target-languages.",
          es: "Utiliza un código de idioma de destino compatible con DeepL. Consulta https://developers.deepl.com/docs/getting-started/supported-languages#translation-target-languages.",
        },
      },
    },
    {
      name: "googleMapsLanguage",
      label: {
        en: "Google Maps Language",
        es: "Idioma de Google Maps",
      },
      type: "text",
      admin: {
        description: {
          en: "Use a supported Google Maps language code. For English, use 'en'; for other languages, see https://developers.google.com/maps/faq#languagesupport.",
          es: "Utiliza un código de idioma compatible con Google Maps. Para inglés, usa 'en'; para otros idiomas, consulta https://developers.google.com/maps/faq#languagesupport.",
        },
      },
    },
  ],
};
