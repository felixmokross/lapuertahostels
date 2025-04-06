import { Page } from "@lapuertahostels/payload-types";

export type TextColumnsWithImagesBlock = NonNullable<Page["layout"]>[number] & {
  blockType: "TextColumnsWithImages";
};
