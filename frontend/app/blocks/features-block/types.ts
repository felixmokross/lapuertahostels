import { NewPage } from "~/payload-types";

export type FeaturesBlock = NonNullable<NewPage["layout"]>[number] & {
  blockType: "Features";
};

export type Feature = FeaturesBlock["items"][number];
