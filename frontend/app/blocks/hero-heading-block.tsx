import { Page } from "~/payload-types";
import { SlideImage } from "./slides-block/slide-image";
import { OverlayTitle } from "./common/overlay-title";
import { Heading } from "~/common/heading";
import { cn } from "~/common/cn";
import { useTheme } from "~/themes";

type HeroHeadingBlockProps = NonNullable<Page["hero"]>[number] & {
  blockType: "HeroHeading";
};

export function HeroHeadingBlock({ heading, image }: HeroHeadingBlockProps) {
  const theme = useTheme();
  return image?.show ? (
    <div className="relative min-h-72 shadow-md md:min-h-96">
      <SlideImage
        src={image.url!}
        alt={image.alt || undefined}
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
    <div
      className={cn(
        "flex min-h-28 items-center justify-center py-8 text-neutral-700 md:min-h-40",
        theme.lightBackgroundColor,
      )}
    >
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
