import { RichTextHeading } from "~/common/heading";
import { Button } from "../../common/button";
import { cn } from "../../common/cn";
import { MouseEventHandler } from "react";
import { RichTextObject } from "~/common/rich-text";
import { Page } from "~/payload-types";
import { PageLink } from "~/common/page-link";

export type OverlayTitleProps = {
  text?: { [key: string]: unknown }[] | null;
  cta?: NonNullable<
    (NonNullable<Page["hero"]>[number] & {
      blockType: "HeroVideo";
    })["overlayTitle"]
  >["cta"];
  position?:
    | ("center" | "top-left" | "top-right" | "bottom-right" | "bottom-left")
    | null;
  overlay?: ("subtle" | "moderate" | "intense") | null;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
};

export function OverlayTitle({
  text,
  position = "center",
  cta,
  overlay = "moderate",
  onMouseEnter,
  onMouseLeave,
}: OverlayTitleProps) {
  return (
    <>
      <div
        className={cn("absolute top-0 h-full w-full bg-black", {
          "opacity-15": overlay === "subtle",
          "opacity-20": overlay === "moderate",
          "opacity-25": overlay === "intense",
        })}
      />
      <div
        className={cn("absolute max-w-xl space-y-6", {
          "left-8 top-8": position === "top-left",
          "right-8 top-8 text-right": position === "top-right",
          "bottom-8 left-8": position === "bottom-left",
          "bottom-8 right-8 text-right": position === "bottom-right",
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center":
            position === "center",
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RichTextHeading as="h3" size="extra-large" variant="white" textShadow>
          {text! as RichTextObject}
        </RichTextHeading>
        {cta?.show && (
          <Button
            as={PageLink}
            link={cta.link!}
            size="large"
            variant={cta.variant || "primary"}
            blackShadow
          >
            {cta.link?.label}
          </Button>
        )}
      </div>
    </>
  );
}
