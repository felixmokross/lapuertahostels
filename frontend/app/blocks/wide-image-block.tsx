import { Page } from "~/payload-types";
import { Image } from "~/components/image";
import { Heading } from "~/components/heading";
import { Button } from "~/components/button";
import { RichTextParagraph } from "~/common/rich-text";
import { Link } from "~/components/link";
import { cn } from "~/components/cn";

export type WideImageBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "WideImage";
};

export function WideImageBlock({ image, overlayTextBox }: WideImageBlockProps) {
  const overlayTextBoxPosition = overlayTextBox?.position || "top-left";
  return (
    <div className="relative my-44">
      <Image
        src={image.url}
        alt={image.alt}
        transformation={{
          aspectRatio: { width: 2, height: 1 },
          width: 2000,
        }}
        className="h-full w-full object-cover"
      />
      {overlayTextBox?.show && (
        <div
          className={cn(
            "absolute max-w-md rounded-md bg-white px-6 pb-6 pt-3 shadow-lg md:px-8 md:pb-8 md:pt-5",
            {
              "left-8 top-8 md:left-16 md:top-16 xl:left-32 xl:top-32":
                overlayTextBoxPosition === "top-left",
              "right-8 top-8 md:right-16 md:top-16 xl:right-32 xl:top-32":
                overlayTextBoxPosition === "top-right",
              "bottom-8 left-8 md:bottom-16 md:left-16 xl:bottom-32 xl:left-32":
                overlayTextBoxPosition === "bottom-left",
              "bottom-8 right-8 md:bottom-16 md:right-16 xl:bottom-32 xl:right-32":
                overlayTextBoxPosition === "bottom-right",
            },
          )}
        >
          <Heading as="h4" size="medium">
            {overlayTextBox.heading}
          </Heading>
          <RichTextParagraph className="mt-2 md:mt-4">
            {overlayTextBox.text!}
          </RichTextParagraph>
          {overlayTextBox.cta?.show && (
            <Button
              as={Link}
              to={overlayTextBox.cta.url!}
              className="mt-5 md:mt-8"
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
