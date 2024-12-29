import { Link } from "@/payload-types";
import { CollectionAfterChangeHook, PayloadRequest } from "payload";
import { findLinkUsages } from "./usages";
import { getUniqueCollectionItemIds, getUniqueGlobals } from "@/fields/usages";
import {
  refreshCacheForAllBrands,
  refreshCacheForGlobals,
  refreshCacheForPages,
} from "@/hooks/refresh-cache-hook";

export function refreshCacheHook(): CollectionAfterChangeHook<Link> {
  return function ({ req, doc }) {
    console.log(`Refreshing cache asynchronously for link ${doc.id}`);

    refreshCacheForLink(doc, req).catch((err) => {
      console.error(`Error refreshing cache for link ${doc.id}`, err);
    });
  };
}

async function refreshCacheForLink(link: Link, req: PayloadRequest) {
  const usages = await findLinkUsages(link.id, req.payload);

  const globals = getUniqueGlobals(usages);
  if (globals.length > 0) {
    console.log(`Refreshing cache for globals: ${globals.join(", ")}`);
    await refreshCacheForGlobals(globals, req);
  }

  const bannerIds = getUniqueCollectionItemIds(usages, "banners");
  const brandIds = getUniqueCollectionItemIds(usages, "brands");

  if (brandIds.length > 0 || bannerIds.length > 0) {
    // banners are inlined into brands, therefore banners and brands both use the 'all brands' cache key
    console.log(`Refreshing cache for all brands`);
    await refreshCacheForAllBrands(req);
  }

  const pageIds = getUniqueCollectionItemIds(usages, "pages");
  if (pageIds.length > 0) {
    console.log(`Refreshing cache for ${pageIds.length} pages`);
    await refreshCacheForPages(pageIds, req);
  }
}
