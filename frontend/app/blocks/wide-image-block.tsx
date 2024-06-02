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
            "absolute max-w-md rounded-md bg-white px-8 pb-8 pt-5 shadow-lg",
            {
              "left-32 top-32": overlayTextBoxPosition === "top-left",
              "right-32 top-32": overlayTextBoxPosition === "top-right",
              "bottom-32 left-32": overlayTextBoxPosition === "bottom-left",
              "bottom-32 right-32": overlayTextBoxPosition === "bottom-right",
            },
          )}
        >
          <Heading as="h4" size="medium">
            {overlayTextBox.heading}
          </Heading>
          <RichTextParagraph className="mt-4">
            {overlayTextBox.text!}
          </RichTextParagraph>
          {overlayTextBox.cta?.show && (
            <Button
              as={Link}
              to={overlayTextBox.cta.url!}
              className="mt-8"
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
