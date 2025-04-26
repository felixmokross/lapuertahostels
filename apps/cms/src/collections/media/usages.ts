import { usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";

const usagesConfig: UsagesConfig = {
  fieldType: "upload",
  collectionToFind: "media",
  collections: ["brands", "pages"],
};

export function mediaUsagesField() {
  return usagesField(usagesConfig);
}
