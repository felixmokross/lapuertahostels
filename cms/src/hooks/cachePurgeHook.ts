import { resolve6 } from "dns/promises";
import { AfterChangeHook as CollectionAfterChangeHook } from "payload/dist/collections/config/types";
import { AfterChangeHook as GlobalAfterChangeHook } from "payload/dist/globals/config/types";

export function makeCachePurgeHook(dataUrl: string, primingUrl: string) {
  return async function ({
    req,
  }: Parameters<GlobalAfterChangeHook | CollectionAfterChangeHook>[0]) {
    // afterChangeHook runs before the transaction is committed
    // – so we need to commit it before refreshing the cache to avoid
    // that the app pulls old data when priming the cache
    // As suggested by the Payload team
    // See https://github.com/payloadcms/payload/issues/5886
    console.log("Committing transaction before refreshing cache.");
    const { payload, transactionID } = req;
    await payload.db.commitTransaction(transactionID);

    try {
      await refreshCacheForTarget(dataUrl, primingUrl);
    } catch (e) {
      console.error("Failed to refresh cache:", e);
    }
  };
}

async function refreshCacheForTarget(dataUrl: string, primingUrl: string) {
  if (!process.env.CACHE_REFRESH_TARGET_TYPE) {
    throw new Error("CACHE_REFRESH_TARGET is not set");
  }
  if (!process.env.CACHE_REFRESH_TARGET_ARG) {
    throw new Error("CACHE_REFRESH_TARGET_ARG is not set");
  }

  switch (process.env.CACHE_REFRESH_TARGET_TYPE) {
    case "single":
      await refreshCache(
        process.env.CACHE_REFRESH_TARGET_ARG,
        dataUrl,
        primingUrl,
      );
      return;

    case "fly":
      const [appName, internalPort] =
        process.env.CACHE_REFRESH_TARGET_ARG.split(",");
      await refreshCacheForFlyTarget(
        appName,
        internalPort,
        dataUrl,
        primingUrl,
      );
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
  dataUrl: string,
  primingUrl: string,
) {
  console.log(
    `Determining Fly frontend VM URLs for cache refresh (app=${appName}, internalPort=${internalPort})`,
  );

  const targetUrls = await queryFlyVmUrls(appName, parseInt(internalPort, 10));

  console.log(`Refreshing cache at ${targetUrls.length} frontend VMs`);

  const results = await Promise.allSettled(
    targetUrls.map((targetUrls) =>
      refreshCache(targetUrls, dataUrl, primingUrl),
    ),
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

async function refreshCache(
  targetUrl: string,
  dataUrl: string,
  primingUrl: string,
) {
  await purgeCache(targetUrl, dataUrl);
  await primeCache(targetUrl, primingUrl);
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

async function primeCache(targetUrl: string, primingUrl: string) {
  const absolutePrimingUrl = `${targetUrl}${primingUrl}`;
  console.log(`Priming cache at ${absolutePrimingUrl}...`);

  const response = await fetch(absolutePrimingUrl);
  if (!response.ok) {
    throw new Error(`Failed to prime cache at ${absolutePrimingUrl}`);
  }
}

function isPromiseRejectedResult(
  result: PromiseSettledResult<unknown>,
): result is PromiseRejectedResult {
  return result.status === "rejected";
}
