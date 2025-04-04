import {
  CollectionAfterChangeHook,
  GlobalAfterChangeHook,
  GlobalSlug,
  PayloadRequest,
} from "payload";
import {
  getFullCollectionCacheKey,
  getGlobalCacheKey,
  getPageCacheKey,
  refreshCacheForTarget,
} from "../common/frontend-cache";
import { Link, Page } from "@/payload-types";

type CachePurgeTarget = {
  cacheKey: string;
  pageUrl: string;
};

export function refreshCacheHook(target: CachePurgeTarget) {
  return function ({
    req,
  }: {
    req: Parameters<
      GlobalAfterChangeHook | CollectionAfterChangeHook
    >[0]["req"];
  }) {
    console.log(`Refreshing cache asynchronously for ${target.cacheKey}`);
    refreshCache(target, req).catch((e) =>
      console.error("Failed to refresh cache:", e),
    );
  };
}

async function refreshCache(
  target: CachePurgeTarget,
  req: Parameters<GlobalAfterChangeHook | CollectionAfterChangeHook>[0]["req"],
) {
  await refreshCacheForTarget(req, {
    type: "purge",
    cacheKey: target.cacheKey,
  });

  await refreshCacheForTarget(req, {
    type: "prime",
    pageUrl: target.pageUrl,
  });
}

export async function refreshCacheForGlobals(
  globals: GlobalSlug[],
  req: PayloadRequest,
) {
  await Promise.all(
    globals.map((global) =>
      refreshCacheForTarget(req, {
        type: "purge",
        cacheKey: getGlobalCacheKey(global),
      }),
    ),
  );

  await refreshCacheForTarget(req, {
    type: "prime",
    pageUrl: "/",
  });
}

export async function refreshCacheForAllBrands(req: PayloadRequest) {
  const [brandsResult] = await Promise.all([
    req.payload.find({
      collection: "brands",
      pagination: false,
      depth: 2,
    }),
    refreshCacheForTarget(req, {
      type: "purge",
      cacheKey: getFullCollectionCacheKey("brands"),
    }),
  ]);

  await Promise.all(
    brandsResult.docs.map((brand) =>
      refreshCacheForTarget(req, {
        type: "prime",
        pageUrl: ((brand.homeLink as Link).page as Page).pathname,
      }),
    ),
  );
}

export async function refreshCacheForPages(
  pageIds: string[],
  req: PayloadRequest,
) {
  const pages = await Promise.all(
    pageIds.map((id) =>
      req.payload.findByID({
        collection: "pages",
        id,
      }),
    ),
  );

  await Promise.all(
    pages.map((page) =>
      refreshCache(
        {
          cacheKey: getPageCacheKey(page),
          pageUrl: page.pathname,
        },
        req,
      ),
    ),
  );
}
