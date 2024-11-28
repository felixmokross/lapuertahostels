import { NewPage } from "~/payload-types";

export type TextColumnsWithImagesBlock = NonNullable<
  NewPage["layout"]
>[number] & {
  blockType: "TextColumnsWithImages";
};
