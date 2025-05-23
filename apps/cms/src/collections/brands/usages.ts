import { usagesField } from "@/fields/usages/config";
import { UsagesConfig } from "@/fields/usages/types";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "brands",
  collections: ["pages"],
};

export function brandUsagesField() {
  return usagesField(usagesConfig);
}
