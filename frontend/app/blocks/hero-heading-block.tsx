import { Page, Text } from "@lapuertahostels/shared";
import { SlideImage } from "./slides-block/slide-image";
import { OverlayTitle } from "./common/overlay-title";
import { Heading } from "~/common/heading";
import { richTextRoot, paragraph, text } from "~/common/rich-text.builders";
import { gracefully } from "~/common/utils";

type HeroHeadingBlockProps = Partial<
  NonNullable<Page["hero"]>[number] & {
    blockType: "HeroHeading";
  }
>;

export function HeroHeadingBlock({ heading, image }: HeroHeadingBlockProps) {
  const headingText = gracefully(heading, "text");
  return image ? (
    <div className="relative min-h-72 shadow-md md:min-h-96">
      <SlideImage media={image} withPreview={true} alignment="center" />
      <OverlayTitle
        headingLevel={2}
        position="center"
        text={
          headingText
            ? ({
                richText: richTextRoot(paragraph(text(headingText))),
              } as unknown as Text)
            : undefined
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
        {headingText}
      </Heading>
    </div>
  );
}
