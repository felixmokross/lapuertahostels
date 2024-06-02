import { PropsWithChildren } from "react";
import { Button } from "./button";
import { cn } from "./cn";
import { Heading } from "./heading";
import { Link } from "./link";

export type OverlayTitleProps = PropsWithChildren<{
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  cta?: {
    to: string;
    text: string;
  };
  overlay?: "subtle" | "moderate" | "intense";
}>;

export function OverlayTitle({
  children,
  position = "center",
  cta,
  overlay = "moderate",
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
      >
        <Heading as="h3" size="extra-large" variant="white" textShadow>
          {children}
        </Heading>
        {cta && (
          <Button
            as={Link}
            size="large"
            variant="primary"
            blackShadow
            to={cta.to}
          >
            {cta.text}
          </Button>
        )}
      </div>
    </>
  );
}
