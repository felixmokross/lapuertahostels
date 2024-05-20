import { RichText } from "~/common/rich-text";
import { Carousel } from "~/components/carousel";
import { HeadingHighlight } from "~/components/heading";
import { Azul } from "~/payload-types";
import { Blocks } from "~/blocks/blocks";

export type PageProps = {
  content: Omit<Azul, "id">;
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
        {content.layout && <Blocks data={content.layout} />}
      </div>
    </>
  );
}
