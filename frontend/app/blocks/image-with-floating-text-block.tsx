import { RichTextParagraph } from "~/common/paragraph";
import { Image } from "~/common/image";
import { cn } from "../common/cn";
import { Page } from "~/payload-types";
import { useTheme } from "~/themes";
import { RichTextObject } from "~/common/rich-text";
import { RichTextHeading } from "~/common/heading";
import { getSrcFromMedia } from "~/common/media";

export type ImageWithFloatingTextBlockProps = NonNullable<
  Page["layout"]
>[number] & {
  blockType: "ImageWithFloatingText";
};

export function ImageWithFloatingTextBlock({
  overlayTitle,
  elementId,
  image,
  text,
}: ImageWithFloatingTextBlockProps) {
  const overlay = overlayTitle.overlay || "moderate";
  const textPosition = overlayTitle.position || "top-left";
  const theme = useTheme();
  if (typeof image !== "object") {
    throw new Error("Invalid image");
  }

  if (typeof overlayTitle.text !== "object") {
    throw new Error("Invalid overlay title");
  }

  if (typeof text !== "object") {
    throw new Error("Invalid text");
  }

  return (
    <div
      className="relative mx-auto mb-20 mt-14 lg:mb-48 lg:mt-32 lg:max-w-4xl"
      id={elementId || undefined}
    >
      <div className="relative aspect-[1/1] overflow-hidden shadow-md sm:aspect-[4/3] lg:aspect-[16/9] lg:rounded-lg">
        <Image
          src={getSrcFromMedia(image)}
          alt={image.alt ?? undefined}
          className="h-full w-full object-cover"
          transformation={{
            width: 900,
            aspectRatio: { width: 1, height: 1 },
            cropStrategy: "maintain_ratio",
            focus: "auto",
          }}
          loading="lazy"
          layout="responsive"
          srcMultiplier={4}
          sizes="(min-width: 1024px) 896px, 100vw"
        />
        <div
          className={cn(
            "absolute inset-0 flex bg-gradient-to-t from-transparent to-black/40 px-6 py-4 md:px-8 md:py-6 lg:rounded-lg",
            {
              "to-black/30": overlay === "subtle",
              "to-black/40": overlay === "moderate",
              "to-black/50": overlay === "intense",
            },
            {
              "justify-start": textPosition === "top-left",
              "justify-end": textPosition === "top-right",
            },
          )}
        >
          <RichTextHeading
            as="h3"
            size="extra-large"
            variant="white"
            textShadow
          >
            {overlayTitle.text.richText as RichTextObject}
          </RichTextHeading>
        </div>
      </div>
      <div
        className={cn("lg:absolute lg:inset-0 lg:flex lg:items-end", {
          "lg:justify-start": textPosition === "top-right",
          "lg:justify-end": textPosition === "top-left",
        })}
      >
        <div
          className={cn(
            "px-8 py-6 md:mx-auto md:max-w-lg md:-translate-y-32 md:rounded-md md:px-6 md:py-4 md:shadow-lg lg:mx-0 lg:translate-y-20",
            {
              "bg-gradient-to-bl lg:translate-x-12":
                textPosition === "top-left",
              "bg-gradient-to-br lg:-translate-x-12":
                textPosition === "top-right",
            },
            theme.strongBackgroundGradientColors,
          )}
        >
          <RichTextParagraph variant="brand" justify>
            {text.richText as RichTextObject}
          </RichTextParagraph>
        </div>
      </div>
    </div>
  );
}
