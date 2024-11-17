import { Config } from "payload";
import type { NestedKeysStripped } from "@payloadcms/translations";

export const translations = {
  en: {
    custom: {
      validation: {
        mustBeValidUrl: "Must be a valid URL",
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
    },
  },
  es: {
    custom: {
      validation: {
        mustBeValidUrl: "Debe ser una URL válida",
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
    },
  },
} satisfies NonNullable<Config["i18n"]>["translations"];

export type TranslationsObject = typeof translations.en;
export type TranslationsKeys = NestedKeysStripped<TranslationsObject>;
