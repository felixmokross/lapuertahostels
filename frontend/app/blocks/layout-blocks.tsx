import { Brand, Page } from "~/payload-types";
import { AccommodationSelectorBlock } from "./accommodation-selector-block";
import { ImageWithFloatingTextBlock } from "./image-with-floating-text-block";
import { LeadBlock } from "./lead-block";
import { StoryBlock } from "./story-block";
import { FeaturesBlock } from "./features-block";

type LayoutBlocksProps = {
  data: NonNullable<Page["layout"]>;
};

export function LayoutBlocks({ data }: LayoutBlocksProps) {
  return data.map((block) => {
    switch (block.blockType) {
      case "Lead":
        return <LeadBlock key={block.id} {...block} />;
      case "AccommodationSelector":
        return (
          <AccommodationSelectorBlock
            key={block.id}
            id={block.elementId || undefined}
            heading={block.heading}
            text={block.text}
            accommodationCards={block.cards.map((card) => ({
              brand: card.brand as Brand,
              image: { src: card.image.url, alt: card.image.alt },
              description: card.description,
              id: card.id!,
            }))}
          />
        );
      case "ImageWithFloatingText":
        return (
          <ImageWithFloatingTextBlock
            key={block.id}
            id={block.elementId || undefined}
            heading={block.overlayTitle.text}
            text={block.text}
            textPosition={block.overlayTitle.position || undefined}
            image={{
              src: block.image.url,
              alt: block.image.alt,
              overlay: block.overlayTitle.overlay || undefined,
            }}
          />
        );
      case "Story":
        return <StoryBlock key={block.id} {...block} />;
      case "Features":
        return <FeaturesBlock key={block.id} {...block} />;
    }
  });
}
