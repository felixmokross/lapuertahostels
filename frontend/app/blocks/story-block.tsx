import { RichTextParagraphGroup } from "~/common/rich-text";
import { Heading } from "../common/heading";
import { Image } from "../common/image";
import { cn } from "../common/cn";
import { Page } from "~/payload-types";

export type StoryBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "Story";
};

export function StoryBlock({
  heading,
  image,
  text,
  elementId,
}: StoryBlockProps) {
  const imagePosition = image.position || "left";
  return (
    <div
      id={elementId || undefined}
      className={
        "mx-auto mb-24 mt-20 max-w-4xl lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-16"
      }
    >
      <div
        className={cn("px-8 lg:px-0", {
          "lg:order-last": imagePosition === "left",
          "lg:order-first": imagePosition === "right",
        })}
      >
        <Heading as="h3" size="medium">
          {heading}
        </Heading>
        <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
          <RichTextParagraphGroup justify>{text}</RichTextParagraphGroup>
        </div>
      </div>
      <div
        className={cn(
          "mx-auto mt-32 aspect-[3/4] max-w-xs overflow-hidden rounded-md shadow-lg lg:mt-0 lg:max-w-none",
          {
            "-rotate-6 lg:-ml-10 lg:mr-12": imagePosition === "left",
            "rotate-6 lg:-mr-10 lg:ml-12": imagePosition === "right",
          },
        )}
      >
        <Image
          src={image.url}
          alt={image.alt || undefined}
          className="h-full w-full object-cover"
          transformation={{
            aspectRatio: { width: 3, height: 4 },
            width: 400,
            enhancement: image.grayscale ? "grayscale" : undefined,
          }}
          layout="responsive"
          srcMultiplier={5}
          sizes="(min-width: 896px) 448px, 320px"
          loading="lazy"
        />
      </div>
    </div>
  );
}
