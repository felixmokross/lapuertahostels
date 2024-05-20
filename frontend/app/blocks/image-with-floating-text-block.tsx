import {
  RichTextHeading,
  RichTextObject,
  RichTextParagraph,
} from "~/common/rich-text";
import { Image } from "~/components/image";
import { cn } from "../components/cn";

export type ImageWithFloatingTextBlockProps = {
  heading: RichTextObject;
  text: RichTextObject;
  textPosition?: "left" | "right";
  image: {
    src: string;
    alt: string;
    overlay?: "subtle" | "moderate" | "intense";
  };
  id?: string;
  className?: string;
};

export function ImageWithFloatingTextBlock({
  heading,
  text,
  textPosition = "right",
  image,
  id,
  className,
}: ImageWithFloatingTextBlockProps) {
  const imageOverlay = image.overlay || "moderate";
  return (
    <div className={cn("relative mx-auto lg:max-w-4xl", className)} id={id}>
      <div className="h-[32rem] overflow-hidden shadow-md lg:rounded-lg">
        <Image
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
          transformation={{
            width: 1000,
            aspectRatio: { width: 16, height: 9 },
            cropStrategy: "maintain_ratio",
            focus: "auto",
          }}
        />
        <div
          className={cn(
            "absolute inset-0 flex bg-gradient-to-t from-transparent to-black/40 px-6 py-4 md:px-8 md:py-6 lg:rounded-lg",
            {
              "to-black/30": imageOverlay === "subtle",
              "to-black/40": imageOverlay === "moderate",
              "to-black/50": imageOverlay === "intense",
            },
            {
              "justify-start": textPosition === "right",
              "justify-end": textPosition === "left",
            },
          )}
        >
          <RichTextHeading
            as="h3"
            size="extra-large"
            variant="white"
            textShadow
          >
            {heading}
          </RichTextHeading>
        </div>
      </div>
      <div
        className={cn("lg:absolute lg:inset-0 lg:flex lg:items-end", {
          "lg:justify-end": textPosition === "right",
          "lg:justify-start": textPosition === "left",
        })}
      >
        <div
          className={cn(
            "from-puerta-100 to-puerta-300 px-8 py-6 shadow-lg md:mx-auto md:max-w-lg md:-translate-y-32 md:rounded-md md:px-6 md:py-4 lg:mx-0 lg:translate-y-20",
            {
              "bg-gradient-to-bl lg:translate-x-12": textPosition === "right",
              "bg-gradient-to-br lg:-translate-x-12": textPosition === "left",
            },
          )}
        >
          <RichTextParagraph variant="puerta" justify>
            {text}
          </RichTextParagraph>
        </div>
      </div>
    </div>
  );
}
