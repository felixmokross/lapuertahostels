import fs from "fs/promises";
import { Brand, Common, Maintenance, Page } from "@lapuertahostels/shared";
import path from "path";
import { BRANDS_DEPTH, PAGE_DEPTH } from "./cms-data";

const CACHE_DIR = "./.cms-cache";
const CACHE_EXPIRY_IN_MS = 1000 * 60; // 1 min

async function loadAndCacheData<TData, TResult>(
  url: string,
  locale: string,
  cacheFilePath: string,
  depth: number,
  queryParams: Record<string, string>,
  getResultFn: (data: TData | null) => TResult | null,
) {
  const result = getResultFn(await loadData(url, locale, depth, queryParams));

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

function getCacheFolder(cacheKey: string) {
  return `${CACHE_DIR}/${cacheKey}`;
}

function getCacheFilePath(cacheKey: string, locale: string) {
  return `${getCacheFolder(cacheKey)}/${locale}.json`;
}

async function getData<TData, TResult>(
  pathname: string,
  cacheKey: string,
  locale: string,
  depth = 1,
  queryParams = {},
  getResultFn: (data: TData | null) => TResult | null = (data: TData | null) =>
    data as TResult,
) {
  const cacheFilePath = getCacheFilePath(cacheKey, locale);
  try {
    const cache = await fs.readFile(cacheFilePath, "utf8");

    // refresh cache in the background _after_ returning the cached data (stale-while-revalidate)
    queueMicrotask(async () => {
      try {
        const cacheLastModified = (await fs.stat(cacheFilePath)).mtime;

        const cacheExpired =
          cacheLastModified.getTime() + CACHE_EXPIRY_IN_MS < Date.now();
        if (!cacheExpired) {
          console.log(`Cache not expired for ${cacheKey} in ${locale}`);
          return;
        }

        console.log(`Cache expired for ${cacheKey} in ${locale}`);
        await loadAndCacheData(
          pathname,
          locale,
          cacheFilePath,
          depth,
          queryParams,
          getResultFn,
        );
      } catch (e) {
        // As this runs in the background, just log the error
        console.error(
          `Failed to refresh cache in microtask for ${cacheKey} in ${locale}: ${e}`,
        );
      }
    });

    console.log(`Cache hit for ${pathname} in ${locale}`);
    return JSON.parse(cache) as TResult;
  } catch (e) {
    if ((e as NodeJS.ErrnoException)?.code !== "ENOENT") throw e;

    console.log(`Cache miss for ${pathname} in ${locale}`);
    return await loadAndCacheData(
      pathname,
      locale,
      cacheFilePath,
      depth,
      queryParams,
      getResultFn,
    );
  }
}

export async function loadData(
  pathname: string,
  locale: string,
  depth: number,
  queryParams: Record<string, string>,
) {
  if (!process.env.PAYLOAD_CMS_BASE_URL) {
    throw new Error("PAYLOAD_CMS_BASE_URL is not set");
  }
  if (!process.env.PAYLOAD_CMS_API_KEY) {
    throw new Error("PAYLOAD_CMS_API_KEY is not set");
  }
  const url = new URL(`/api/${pathname}`, process.env.PAYLOAD_CMS_BASE_URL);
  url.searchParams.set("locale", locale);
  url.searchParams.set("depth", depth.toString());
  url.searchParams.set("draft", "false");
  url.searchParams.set("pagination", "false");
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  console.log(`Loading data from CMS for ${url.toString()} in ${locale}`);
  const response = await fetch(url, {
    headers: {
      Authorization: `users API-Key ${process.env.PAYLOAD_CMS_API_KEY}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) return null;

    throw new Error(`Failed to load data from CMS: ${response.status}`);
  }

  return await response.json();
}

export async function tryGetPage(pathname: string, locale: string) {
  return await getData<{ docs: Page[] }, Page>(
    `pages`,
    `pages_${pathname.replaceAll("/", ":")}`,
    locale,
    PAGE_DEPTH,
    {
      "where[pathname][equals]": pathname,
      limit: 1,
    },
    (data) => (data && data.docs.length > 0 ? data.docs[0] : null),
  );
}

export async function getCommon(locale: string) {
  const common = (await getData(
    "globals/common",
    "globals_common",
    locale,
    2,
  )) as Common | null;
  if (!common) throw new Error("Could not load Common global");

  return common;
}

export async function getMaintenance(locale: string) {
  const maintanance = (await getData(
    "globals/maintenance",
    "globals_maintenance",
    locale,
    2,
  )) as Maintenance | null;
  if (!maintanance) throw new Error("Could not load Maintenance global");

  return maintanance;
}

export async function getBrands(locale: string) {
  const brands = (await getData("brands", "brands", locale, BRANDS_DEPTH)) as {
    docs: Brand[];
  } | null;
  if (!brands) throw new Error("Could not load Brands collection");

  return brands.docs;
}

export async function purgeCacheFor(cacheKey: string) {
  const cacheFolderPath = getCacheFolder(cacheKey);
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
