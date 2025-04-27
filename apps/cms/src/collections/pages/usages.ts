import { usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "pages",
  collections: ["pages", "banners", "brands", "redirects"],
  globals: ["common"],
};

export function pageUsagesField() {
  return usagesField(usagesConfig);
}
