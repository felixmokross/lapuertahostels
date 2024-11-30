import { Config } from "payload";
import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    custom: {
      common: {
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
        translateToAllLocales: "Translate to all locales",
        translatingToAllLocales: "Translating to all locales…",
        pleaseSaveYourChangesToEnableTranslation:
          "Please save your changes to enable translation.",
        confirmTranslateToAllLocales:
          "This will overwrite all translations of this text. Do you want to proceed?",
        translatedToAllLocalesSuccessfully:
          "Translated to all locales successfully",
        failedToTranslateToAllLocales: "Failed to translate to all locales",
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
        translateToAllLocales: "Traducir a todos los idiomas",
        translatingToAllLocales: "Traduciendo a todos los idiomas…",
        pleaseSaveYourChangesToEnableTranslation:
          "Por favor, guarde sus cambios para habilitar la traducción.",
        confirmTranslateToAllLocales:
          "Esto sobrescribirá todas las traducciones de este texto. ¿Desea continuar?",
        translatedToAllLocalesSuccessfully:
          "Traducido a todos los idiomas con éxito",
        failedToTranslateToAllLocales: "Error al traducir a todos los idiomas",
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
