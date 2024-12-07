import { NewPage, Text } from "~/payload-types";
import { SlideImage } from "./slides-block/slide-image";
import { OverlayTitle } from "./common/overlay-title";
import { Heading } from "~/common/heading";
import { getSrcFromMedia } from "~/common/media";
import { richTextRoot, paragraph, text } from "~/common/rich-text.builders";

type HeroHeadingBlockProps = NonNullable<NewPage["hero"]>[number] & {
  blockType: "HeroHeading";
};

export function HeroHeadingBlock({ heading, image }: HeroHeadingBlockProps) {
  if (heading != null && typeof heading !== "object") {
    throw new Error("Invalid heading");
  }

  if (heading != null && heading.type !== "plainText") {
    throw new Error("Heading must be plain text");
  }

  if (image != null && typeof image !== "object") {
    throw new Error("Invalid image");
  }

  return image ? (
    <div className="relative min-h-72 shadow-md md:min-h-96">
      <SlideImage
        src={getSrcFromMedia(image)}
        alt={image.alt ?? undefined}
        withPreview={true}
        alignment="center"
      />
      <OverlayTitle
        headingLevel={2}
        position="center"
        text={
          {
            richText: richTextRoot(paragraph(text(heading.text!))),
          } as unknown as Text
        }
        overlay="intense"
      />
    </div>
  ) : (
    <div className="flex min-h-28 items-end justify-center px-8 py-4 text-neutral-700 md:min-h-40 md:py-8">
      <Heading
        size="medium"
        as="h2"
        variant="inherit"
        className="border-b-2 border-neutral-300 pb-2 text-center"
      >
        {heading.text}
      </Heading>
    </div>
  );
}
