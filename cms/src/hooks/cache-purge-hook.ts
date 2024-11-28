import { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";
import {
  refreshCacheForAllPages,
  refreshCacheForTarget,
} from "../common/frontend-cache";

type CachePurgeTarget =
  | { type: "all-pages" }
  | {
      type: "target";
      cacheKey: string;
      pageUrl: string;
    };

export async function cachePurgeHook(
  target: CachePurgeTarget,
  req: Parameters<GlobalAfterChangeHook | CollectionAfterChangeHook>[0]["req"],
) {
  refreshCache(target, req).catch((e) =>
    console.error("Failed to refresh cache:", e),
  );
}

async function refreshCache(
  target: CachePurgeTarget,
  req: Parameters<GlobalAfterChangeHook | CollectionAfterChangeHook>[0]["req"],
) {
  if (target.type === "target") {
    await refreshCacheForTarget(req, {
      type: "purge",
      cacheKey: target.cacheKey,
      pageUrl: target.pageUrl,
    });

    await refreshCacheForTarget(req, {
      type: "prime",
      pageUrl: target.pageUrl,
    });
  } else {
    await refreshCacheForAllPages(req, "purge-and-prime");
  }
}
