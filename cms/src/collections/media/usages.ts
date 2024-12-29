import { findUsages, usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";
import { Payload } from "payload";

const usagesConfig: UsagesConfig = {
  fieldType: "upload",
  collectionToFind: "media",
  collections: ["brands", "pages"],
};

export async function findMediaUsages(id: string, payload: Payload) {
  return await findUsages(usagesConfig, id, payload);
}

export function mediaUsagesField() {
  return usagesField(usagesConfig);
}
