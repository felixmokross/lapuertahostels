import {
  TranslateTextOptions,
  type SourceLanguageCode,
  type TargetLanguageCode,
} from "deepl-node";

const deeplTranslateTextOptions: TranslateTextOptions = {
  modelType: "prefer_quality_optimized",
  formality: "prefer_less",
};

export async function translate(
  text: string,
  sourceLocale: SourceLanguageCode,
  targetLocale: TargetLanguageCode,
  handleHtml: boolean,
) {
  const { Translator } = await import("deepl-node");
  const translator = new Translator(process.env.DEEPL_API_AUTH_KEY!);

  return await translator.translateText(text, sourceLocale, targetLocale, {
    ...deeplTranslateTextOptions,
    ...(handleHtml ? { tagHandling: "html" } : undefined),
  });
}
