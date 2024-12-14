import { findUsages, usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";
import { Payload } from "payload";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "banners",
  collections: ["brands"],
};

export async function findBannerUsages(id: string, payload: Payload) {
  return await findUsages(usagesConfig, id, payload);
}

export function bannerUsagesField() {
  return usagesField(usagesConfig);
}
