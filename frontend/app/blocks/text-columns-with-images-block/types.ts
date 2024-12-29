import { Page } from "~/payload-types";

export type TextColumnsWithImagesBlock = NonNullable<Page["layout"]>[number] & {
  blockType: "TextColumnsWithImages";
};
