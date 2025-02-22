import { Page } from "@lapuertahostels/shared";

export type FeaturesBlock = NonNullable<Page["layout"]>[number] & {
  blockType: "Features";
};

export type Feature = FeaturesBlock["items"][number];
