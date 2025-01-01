import { ComponentPropsWithoutRef, ComponentType, ElementType } from "react";
import { Button } from "~/common/button";
import { cn } from "~/common/cn";
import { Heading } from "~/common/heading";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text";
import { Text } from "~/payload-types";

type OverlayTextBoxProps<TCta extends ElementType = ElementType> = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | null;
  heading: Text;
  text: Text;
  cta?: {
    as: TCta;
    label: Text;
    variant: "primary" | "secondary";
    icon?: ComponentType<{ className?: string }>;
  } & Omit<ComponentPropsWithoutRef<TCta>, "as">;
};

export function OverlayTextBox({
  position,
  cta,
  heading,
  text,
}: OverlayTextBoxProps) {
  const overlayTextBoxPosition = position || "top-left";

  return (
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
        {(heading as Text).text}
      </Heading>
      <RichTextParagraph className="mt-2">
        {(text as Text).richText as unknown as RichTextObject}
      </RichTextParagraph>
      {cta && (
        <Button {...cta} className="mt-4">
          {(cta.label as Text).text}
        </Button>
      )}
    </div>
  );
}
