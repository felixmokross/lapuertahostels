import { Config } from "payload";
import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    custom: {
      common: {
        linkRowLabel: "Link {{ n }}",
        linkGroupRowLabel: "Link Group {{ n }}",
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
        item: "Item {{ n }}",
      },
    },
  },
  es: {
    custom: {
      common: {
        linkRowLabel: "Enlace {{ n }}",
        linkGroupRowLabel: "Grupo de enlaces {{ n }}",
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
        item: "Elemento {{ n }}",
      },
    },
  },
} satisfies NonNullable<Config["i18n"]>["translations"];

export type TranslationsObject = typeof translations.en;
export type TranslationsKey = NestedKeysStripped<TranslationsObject>;
