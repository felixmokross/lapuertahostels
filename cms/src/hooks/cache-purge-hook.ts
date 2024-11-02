import { AfterChangeHook as CollectionAfterChangeHook } from "payload/dist/collections/config/types";
import { AfterChangeHook as GlobalAfterChangeHook } from "payload/dist/globals/config/types";
import { refreshCacheForTarget } from "../common/frontend-cache";

export async function cachePurgeHook(
  dataUrl: string,
  pageUrl: string,
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
    await refreshCacheForTarget({ type: "purge-and-prime", dataUrl, pageUrl });
  } catch (e) {
    console.error("Failed to refresh cache:", e);
  }
}
