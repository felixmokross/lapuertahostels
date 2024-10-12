import { Heading } from "../common/heading";
import { Image } from "../common/image";
import { cn } from "../common/cn";
import { RichText, RichTextObject, RichTextProps } from "~/common/rich-text";
import { Paragraph } from "~/common/paragraph";
import { PropsWithChildren } from "react";
import { Link } from "~/common/link";
import { Page } from "~/payload-types";
import { TextHighlight } from "~/common/text-highlight";

export type StoryBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "Story";
};

export function StoryBlock({
  heading,
  image,
  text,
  elementId,
}: StoryBlockProps) {
  const imagePosition = image ? (image.position ?? "left") : undefined;
  return (
    <div
      id={elementId || undefined}
      className={cn(
        image?.show &&
          "lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-16",
        "mx-auto mb-24 mt-20 max-w-4xl",
      )}
    >
      <div
        className={cn("px-8 lg:px-0", {
          "lg:order-last": imagePosition === "left",
          "lg:order-first": imagePosition === "right",
        })}
      >
        {heading && (
          <Heading as="h3" size="medium">
            {heading}
          </Heading>
        )}
        <div className={cn(heading && "mt-4 md:mt-6")}>
          <RichText
            content={text as RichTextObject}
            elements={richTextElements}
          />
        </div>
      </div>
      {image?.show && (
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
            src={image.url!}
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
      )}
    </div>
  );
}

const richTextElements: RichTextProps["elements"] = {
  bold: (props: PropsWithChildren) => (
    <TextHighlight variant="neutral" {...props} />
  ),
  h4: (props: PropsWithChildren) => (
    <Heading {...props} as="h4" size="small" className="mt-6 md:mt-8" />
  ),
  h5: (props: PropsWithChildren) => (
    <Heading {...props} as="h5" size="extra-small" className="mt-6 md:mt-8" />
  ),
  paragraph: (props: PropsWithChildren) => (
    <Paragraph {...props} justify className="mt-2 md:mt-3" />
  ),
  li: (props: PropsWithChildren) => (
    <li {...props} className="my-2 ms-6 list-disc" />
  ),
  link: ({ href, ...props }: PropsWithChildren<{ href: string }>) => (
    <Link
      {...props}
      className="text-puerta-600 hover:text-puerta-700 hover:underline active:text-puerta-700 active:underline"
      to={href}
    />
  ),
};
