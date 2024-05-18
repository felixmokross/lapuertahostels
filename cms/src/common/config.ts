export type Config = {
  livePreviewUrl: string;
};

let configCache: Config | undefined;

export async function getConfig() {
  if (configCache) return configCache;

  configCache = await (await fetch("/config")).json();
  return configCache;
}
