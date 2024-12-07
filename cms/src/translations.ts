import { Config } from "payload";
import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    custom: {
      common: {
        loading: "Loading…",
        socialLinkRowLabel: "Social Link {{ n }}",
      },
      validation: {
        mustBeValidUrl: "Must be a valid URL",
      },
      pages: {
        pathname: {
          pleaseSelectABrandFirst: "Please select a brand first.",
          pleaseEnterAPathname: "Please enter a pathname.",
          pathnameMustStartWithPrefix:
            "The pathname must start with '{{ prefix }}'.",
        },
      },
      texts: {
        translationsButtonLabel: "Translations…",
        translationsTitle: "Translations",
        currentLocale: "Current Locale",
        selectLocales: "Select Locales",
        selectLocalesDescription:
          "Please confirm the target locales below. The text will be translated from the current locale {{ sourceLocale }} into the selected locales. The translation is powered by the machine translation service <a>DeepL</a>.",
        selectLocalesNote:
          "<s>Note:</s> The existing translations will be overwritten.",
        autoTranslate: "Auto-Translate",
        translateToSelectedLocales: "Translate to Selected Locales",
        goToTranslation: "Go to Translation",
        translating: "Translating…",
        pleaseSaveYourChangesToEnableAutoTranslate:
          "Please save your changes to enable translation.",
        confirmAutoTranslate:
          "This will translate the {{ sourceLocale }} text to the other locales and overwrite the other translations.\n\nDo you want to proceed?",
        autoTranslatedSuccessfully: "Auto-translated successfully",
        failedToAutoTranslate: "Failed to auto-translate",
      },
      media: {
        generate: {
          generate: "Generate",
          generating: "Generating…",
          success: "Alt text generated successfully",
          failure: "Failed to generate alt text",
          pleaseSaveYourChangesToGenerateAltText:
            "Please save your changes to generate the alt text.",
        },
      },
      brands: {
        navLinkRowLabel: "Navigation Link {{ n }}",
      },
      rowLabel: {
        link: "Link {{ n }}",
        linkGroup: "Link Group {{ n }}",
        item: "Item {{ n }}",
      },
      usages: {
        type: "Type",
        name: "Name",
        fieldPath: "Field Path",
        numberOfUsages_one: "{{ count }} usage",
        numberOfUsages_other: "{{ count }} usages",
        global: "Global",
        noUsages: "There are no usages of this item.",
      },
    },
  },
  es: {
    custom: {
      common: {
        loading: "Cargando…",
        socialLinkRowLabel: "Enlace social {{ n }}",
      },
      validation: {
        mustBeValidUrl: "Debe ser una URL válida",
      },
      pages: {
        pathname: {
          pleaseSelectABrandFirst: "Por favor, seleccione una marca primero.",
          pleaseEnterAPathname: "Por favor, introduzca una ruta.",
          pathnameMustStartWithPrefix:
            "La ruta debe comenzar con '{{ prefix }}'.",
        },
      },
      texts: {
        translationsButtonLabel: "Traducciones…",
        translationsTitle: "Traducciones",
        currentLocale: "Idioma actual",
        selectLocales: "Seleccionar idiomas",
        selectLocalesDescription:
          "Confirme los idiomas de destino a continuación. El texto se traducirá del idioma actual {{ sourceLocale }} a los idiomas seleccionados. La traducción es proporcionada por el servicio de traducción automática <a>DeepL</a>.",
        selectLocalesNote:
          "<s>Nota:</s> Las traducciones existentes se sobrescribirán.",
        autoTranslate: "Auto-traducir",
        translateToSelectedLocales: "Traducir a los idiomas seleccionados",
        goToTranslation: "Ir a la traducción",
        translating: "Traduciendo…",
        pleaseSaveYourChangesToEnableAutoTranslate:
          "Por favor, guarde sus cambios para habilitar la traducción.",
        confirmAutoTranslate:
          "Esto traducirá el texto de {{ sourceLocale }} a los otros idiomas y sobrescribirá las otras traducciones.\n\n¿Desea continuar?",
        autoTranslatedSuccessfully: "Auto-traducido con éxito",
        failedToAutoTranslate: "Error al auto-traducir",
      },
      brands: {
        navLinkRowLabel: "Enlace de navegación {{ n }}",
      },
      rowLabel: {
        link: "Enlace {{ n }}",
        linkGroup: "Grupo de enlaces {{ n }}",
        item: "Elemento {{ n }}",
      },
      usages: {
        type: "Tipo",
        name: "Nombre",
        fieldPath: "Ruta del campo",
        numberOfUsages_one: "{{ count }} uso",
        numberOfUsages_other: "{{ count }} usos",
        global: "Global",
        noUsages: "No hay usos de este elemento.",
      },
    },
  },
} satisfies NonNullable<Config["i18n"]>["translations"];

export type TranslationsObject = typeof translations.en;
export type TranslationsKey = NestedKeysStripped<TranslationsObject>;
