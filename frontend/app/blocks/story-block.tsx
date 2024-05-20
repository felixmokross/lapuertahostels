import { RichTextObject, RichTextParagraphGroup } from "~/common/rich-text";
import { Heading } from "../components/heading";
import { Image } from "../components/image";
import { cn } from "../components/cn";

export type StoryBlockProps = {
  heading: string;
  text: RichTextObject;
  image: {
    src: string;
    alt: string;
    grayscale?: boolean;
    position?: "left" | "right";
  };
  className?: string;
  id?: string;
};

export function StoryBlock({
  heading,
  text,
  image,
  className,
  id,
}: StoryBlockProps) {
  const imagePosition = image.position || "left";
  return (
    <div
      id={id}
      className={cn(
        "mx-auto max-w-4xl lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-16",
        className,
      )}
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
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
          transformation={{
            aspectRatio: { width: 3, height: 4 },
            width: 1600,
            enhancement: image.grayscale ? "grayscale" : undefined,
          }}
        />
      </div>
    </div>
  );
}
