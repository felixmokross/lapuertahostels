import fs from "fs/promises";
import { Brand, Common, Maintenance, Page } from "~/payload-types";
import path from "path";

const CACHE_DIR = "./.cms-cache";
const CACHE_EXPIRY_IN_MS = 1000 * 60; // 1 min

async function loadAndCacheData(
  url: string,
  locale: string,
  cacheFilePath: string,
  depth: number,
) {
  const result = await loadData(url, locale, depth);

  if (result) {
    await cacheData(cacheFilePath, result);
  }

  return result;
}

async function cacheData(cacheFilePath: string, data: object) {
  console.log(`Caching data to ${cacheFilePath}`);
  await ensureDirectoryExists(path.dirname(cacheFilePath));
  await fs.writeFile(cacheFilePath, JSON.stringify(data));
}

function getCacheFolder(url: string) {
  return `${CACHE_DIR}/${url.replaceAll("/", "_")}`;
}

function getCacheFilePath(url: string, locale: string) {
  return `${getCacheFolder(url)}/${locale}.json`;
}

async function getData(url: string, locale: string, depth = 1) {
  const filePath = getCacheFilePath(url, locale);
  try {
    const cache = await fs.readFile(filePath, "utf8");

    // refresh cache in the background _after_ returning the cached data (stale-while-revalidate)
    queueMicrotask(async () => {
      try {
        const cacheLastModified = (await fs.stat(filePath)).mtime;

        const cacheExpired =
          cacheLastModified.getTime() + CACHE_EXPIRY_IN_MS < Date.now();
        if (!cacheExpired) {
          console.log(`Cache not expired for ${url} in ${locale}`);
          return;
        }

        console.log(`Cache expired for ${url} in ${locale}`);
        await loadAndCacheData(url, locale, filePath, depth);
      } catch (e) {
        // As this runs in the background, just log the error
        console.error(
          `Failed to refresh cache in microtask for ${url} in ${locale}: ${e}`,
        );
      }
    });

    console.log(`Cache hit for ${url} in ${locale}`);
    return JSON.parse(cache) as object;
  } catch (e) {
    if ((e as NodeJS.ErrnoException)?.code !== "ENOENT") throw e;

    console.log(`Cache miss for ${url} in ${locale}`);
    return await loadAndCacheData(url, locale, filePath, depth);
  }
}

async function loadData(url: string, locale: string, depth: number) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }
  if (!process.env.PAYLOAD_CMS_API_KEY) {
    throw new Error("PAYLOAD_CMS_API_KEY is not set");
  }

  console.log(`Loading data from CMS for ${url} in ${locale}`);
  const response = await fetch(
    `${process.env.PAYLOAD_CMS_BASE_URL}/api/${url}?locale=${locale}&depth=${depth}`,
    {
      headers: {
        Authorization: `users API-Key ${process.env.PAYLOAD_CMS_API_KEY}`,
      },
    },
  );

  if (!response.ok) {
    if (response.status === 404) return null;

    throw new Error(`Failed to load data from CMS: ${response.status}`);
  }

  return (await response.json()) as object;
}

export async function tryGetPage(pageId: string, locale: string) {
  return (await getData(`pages/${pageId}`, locale, 3)) as Page | null;
}

export async function getCommon(locale: string) {
  const common = (await getData("globals/common", locale)) as Common | null;
  if (!common) throw new Error("Could not load Common global");

  return common;
}

export async function getMaintenance(locale: string) {
  const maintanance = (await getData(
    "globals/maintenance",
    locale,
  )) as Maintenance | null;
  if (!maintanance) throw new Error("Could not load Maintenance global");

  return maintanance;
}

export async function getBrands(locale: string) {
  const brands = (await getData("brands", locale, 3)) as {
    docs: Brand[];
  } | null;
  if (!brands) throw new Error("Could not load Brands collection");

  return brands.docs;
}

export async function purgeCacheFor(url: string) {
  const cacheFolderPath = getCacheFolder(url);
  await deleteFolderIfExists(cacheFolderPath);
}

async function deleteFolderIfExists(folderPath: string) {
  await fs.rm(folderPath, { recursive: true, force: true });
}

async function ensureDirectoryExists(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (e) {
    if ((e as NodeJS.ErrnoException)?.code !== "EEXIST") throw e;
  }
}
