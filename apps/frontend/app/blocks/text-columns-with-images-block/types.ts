import { Page } from "@lapuertahostels/shared";

export type TextColumnsWithImagesBlock = NonNullable<Page["layout"]>[number] & {
  blockType: "TextColumnsWithImages";
};
