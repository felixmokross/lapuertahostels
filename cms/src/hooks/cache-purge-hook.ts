import { AfterChangeHook as CollectionAfterChangeHook } from "payload/dist/collections/config/types";
import { AfterChangeHook as GlobalAfterChangeHook } from "payload/dist/globals/config/types";
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
  await payload.db.commitTransaction(transactionID);

  try {
    if (target.type === "target") {
      refreshCacheForTarget({
        type: "purge-and-prime",
        dataUrl: target.dataUrl,
        pageUrl: target.pageUrl,
      });
    } else {
      refreshCacheForAllPages(req, "purge-and-prime");
    }
  } catch (e) {
    console.error("Failed to refresh cache:", e);
  }
}
