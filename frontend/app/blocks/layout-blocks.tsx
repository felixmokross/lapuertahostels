import { Brand, Home } from "~/payload-types";
import { AccommodationSelectorBlock } from "./accommodation-selector-block";
import { ImageWithFloatingTextBlock } from "./image-with-floating-text-block";
import { LeadBlock } from "./lead-block";
import { StoryBlock } from "./story-block";
import { FeaturesBlock } from "./features-block";
import { RichText } from "~/common/rich-text";
import { ParagraphHighlight } from "~/components/paragraph";

type LayoutBlocksProps = {
  data: NonNullable<Home["layout"]>;
};

export function LayoutBlocks({ data }: LayoutBlocksProps) {
  return data.map((block) => {
    switch (block.blockType) {
      case "Lead":
        return (
          <LeadBlock
            key={block.id}
            id={block.elementId || undefined}
            heading={block.heading}
            text={block.text}
          />
        );
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
        return (
          <StoryBlock
            key={block.id}
            id={block.elementId || undefined}
            heading={block.heading}
            text={block.text}
            image={{
              src: block.imageUrl,
              alt: block.imageAlt,
              position: block.imagePosition || undefined,
              grayscale: block.grayscale || false,
            }}
          />
        );
      case "Features":
        return (
          <FeaturesBlock
            key={block.id}
            id={block.elementId || undefined}
            items={block.items?.map((item) => ({
              image: { src: item.imageUrl, alt: item.imageAlt },
              title: item.title,
              paragraphContent: (
                <RichText HighlightComponent={ParagraphHighlight}>
                  {item.text}
                </RichText>
              ),
            }))}
          />
        );
    }
  });
}
