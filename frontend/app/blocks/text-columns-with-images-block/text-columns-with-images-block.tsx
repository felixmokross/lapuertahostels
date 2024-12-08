import { cn } from "~/common/cn";
import { Heading } from "~/common/heading";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";
import { type TextColumnsWithImagesBlock } from "./types";
import { TextWithImageItem } from "./text-with-image-item";

export type TextColumnsWithImagesBlockProps = TextColumnsWithImagesBlock;

export function TextColumnsWithImagesBlock({
  heading,
  text,
  items,
  numberOfColumns,
  elementId,
}: TextColumnsWithImagesBlockProps) {
  if (heading != null && typeof heading !== "object") {
    throw new Error("Invalid heading");
  }

  if (text != null && typeof text !== "object") {
    throw new Error("Invalid text");
  }

  return (
    <div className="my-36 px-8" id={elementId ?? undefined}>
      <div className="mx-auto max-w-4xl">
        {heading && (
          <Heading as="h3" size="medium" className="text-center">
            {heading.text}
          </Heading>
        )}
        {text && (
          <RichTextParagraph
            size="large"
            className={cn(heading && "mt-4 md:mt-6", "text-center")}
          >
            {text.richText as unknown as RichTextObject}
          </RichTextParagraph>
        )}
      </div>
      <div
        className={cn(
          (heading || text) && "mt-12",
          cn("grid gap-x-8 gap-y-16", {
            "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2":
              numberOfColumns === 2,
            "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3":
              numberOfColumns === 3,
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4":
              numberOfColumns === 4,
          }),
        )}
      >
        {items.map((item) => (
          <TextWithImageItem
            key={item.id}
            {...item}
            headingLevel={heading ? 4 : 3}
            imageSizes={
              numberOfColumns === 2
                ? "(min-width: 1280px) 50vw, 100vw"
                : numberOfColumns === 3
                  ? "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  : numberOfColumns === 4
                    ? "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    : undefined
            }
            imageWidth={
              numberOfColumns === 2
                ? 640
                : numberOfColumns === 3
                  ? 430
                  : numberOfColumns === 4
                    ? 320
                    : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
