import { usagesField } from "@/fields/usages";
import { UsagesConfig } from "@/fields/usages/types";

const usagesConfig: UsagesConfig = {
  fieldType: "relationship",
  collectionToFind: "banners",
  collections: ["brands"],
};

export function bannerUsagesField() {
  return usagesField(usagesConfig);
}
