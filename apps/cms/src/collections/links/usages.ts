import { usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "links",
  collections: ["pages", "banners", "brands"],
  globals: ["common"],
};

export function linkUsagesField() {
  return usagesField(usagesConfig);
}
