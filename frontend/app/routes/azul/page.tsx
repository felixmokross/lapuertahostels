import { RichText } from "~/common/rich-text";
import { Carousel } from "~/components/carousel";
import { FeaturesSection } from "~/components/features-section";
import { HeadingHighlight } from "~/components/heading";
import { ParagraphHighlight } from "~/components/paragraph";
import { Azul } from "~/payload-types";

export type PageProps = {
  content: Azul;
};

export function Page({ content }: PageProps) {
  return (
    <>
      <Carousel
        items={content.slides.map((slide) => ({
          src: slide.imageUrl,
          alt: slide.imageAlt,
          position: slide.imagePosition || undefined,
          title: {
            text: (
              <RichText HighlightComponent={HeadingHighlight}>
                {slide.title}
              </RichText>
            ),
            position: slide.titlePosition || undefined,
            imageOverlay: slide.imageOverlay || undefined,
            cta: { text: content.slideCta, to: slide.ctaUrl },
          },
        }))}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 1600,
        }}
      />
      <div className="mx-auto mt-12 max-w-6xl px-8 md:mt-24 lg:px-0">
        <FeaturesSection
          items={content.features.map((feature) => ({
            image: {
              src: feature.imageUrl,
              alt: feature.imageAlt,
            },
            title: feature.title,
            paragraphContent: (
              <RichText HighlightComponent={ParagraphHighlight}>
                {feature.text}
              </RichText>
            ),
          }))}
        />
      </div>
    </>
  );
}
