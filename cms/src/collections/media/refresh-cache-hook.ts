import { Media, Text } from "@/payload-types";
import { CollectionAfterChangeHook, PayloadRequest } from "payload";
import { findMediaUsages } from "./usages";
import { getUniqueCollectionItemIds } from "@/fields/usages";
import {
  refreshCacheForAllBrands,
  refreshCacheForPages,
} from "@/hooks/refresh-cache-hook";

export function refreshCacheHook(): CollectionAfterChangeHook<Media> {
  return function ({ req, doc }) {
    console.log(`Refreshing cache asynchronously for media ${doc.id}`);

    refreshCacheForMedia(doc, req).catch((err) => {
      console.error(`Error refreshing cache for media ${doc.id}`, err);
    });
  };
}

async function refreshCacheForMedia(media: Media, req: PayloadRequest) {
  const usages = await findMediaUsages(media.id, req.payload);
  const brandIds = getUniqueCollectionItemIds(usages, "brands");

  if (brandIds.length > 0) {
    console.log(`Refreshing cache for all brands`);
    await refreshCacheForAllBrands(req);
  }

  const pageIds = getUniqueCollectionItemIds(usages, "new-pages");
  if (pageIds.length > 0) {
    console.log(`Refreshing cache for ${pageIds.length} pages`);
    await refreshCacheForPages(pageIds, req);
  }
}
