import payloadConfig from "../payload.config";

export async function getSupportedLocaleCodes() {
  return (await getSupportedLocales()).map((l) => l.code);
}

export async function getSupportedLocales() {
  const { localization } = await payloadConfig;
  if (!localization) {
    throw new Error("Localization configuration is missing");
  }

  return (
    localization.locales
      // locales have a 'toString' function, which prevents us passing this from server components
      .map((l) => {
        // @ts-expect-error
        delete l.toString;
        return l;
      })
  );
}
