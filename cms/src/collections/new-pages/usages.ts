import { findUsages, usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";
import { Payload } from "payload";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "new-pages",
  collections: ["links"],
};

export async function findPageUsages(id: string, payload: Payload) {
  return await findUsages(usagesConfig, id, payload);
}

export function pageUsagesField() {
  return usagesField(usagesConfig);
}
