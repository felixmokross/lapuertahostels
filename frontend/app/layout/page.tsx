import { Page as PageItem } from "@lapuertahostels/shared";
import { LayoutBlocks } from "~/blocks/layout-blocks";
import { HeroBlocks } from "~/blocks/hero-blocks";

export type PageProps = {
  content: PageItem;
};

export function Page({ content }: PageProps) {
  return (
    <>
      {content.hero && <HeroBlocks data={content.hero} />}
      {content.layout && <LayoutBlocks data={content.layout} />}
    </>
  );
}
