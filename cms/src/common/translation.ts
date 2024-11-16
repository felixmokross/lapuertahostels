import { type SourceLanguageCode, type TargetLanguageCode } from "deepl-node";

export async function translate(
  text: string,
  sourceLocale: string,
  targetLocale: string,
) {
  const { Translator } = await import("deepl-node");
  const translator = new Translator(process.env.DEEPL_API_AUTH_KEY);

  return await translator.translateText(
    text,
    sourceLocale as SourceLanguageCode,
    targetLocale as TargetLanguageCode,
  );
}
