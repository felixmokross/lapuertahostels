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
  // afterChangeHook runs before the transaction is committed
  // – so we need to commit it before refreshing the cache to avoid
  // that the app pulls old data when priming the cache
  // As suggested by the Payload team
  // See https://github.com/payloadcms/payload/issues/5886
  console.log("Committing transaction before refreshing cache.");
  const { payload, transactionID } = req;
  if (!transactionID) throw new Error("No transaction ID found in request.");

  await payload.db.commitTransaction(transactionID);

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
