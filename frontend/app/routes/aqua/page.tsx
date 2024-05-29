import { LayoutBlocks } from "~/blocks/layout-blocks";
import { HeroBlocks } from "~/blocks/hero-blocks";
import { Aqua } from "~/payload-types";

export type PageProps = {
  content: Omit<Aqua, "id">;
};

export function Page({ content }: PageProps) {
  return (
    <>
      {content.hero && <HeroBlocks data={content.hero} />}
      {content.layout && <LayoutBlocks data={content.layout} />}
    </>
  );
}
