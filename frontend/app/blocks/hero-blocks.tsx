import { RichText } from "~/common/rich-text";
import { Carousel } from "~/components/carousel";
import { HeadingHighlight } from "~/components/heading";
import { HeroVideoBlock } from "~/blocks/hero-video-block";
import { Home } from "~/payload-types";

export type HeroBlocksProps = {
  data: NonNullable<Home["hero"]>;
};

export function HeroBlocks({ data }: HeroBlocksProps) {
  return data.map((block) => {
    switch (block.blockType) {
      case "HeroVideo":
        return (
          <HeroVideoBlock
            key={block.id}
            src={block.videoUrl}
            previewSrc={block.previewUrl || undefined}
            overlayTitle={
              block.showOverlayTitle
                ? {
                    children: (
                      <RichText HighlightComponent={HeadingHighlight}>
                        {block.overlayTitle!.text!}
                      </RichText>
                    ),
                    overlay: block.overlayTitle!.overlay || undefined,
                    position: block.overlayTitle!.position || undefined,
                    cta: block.overlayTitle!.showCta
                      ? {
                          text: block.overlayTitle!.cta!.text,
                          to: block.overlayTitle!.cta!.url,
                        }
                      : undefined,
                  }
                : undefined
            }
          />
        );
      case "Slides":
        return (
          <Carousel
            key={block.id}
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
              position: slide.imagePosition || undefined,
            }))}
            transformation={{
              aspectRatio: { width: 4, height: 3 },
              width: 1600,
            }}
          />
        );
    }
  });
}
