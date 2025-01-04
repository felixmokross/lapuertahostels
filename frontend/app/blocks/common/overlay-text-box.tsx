import { ComponentPropsWithoutRef, ComponentType, ElementType } from "react";
import { Button } from "~/common/button";
import { cn } from "~/common/cn";
import { Heading } from "~/common/heading";
import { RichTextParagraph } from "~/common/paragraph";
import { RichTextObject } from "~/common/rich-text.model";
import { gracefully } from "~/common/utils";
import { Text } from "~/payload-types";

type OverlayTextBoxProps<TCta extends ElementType = ElementType> = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | null;
  heading: Text | string | null | undefined;
  text: Text | string | null | undefined;
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
        "w-full bg-white px-6 pb-6 pt-3 text-center lg:absolute lg:w-auto lg:max-w-xs lg:rounded-md lg:px-8 lg:pb-8 lg:pt-5 lg:text-left lg:shadow-lg xl:max-w-sm 2xl:max-w-md",
        {
          "lg:left-12 lg:top-12 xl:left-20 xl:top-20":
            overlayTextBoxPosition === "top-left",
          "lg:right-12 lg:top-12 xl:right-20 xl:top-20":
            overlayTextBoxPosition === "top-right",
          "lg:bottom-12 lg:left-12 xl:bottom-20 xl:left-20":
            overlayTextBoxPosition === "bottom-left",
          "lg:bottom-12 lg:right-12 xl:bottom-20 xl:right-20":
            overlayTextBoxPosition === "bottom-right",
        },
      )}
    >
      <Heading as="h3" size="small">
        {gracefully(heading, "text")}
      </Heading>
      <RichTextParagraph className="mt-2">
        {gracefully(text, "richText") as RichTextObject | undefined}
      </RichTextParagraph>
      {cta && (
        <Button {...cta} className="mt-4">
          {gracefully(cta.label, "text")}
        </Button>
      )}
    </div>
  );
}
