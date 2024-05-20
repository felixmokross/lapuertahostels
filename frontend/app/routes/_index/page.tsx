import { RichText, RichTextParagraph } from "~/common/rich-text";
import { Carousel } from "~/components/carousel";
import { HeadingHighlight, Heading } from "~/components/heading";
import { StoryBlock } from "~/components/story-block";
import { Brand, Home } from "~/payload-types";
import { ImageWithFloatingTextBlock } from "~/components/image-with-floating-text-block";
import { AccommodationSelectorBlock } from "~/components/accommodation-selector-block";

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

      <div className="mx-auto mt-12 max-w-4xl px-8 md:mt-24 lg:px-0">
        <Heading as="h1" size="medium">
          {content.intro.heading}
        </Heading>
        <RichTextParagraph justify size="extra-large" className="mt-4 md:mt-6">
          {content.intro.text}
        </RichTextParagraph>
      </div>

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

      <ImageWithFloatingTextBlock
        id="santa-marta"
        className="mt-14 lg:mt-32"
        heading={content.aboutSantaMarta.heading}
        text={content.aboutSantaMarta.text}
        image={{
          src: content.aboutSantaMarta.imageUrl,
          alt: content.aboutSantaMarta.imageAlt,
        }}
      />

      <StoryBlock
        className="mb-20 mt-24 lg:mt-72"
        id="about-us"
        heading={content.aboutUs.heading}
        text={content.aboutUs.text}
        image={{
          src: content.aboutUs.imageUrl,
          alt: content.aboutUs.imageAlt,
          grayscale: content.aboutUs.grayscale || false,
        }}
      />
    </>
  );
}
