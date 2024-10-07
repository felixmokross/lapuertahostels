import { SlidesBlock } from "~/blocks/slides-block/slides-block";
import { HeroVideoBlock } from "~/blocks/hero-video-block";
import { Page } from "~/payload-types";
import { HeroHeadingBlock } from "./hero-heading-block";

export type HeroBlocksProps = {
  data: NonNullable<Page["hero"]>;
};

export function HeroBlocks({ data }: HeroBlocksProps) {
  return data.map((block) => {
    switch (block.blockType) {
      case "HeroHeading":
        return <HeroHeadingBlock key={block.id} {...block} />;
      case "HeroVideo":
        return <HeroVideoBlock key={block.id} {...block} />;
      case "Slides":
        return <SlidesBlock key={block.id} {...block} />;
    }
  });
}
