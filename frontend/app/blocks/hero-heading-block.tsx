import { Media, Page } from "~/payload-types";
import { SlideImage } from "./slides-block/slide-image";
import { OverlayTitle } from "./common/overlay-title";
import { Heading } from "~/common/heading";
import { getSrcFromMedia } from "~/common/media";

type HeroHeadingBlockProps = NonNullable<Page["hero"]>[number] & {
  blockType: "HeroHeading";
};

export function HeroHeadingBlock({ heading, image }: HeroHeadingBlockProps) {
  const imageMedia = image as Media;
  return imageMedia ? (
    <div className="relative min-h-72 shadow-md md:min-h-96">
      <SlideImage
        src={getSrcFromMedia(imageMedia)}
        alt={imageMedia.alt ?? undefined}
        withPreview={true}
        alignment="center"
      />
      <OverlayTitle
        position="center"
        text={[{ children: [{ text: heading }] }]}
        overlay="intense"
      />
    </div>
  ) : (
    <div className="flex min-h-28 items-end justify-center py-4 text-neutral-700 md:min-h-40 md:py-8">
      <Heading
        size="medium"
        as="h1"
        variant="inherit"
        className="border-b-2 border-neutral-300"
      >
        {heading}
      </Heading>
    </div>
  );
}
