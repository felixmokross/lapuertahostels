import fs from "fs/promises";
import { Azul, Brand, Common, Home } from "~/payload-types";
import path from "path";

const CACHE_DIR = "./.cms-cache";

async function loadAndCacheData(
  url: string,
  locale: string,
  cacheFilePath: string,
) {
  const result = await loadData(url, locale);
  await cacheData(cacheFilePath, result);

  return result;
}

async function cacheData(cacheFilePath: string, data: unknown) {
  await ensureDirectoryExists(path.dirname(cacheFilePath));
  await fs.writeFile(cacheFilePath, JSON.stringify(data));
}

function getCacheFilePath(url: string, locale: string) {
  return `${CACHE_DIR}/${url.replace("/", "_")}.${locale}.json`;
}

async function getData(url: string, locale: string) {
  const cacheFilePath = getCacheFilePath(url, locale);
  try {
    const cache = await fs.readFile(cacheFilePath, "utf8");

    queueMicrotask(() => loadAndCacheData(url, locale, cacheFilePath));

    return JSON.parse(cache) as Home;
  } catch (e) {
    return await loadAndCacheData(url, locale, cacheFilePath);
  }
}

async function loadData(url: string, locale: string) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }

  return await (
    await fetch(
      `${process.env.PAYLOAD_CMS_BASE_URL}/api/${url}?locale=${locale}`,
    )
  ).json();
}

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    if ((e as NodeJS.ErrnoException)?.code !== "EEXIST") throw e;
  }
}

export async function getHome(locale: string) {
  return (await getData("globals/home", locale)) as Home;
}

export async function getAzul(locale: string) {
  return (await getData("globals/azul", locale)) as Azul;
}

export async function getCommon(locale: string) {
  return (await getData("globals/common", locale)) as Common;
}

export async function getBrands(locale: string) {
  return (await getData("brands", locale)).docs as Brand[];
}
