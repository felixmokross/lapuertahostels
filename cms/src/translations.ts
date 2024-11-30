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
        translations: "Translations…",
        autoTranslate: "Auto-Translate",
        goToTranslation: "Go to Translation",
        translating: "Translating…",
        pleaseSaveYourChangesToEnableAutoTranslate:
          "Please save your changes to enable translation.",
        confirmAutoTranslate:
          "This will translate the {{ sourceLocale }} text to the other locales and overwrite the other translations.\n\nDo you want to proceed?",
        autoTranslatedSuccessfully: "Auto-translated successfully",
        failedToAutoTranslate: "Failed to auto-translate",
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
        translations: "Traducciones…",
        autoTranslate: "Auto-traducir",
        goToTranslation: "Ir a la traducción",
        translating: "Traduciendo…",
        translateToAllLocales: "Traducir a todos los idiomas",
        translatingToAllLocales: "Traduciendo a todos los idiomas…",
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
