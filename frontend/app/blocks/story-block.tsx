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
    grayscale: boolean;
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
  return (
    <div
      id={id}
      className={cn(
        "mx-auto max-w-4xl lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-16",
        className,
      )}
    >
      <div className="px-8 lg:order-last lg:px-0">
        <Heading as="h3" size="medium">
          {heading}
        </Heading>
        <div className="mt-4 space-y-3 md:mt-6 md:space-y-4">
          <RichTextParagraphGroup justify>{text}</RichTextParagraphGroup>
        </div>
      </div>
      <div className="mx-auto mt-32 aspect-[3/4] max-w-xs -rotate-6 overflow-hidden rounded-md shadow-lg lg:-ml-10 lg:mr-12 lg:mt-0 lg:max-w-none">
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
