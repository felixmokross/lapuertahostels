import { MediaImage } from "~/common/media";
import { TextColumnsWithImagesBlock } from "./types";
import { Button } from "~/common/button";
import { PageLink } from "~/common/page-link";
import { cn } from "~/common/cn";
import { Heading, HeadingProps } from "~/common/heading";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";
import { Text } from "~/payload-types";

export type TextWithImageItemProps =
  TextColumnsWithImagesBlock["items"][number] & {
    imageSizes?: string;
    imageWidth?: number;
    headingLevel: number;
  };

export function TextWithImageItem({
  image,
  heading,
  headingLevel,
  text,
  cta,
  size,
  imageSizes,
  imageWidth,
}: TextWithImageItemProps) {
  size = size ?? "full";

  if (heading != null && typeof heading !== "object") {
    throw new Error("Invalid heading");
  }

  if (text != null && typeof text !== "object") {
    throw new Error("Invalid text");
  }

  if (cta?.show && cta.label && typeof cta.label !== "object") {
    throw new Error("Invalid CTA label");
  }

  return (
    <div
      className={cn("text-center", {
        "px-16": size === "small",
        "px-8": size === "medium",
      })}
    >
      {image && (
        <MediaImage
          className="aspect-[9/10] rounded-md object-cover shadow-lg"
          media={image}
          layout="responsive"
          transformation={{
            width: imageWidth,
            aspectRatio: { width: 9, height: 10 },
          }}
          sizes={imageSizes}
          srcMultiplier={5}
        />
      )}
      {heading && (
        <Heading
          as={`h${headingLevel}` as HeadingProps["as"]}
          size="small"
          className={cn(image && "mt-8")}
        >
          {heading.text}
        </Heading>
      )}
      {text && (
        <RichTextParagraph
          size="medium"
          className={cn(heading ? "mt-2" : image ? "mt-8" : false)}
        >
          {text.richText as unknown as RichTextObject}
        </RichTextParagraph>
      )}
      {cta?.show && (
        <Button
          as={PageLink}
          link={cta.link!}
          size="medium"
          variant={cta.variant ?? "secondary"}
          className={cn((image || heading || text) && "mt-6")}
        >
          {(cta.label as Text).text}
        </Button>
      )}
    </div>
  );
}
