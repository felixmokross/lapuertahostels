import { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";
import {
  refreshCacheForAllPages,
  refreshCacheForTarget,
} from "../common/frontend-cache";

type CachePurgeTarget =
  | { type: "all-pages" }
  | {
      type: "target";
      dataUrl: string;
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
    await refreshCacheForTarget({
      type: "purge-and-prime",
      dataUrl: target.dataUrl,
      pageUrl: target.pageUrl,
    });
  } else {
    await refreshCacheForAllPages(req, "purge-and-prime");
  }
}
