import { SlidesBlock } from "~/blocks/slides-block";
import { HeroVideoBlock } from "~/blocks/hero-video-block";
import { Page } from "~/payload-types";

export type HeroBlocksProps = {
  data: NonNullable<Page["hero"]>;
};

export function HeroBlocks({ data }: HeroBlocksProps) {
  return data.map((block) => {
    switch (block.blockType) {
      case "HeroVideo":
        return <HeroVideoBlock key={block.id} {...block} />;
      case "Slides":
        return <SlidesBlock key={block.id} {...block} />;
    }
  });
}
