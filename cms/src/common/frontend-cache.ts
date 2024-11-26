import { resolve6 } from "dns/promises";
import { PayloadRequest } from "payload";
import { getSupportedLocales } from "./locales";
import { NewPages } from "@/collections/NewPages";

export async function refreshCacheForAllPages(
  req: PayloadRequest,
  actionType: RefreshCacheActionType,
) {
  const pages = (
    await req.payload.find({
      collection: "new-pages",
      pagination: false,
      depth: 0,
    })
  ).docs;

  console.log(`Refreshing cache for all pages (${actionType}).`);
  for (const page of pages) {
    await refreshCacheForTarget({
      type: actionType,
      pageUrl: page.pathname,
      dataUrl: `${NewPages.slug}/${page.id}`,
    });
  }

  console.log(`Refreshed cache for all pages (${actionType}).`);
}

export type RefreshCacheActionType = RefreshCacheAction["type"];

type RefreshCacheAction =
  | { type: "purge-and-prime"; dataUrl: string; pageUrl: string }
  | { type: "prime-only"; pageUrl: string };

export async function refreshCacheForTarget(action: RefreshCacheAction) {
  if (!process.env.CACHE_REFRESH_TARGET_TYPE) {
    throw new Error("CACHE_REFRESH_TARGET is not set");
  }
  if (!process.env.CACHE_REFRESH_TARGET_ARG) {
    throw new Error("CACHE_REFRESH_TARGET_ARG is not set");
  }

  switch (process.env.CACHE_REFRESH_TARGET_TYPE) {
    case "single":
      await refreshCache(process.env.CACHE_REFRESH_TARGET_ARG, action);
      return;

    case "fly":
      const [appName, internalPort] =
        process.env.CACHE_REFRESH_TARGET_ARG.split(",");
      await refreshCacheForFlyTarget(appName, internalPort, action);
      return;

    default:
      throw new Error(
        `Unsupported CACHE_REFRESH_TARGET type: ${process.env.CACHE_REFRESH_TARGET_TYPE}`,
      );
  }
}

async function refreshCacheForFlyTarget(
  appName: string,
  internalPort: string,
  action: RefreshCacheAction,
) {
  console.log(
    `Determining Fly frontend VM URLs for cache refresh (app=${appName}, internalPort=${internalPort})`,
  );

  const targetUrls = await queryFlyVmUrls(appName, parseInt(internalPort, 10));

  console.log(`Refreshing cache at ${targetUrls.length} frontend VMs`);

  const results = await Promise.allSettled(
    targetUrls.map((targetUrls) => refreshCache(targetUrls, action)),
  );
  const failed = results.filter(isPromiseRejectedResult);

  if (failed.length === 0) {
    console.log(
      `Successfully refreshed cache at ${targetUrls.length} frontend VMs`,
    );
  } else {
    console.error(
      `Failed to refresh cache at ${failed.length} frontend VMs:\n${failed.map((r, i) => `[${i}] ${r}`).join("\n")}`,
    );
  }
}

async function queryFlyVmUrls(appName: string, port: number) {
  const address = `global.${appName}.internal`;
  const ipv6s = await resolve6(address);
  const urls = ipv6s.map((ip) => `http://[${ip}]:${port}`);

  return urls;
}

async function refreshCache(targetUrl: string, action: RefreshCacheAction) {
  if (action.type === "purge-and-prime") {
    await purgeCache(targetUrl, action.dataUrl);
  }

  await primeCache(targetUrl, action.pageUrl);
}

async function purgeCache(targetUrl: string, dataUrl: string) {
  console.log(`Purging cache at ${targetUrl} for ${dataUrl}...`);
  const response = await fetch(`${targetUrl}/purge-cache`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: dataUrl }),
  });

  if (!response.ok) {
    throw new Error(`Failed to purge cache at ${targetUrl} for ${dataUrl}`);
  }
}

async function primeCache(targetUrl: string, pageUrl: string) {
  const absolutePageUrl = new URL(pageUrl, targetUrl);

  await Promise.allSettled(
    (await getSupportedLocales()).map((locale) =>
      primeCacheForLocale(absolutePageUrl.toString(), locale),
    ),
  );
}

async function primeCacheForLocale(absolutePageUrl: string, locale: string) {
  const localizedPageUrl = new URL(absolutePageUrl);
  localizedPageUrl.searchParams.set("lng", locale);

  console.log(`Priming cache at ${localizedPageUrl}...`);

  const response = await fetch(localizedPageUrl);
  if (!response.ok) {
    throw new Error(`Failed to prime cache at ${response.url}`);
  }
}

function isPromiseRejectedResult(
  result: PromiseSettledResult<unknown>,
): result is PromiseRejectedResult {
  return result.status === "rejected";
}
