import { NewPage, Text } from "~/payload-types";
import { Image } from "~/common/image";
import { Heading } from "~/common/heading";
import { Button } from "~/common/button";
import { RichTextParagraph } from "~/common/paragraph";
import { cn } from "~/common/cn";
import { RichTextObject } from "~/common/rich-text";
import { getSrcFromMedia } from "~/common/media";
import { PageLink } from "~/common/page-link";

export type WideImageBlockProps = NonNullable<NewPage["layout"]>[number] & {
  blockType: "WideImage";
};

export function WideImageBlock({ image, overlayTextBox }: WideImageBlockProps) {
  const overlayTextBoxPosition = overlayTextBox?.position || "top-left";

  if (typeof image !== "object") {
    throw new Error("Invalid image");
  }

  if (overlayTextBox?.show && typeof overlayTextBox.heading !== "object") {
    throw new Error("Invalid overlayTextBox.heading");
  }

  if (overlayTextBox?.show && typeof overlayTextBox.text !== "object") {
    throw new Error("Invalid overlayTextBox.text");
  }

  if (
    overlayTextBox?.cta?.show &&
    typeof overlayTextBox.cta.label !== "object"
  ) {
    throw new Error("Invalid overlayTextBox.cta.label");
  }

  return (
    <div className="my-44 flex flex-col-reverse gap-4 md:relative md:h-[35rem]">
      <Image
        src={getSrcFromMedia(image)}
        alt={image.alt ?? undefined}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 800,
        }}
        className="h-[35rem] w-full object-cover md:h-full"
        layout="responsive"
        srcMultiplier={6}
        sizes="100vw"
      />
      {overlayTextBox?.show && (
        <div
          className={cn(
            "w-full bg-white px-6 pb-6 pt-3 text-center md:absolute md:w-auto md:max-w-md md:rounded-md md:px-8 md:pb-8 md:pt-5 md:text-left md:shadow-lg",
            {
              "md:left-12 md:top-12 xl:left-20 xl:top-20":
                overlayTextBoxPosition === "top-left",
              "md:right-12 md:top-12 xl:right-20 xl:top-20":
                overlayTextBoxPosition === "top-right",
              "md:bottom-12 md:left-12 xl:bottom-20 xl:left-20":
                overlayTextBoxPosition === "bottom-left",
              "md:bottom-12 md:right-12 xl:bottom-20 xl:right-20":
                overlayTextBoxPosition === "bottom-right",
            },
          )}
        >
          <Heading as="h3" size="small">
            {(overlayTextBox.heading as Text).text}
          </Heading>
          <RichTextParagraph className="mt-2">
            {
              (overlayTextBox.text as Text)
                .richText as unknown as RichTextObject
            }
          </RichTextParagraph>
          {overlayTextBox.cta?.show && (
            <Button
              as={PageLink}
              link={overlayTextBox.cta.link!}
              variant={overlayTextBox.cta.variant || undefined}
              className="mt-4"
            >
              {(overlayTextBox.cta.label as Text).text}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
