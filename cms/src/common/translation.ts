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
  sourceLocale: string,
  targetLocale: string,
  handleHtml: boolean,
) {
  const { Translator } = await import("deepl-node");
  const translator = new Translator(process.env.DEEPL_API_AUTH_KEY);

  return await translator.translateText(
    text,
    sourceLocale as SourceLanguageCode,
    toDeeplTargetLanguageCode(targetLocale),
    {
      ...deeplTranslateTextOptions,
      ...(handleHtml ? { tagHandling: "html" } : undefined),
    },
  );
}

function toDeeplTargetLanguageCode(locale: string): TargetLanguageCode {
  switch (locale) {
    case "en":
      return "en-US";
    case "es":
      return "es";
    case "de":
      return "de";
    case "fr":
      return "fr";
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}
