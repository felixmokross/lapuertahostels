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
  textPosition?:
    | "center"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  image: {
    src: string;
    alt: string;
    overlay?: "subtle" | "moderate" | "intense";
  };
  id?: string;
};

export function ImageWithFloatingTextBlock({
  heading,
  text,
  textPosition = "top-left",
  image,
  id,
}: ImageWithFloatingTextBlockProps) {
  const imageOverlay = image.overlay || "moderate";
  return (
    <div
      className="relative mx-auto mb-20 mt-14 lg:mb-48 lg:mt-32 lg:max-w-4xl"
      id={id}
    >
      <div className="relative max-h-[32rem] overflow-hidden shadow-md lg:rounded-lg">
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
          loading="lazy"
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
            {heading}
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
            "from-puerta-100 to-puerta-300 px-8 py-6 shadow-lg md:mx-auto md:max-w-lg md:-translate-y-32 md:rounded-md md:px-6 md:py-4 lg:mx-0 lg:translate-y-20",
            {
              "bg-gradient-to-bl lg:translate-x-12":
                textPosition === "top-left",
              "bg-gradient-to-br lg:-translate-x-12":
                textPosition === "top-right",
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
