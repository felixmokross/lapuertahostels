import { Page } from "~/payload-types";
import { AccommodationSelectorBlock } from "./accommodation-selector-block";
import { ImageWithFloatingTextBlock } from "./image-with-floating-text-block";
import { LeadBlock } from "./lead-block";
import { StoryBlock } from "./story-block";
import { FeaturesBlock } from "./features-block/features-block";
import { SeparatorBlock } from "./separator-block";
import { WideImageBlock } from "./wide-image-block";
import { RoomListBlock } from "./room-list-block/room-list-block";

type LayoutBlocksProps = {
  data: NonNullable<Page["layout"]>;
};

export function LayoutBlocks({ data }: LayoutBlocksProps) {
  return data.map((block) => {
    switch (block.blockType) {
      case "Lead":
        return <LeadBlock key={block.id} {...block} />;
      case "AccommodationSelector":
        return <AccommodationSelectorBlock key={block.id} {...block} />;
      case "ImageWithFloatingText":
        return <ImageWithFloatingTextBlock key={block.id} {...block} />;
      case "Story":
        return <StoryBlock key={block.id} {...block} />;
      case "Features":
        return <FeaturesBlock key={block.id} {...block} />;
      case "Separator":
        return <SeparatorBlock key={block.id} />;
      case "WideImage":
        return <WideImageBlock key={block.id} {...block} />;
      case "RoomList":
        return <RoomListBlock key={block.id} {...block} />;
    }
  });
}
