import { resolve6 } from "dns/promises";

export function makeCachePurgeHook(dataUrl: string, primingUrl: string) {
  return async function () {
    try {
      if (!process.env.CACHE_PURGE_TARGET_TYPE) {
        throw new Error("CACHE_PURGE_TARGET is not set");
      }
      if (!process.env.CACHE_PURGE_TARGET_ARG) {
        throw new Error("CACHE_PURGE_TARGET_ARG is not set");
      }

      switch (process.env.CACHE_PURGE_TARGET_TYPE) {
        case "single":
          await purgeAndPrimeCache(
            process.env.CACHE_PURGE_TARGET_ARG,
            dataUrl,
            primingUrl,
          );
          break;
        case "fly":
          const [appName, port] = process.env.CACHE_PURGE_TARGET_ARG.split(",");
          console.log(
            `Determining Fly frontend VM URLs for cache purge (app=${appName}, port=${port})`,
          );

          const targetUrls = await queryFlyVmUrls(appName, parseInt(port, 10));

          console.log(`Purging cache at ${targetUrls.length} frontend VMs`);

          const results = await Promise.allSettled(
            targetUrls.map((targetUrl) =>
              purgeAndPrimeCache(targetUrl, dataUrl, primingUrl),
            ),
          );
          const failed = results.filter(isPromiseRejectedResult);

          if (failed.length === 0) {
            console.log(
              `Successfully purged cache at ${targetUrls.length} frontend VMs`,
            );
          } else {
            console.error(
              `Failed to purge cache at ${failed.length} frontend VMs:\n${failed.map((r, i) => `[${i}] ${r}`).join("\n")}`,
            );
          }
          break;
        default:
          throw new Error(
            `Unsupported CACHE_PURGE_TARGET type: ${process.env.CACHE_PURGE_TARGET_TYPE}`,
          );
      }
    } catch (e) {
      console.error("Failed to purge cache:", e);
    }
  };
}

async function queryFlyVmUrls(appName: string, port: number) {
  const address = `global.${appName}.internal`;
  const ipv6s = await resolve6(address);
  const urls = ipv6s.map((ip) => `http://[${ip}]:${port}`);

  return urls;
}

async function purgeAndPrimeCache(
  targetUrl: string,
  dataUrl: string,
  primingUrl: string,
) {
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

  console.log(
    `Priming cache at ${targetUrl} using priming URL ${primingUrl}...`,
  );

  await fetch(`${targetUrl}/${primingUrl}`);

  if (!response.ok) {
    throw new Error(
      `Failed to prime cache at ${targetUrl} using priming URL ${primingUrl}`,
    );
  }
}

function isPromiseRejectedResult(
  result: PromiseSettledResult<unknown>,
): result is PromiseRejectedResult {
  return result.status === "rejected";
}
