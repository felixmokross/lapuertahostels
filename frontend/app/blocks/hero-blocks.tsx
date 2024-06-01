import { RichText } from "~/common/rich-text";
import { Slide, SlidesBlock } from "~/blocks/slides-block";
import { HeadingHighlight } from "~/components/heading";
import { HeroVideoBlock } from "~/blocks/hero-video-block";
import { Page } from "~/payload-types";

export type HeroBlocksProps = {
  data: NonNullable<Page["hero"]>;
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
              block.overlayTitle?.show
                ? {
                    children: (
                      <RichText HighlightComponent={HeadingHighlight}>
                        {block.overlayTitle.text!}
                      </RichText>
                    ),
                    overlay: block.overlayTitle.overlay || undefined,
                    position: block.overlayTitle.position || undefined,
                    cta: block.overlayTitle.cta?.show
                      ? {
                          text: block.overlayTitle.cta.text!,
                          to: block.overlayTitle.cta.url!,
                        }
                      : undefined,
                  }
                : undefined
            }
          />
        );
      case "Slides":
        return (
          <SlidesBlock
            key={block.id}
            slides={block.slides.map<Slide>((slide) => ({
              src: slide.image.url,
              alt: slide.image.alt,
              title: slide.overlayTitle?.show
                ? {
                    text: (
                      <RichText HighlightComponent={HeadingHighlight}>
                        {slide.overlayTitle.text!}
                      </RichText>
                    ),
                    position: slide.overlayTitle.position || undefined,
                    cta: slide.overlayTitle.cta?.show
                      ? {
                          text: slide.overlayTitle.cta.text!,
                          to: slide.overlayTitle.cta.url!,
                        }
                      : undefined,
                    imageOverlay: slide.overlayTitle?.overlay || undefined,
                  }
                : undefined,
              imageAlignment: slide.image.alignment || undefined,
            }))}
            transformation={{
              aspectRatio: { width: 4, height: 3 },
              width: 1600,
            }}
            autoplayIntervalInSeconds={
              block.autoplayIntervalInSeconds || undefined
            }
          />
        );
    }
  });
}
