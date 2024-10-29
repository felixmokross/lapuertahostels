import { Button } from "~/common/button";
import { cn } from "~/common/cn";
import { Heading } from "~/common/heading";
import { MediaImage } from "~/common/media";
import { PageLink } from "~/common/page-link";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";
import { Page } from "~/payload-types";

export type TextColumnsWithImagesBlockProps = NonNullable<
  Page["layout"]
>[number] & {
  blockType: "TextColumnsWithImages";
};

export function TextColumnsWithImagesBlock({
  heading,
  text,
  items,
  numberOfColumnsPerRow,
  elementId,
}: TextColumnsWithImagesBlockProps) {
  return (
    <div className="my-36 px-8" id={elementId ?? undefined}>
      {heading && (
        <Heading as="h3" size="medium" className="text-center">
          {heading}
        </Heading>
      )}
      {text && (
        <RichTextParagraph
          size="large"
          className={cn(heading && "mt-2", "text-center")}
        >
          {text as RichTextObject}
        </RichTextParagraph>
      )}
      <div
        className={cn(
          (heading || text) && "mt-20",
          cn("grid gap-x-8 gap-y-16", {
            "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2":
              numberOfColumnsPerRow === 2,
            "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3":
              numberOfColumnsPerRow === 3,
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4":
              numberOfColumnsPerRow === 4,
          }),
        )}
      >
        {items.map((item) => (
          <TextWithImageItem
            key={item.id}
            {...item}
            imageSizes={
              numberOfColumnsPerRow === 2
                ? "(min-width: 1280px) 50vw, 100vw"
                : numberOfColumnsPerRow === 3
                  ? "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  : numberOfColumnsPerRow === 4
                    ? "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    : undefined
            }
            imageWidth={
              numberOfColumnsPerRow === 2
                ? 640
                : numberOfColumnsPerRow === 3
                  ? 430
                  : numberOfColumnsPerRow === 4
                    ? 320
                    : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

type TextWithImageItem = TextColumnsWithImagesBlockProps["items"][number] & {
  imageSizes?: string;
  imageWidth?: number;
};

function TextWithImageItem({
  image,
  heading,
  text,
  cta,
  size,
  imageSizes,
  imageWidth,
}: TextWithImageItem) {
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
