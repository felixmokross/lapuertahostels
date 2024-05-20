import { RichText } from "~/common/rich-text";
import { Carousel } from "~/components/carousel";
import { HeadingHighlight } from "~/components/heading";
import { StoryBlock } from "~/blocks/story-block";
import { Brand, Home } from "~/payload-types";
import { ImageWithFloatingTextBlock } from "~/blocks/image-with-floating-text-block";
import { AccommodationSelectorBlock } from "~/blocks/accommodation-selector-block";
import { LeadBlock } from "~/blocks/lead-block";

export type PageProps = {
  content: Home;
};

export function Page({ content }: PageProps) {
  return (
    <>
      <Carousel
        items={content.slides.map((slide) => ({
          src: slide.imageUrl,
          alt: slide.imageAlt,
          title: {
            text: (
              <RichText HighlightComponent={HeadingHighlight}>
                {slide.title}
              </RichText>
            ),
            position: slide.titlePosition || undefined,
            cta: { text: content.slideCta, to: slide.ctaUrl },
            imageOverlay: slide.imageOverlay || undefined,
          },
        }))}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 1600,
        }}
      />

      <LeadBlock
        className="mt-12 md:mt-24"
        heading={content.intro.heading}
        text={content.intro.text}
      />

      <AccommodationSelectorBlock
        className="mt-14 md:mt-36"
        heading={content.accommodations.heading}
        text={content.accommodations.text}
        accommodationCards={content.accommodations.cards.map((card) => ({
          brand: card.brand as Brand,
          image: { src: card.imageUrl, alt: card.imageAlt },
          description: card.description,
          id: card.id!,
        }))}
      />

      {content.layout?.map((block) => {
        switch (block.blockType) {
          case "ImageWithFloatingText":
            return (
              <ImageWithFloatingTextBlock
                id={block.elementId || undefined}
                className="mt-14 lg:mt-32"
                heading={block.heading}
                text={block.text}
                image={{
                  src: block.imageUrl,
                  alt: block.imageAlt,
                }}
              />
            );
          case "Story":
            return (
              <StoryBlock
                key={block.id}
                className="mb-20 mt-24 lg:mt-72"
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
        }
      })}
    </>
  );
}
