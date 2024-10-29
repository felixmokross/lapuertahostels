import { MediaImage } from "~/common/media";
import { TextColumnsWithImagesBlock } from "./types";
import { Button } from "~/common/button";
import { PageLink } from "~/common/page-link";
import { cn } from "~/common/cn";
import { Heading } from "~/common/heading";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";

export type TextWithImageItemProps =
  TextColumnsWithImagesBlock["items"][number] & {
    imageSizes?: string;
    imageWidth?: number;
  };

export function TextWithImageItem({
  image,
  heading,
  text,
  cta,
  size,
  imageSizes,
  imageWidth,
}: TextWithImageItemProps) {
  size = size ?? "full";
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
        <Heading as="h4" size="small" className={cn(image && "mt-8")}>
          {heading}
        </Heading>
      )}
      {text && (
        <RichTextParagraph
          size="medium"
          className={cn((image || heading) && "mt-2")}
        >
          {text as RichTextObject}
        </RichTextParagraph>
      )}
      {cta?.show && (
        <Button
          as={PageLink}
          link={cta.link!}
          size="medium"
          variant={cta.variant ?? "secondary"}
          className={cn((image || heading || text) && "mt-6")}
        />
      )}
    </div>
  );
}
