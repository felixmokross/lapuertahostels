"use server";

import { translate } from "@/common/translation";

type AutoTranslateInput = {
  fromLocale: string;
  toLocales: string[];
  texts: Record<string, string>;
};

type AutoTranslateResult = Record<string, Record<string, string>>;

export async function autoTranslate({
  fromLocale,
  toLocales,
  texts,
}: AutoTranslateInput) {
  const result = {} as AutoTranslateResult;

  for (const locale of toLocales) {
    for (const [path, value] of Object.entries(texts)) {
      console.info(`Translating ${path} to ${locale}`);
      if (!result[path]) {
        result[path] = {};
      }
      result[path][locale] = (
        await translate(value, fromLocale, locale, false)
      ).text;
    }
  }

  return result;
}
