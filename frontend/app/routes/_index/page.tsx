import { RichText } from "~/common/rich-text";
import { Carousel } from "~/components/carousel";
import { HeadingHighlight } from "~/components/heading";
import { Home } from "~/payload-types";
import { Blocks } from "~/blocks/blocks";
import { HeroVideo } from "~/components/hero-video";

export type PageProps = {
  content: Home;
};

export function Page({ content }: PageProps) {
  return (
    <>
      {content.hero?.map((block) => {
        switch (block.blockType) {
          case "HeroVideo":
            return <HeroVideo key={block.id} src={block.videoUrl} />;
          case "Slides":
            return (
              <Carousel
                items={block.slides.map((slide) => ({
                  src: slide.imageUrl,
                  alt: slide.imageAlt,
                  title: {
                    text: (
                      <RichText HighlightComponent={HeadingHighlight}>
                        {slide.title}
                      </RichText>
                    ),
                    position: slide.titlePosition || undefined,
                    cta: { text: block.slideCta, to: slide.ctaUrl },
                    imageOverlay: slide.imageOverlay || undefined,
                  },
                }))}
                transformation={{
                  aspectRatio: { width: 4, height: 3 },
                  width: 1600,
                }}
              />
            );
        }
      })}

      {content.layout && <Blocks data={content.layout} />}
    </>
  );
}