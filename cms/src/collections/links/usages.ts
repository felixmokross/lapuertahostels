import { findUsages, usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";
import { Payload } from "payload";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "links",
  collections: ["pages", "banners", "brands"],
  globals: ["common"],
};

export async function findLinkUsages(id: string, payload: Payload) {
  return await findUsages(usagesConfig, id, payload);
}

export function linkUsagesField() {
  return usagesField(usagesConfig);
}
