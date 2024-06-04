import { Page } from "~/payload-types";
import { Image } from "~/common/image";
import { Heading } from "~/common/heading";
import { Button } from "~/common/button";
import { RichTextParagraph } from "~/common/rich-text";
import { Link } from "~/common/link";
import { cn } from "~/common/cn";

export type WideImageBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "WideImage";
};

export function WideImageBlock({ image, overlayTextBox }: WideImageBlockProps) {
  const overlayTextBoxPosition = overlayTextBox?.position || "top-left";
  return (
    <div className="relative my-44 h-[25rem] md:h-[35rem]">
      <Image
        src={image.url}
        alt={image.alt}
        transformation={{
          aspectRatio: { width: 4, height: 3 },
          width: 3200,
        }}
        className="h-full w-full object-cover"
      />
      {overlayTextBox?.show && (
        <div
          className={cn(
            "absolute max-w-md rounded-md bg-white px-6 pb-6 pt-3 shadow-lg md:px-8 md:pb-8 md:pt-5",
            {
              "left-8 top-8 md:left-12 md:top-12 xl:left-20 xl:top-20":
                overlayTextBoxPosition === "top-left",
              "right-8 top-8 md:right-12 md:top-12 xl:right-20 xl:top-20":
                overlayTextBoxPosition === "top-right",
              "bottom-8 left-8 md:bottom-12 md:left-12 xl:bottom-20 xl:left-20":
                overlayTextBoxPosition === "bottom-left",
              "bottom-8 right-8 md:bottom-12 md:right-12 xl:bottom-20 xl:right-20":
                overlayTextBoxPosition === "bottom-right",
            },
          )}
        >
          <Heading as="h4" size="small">
            {overlayTextBox.heading}
          </Heading>
          <RichTextParagraph className="mt-1 md:mt-2">
            {overlayTextBox.text!}
          </RichTextParagraph>
          {overlayTextBox.cta?.show && (
            <Button
              as={Link}
              to={overlayTextBox.cta.url!}
              className="mt-3 md:mt-4"
              variant={overlayTextBox.cta.variant || undefined}
            >
              {overlayTextBox.cta.text}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
