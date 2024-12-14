import { findUsages, usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";
import { Payload } from "payload";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "brands",
  collections: ["new-pages"],
};

export async function findBrandUsages(id: string, payload: Payload) {
  return await findUsages(usagesConfig, id, payload);
}

export function brandUsagesField() {
  return usagesField(usagesConfig);
}
