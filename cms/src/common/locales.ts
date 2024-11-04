import payloadConfig from "../payload.config";

export async function getSupportedLocales() {
  const { localization } = await payloadConfig;
  if (!localization) {
    throw new Error("Localization configuration is missing");
  }

  return localization.locales.map((l) => l.code);
}
