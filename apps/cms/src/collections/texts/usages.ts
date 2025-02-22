import { findUsages, usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";
import { Payload } from "payload";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "texts",
  collections: ["pages", "banners", "brands", "media"],
  globals: ["common", "maintenance"],
};

export async function findTextUsages(id: string, payload: Payload) {
  return await findUsages(usagesConfig, id, payload);
}

export function textUsagesField() {
  return usagesField(usagesConfig);
}
