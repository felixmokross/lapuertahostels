import { PropsWithChildren, PropsWithoutRef } from "react";
import { cn } from "./classnames";
import { useBrand } from "../brands";

export type ButtonProps = PropsWithChildren<{
  size: "small" | "large";
  blackShadow?: boolean;
}> &
  PropsWithoutRef<JSX.IntrinsicElements["button"]>;

export function Button({
  children,
  size,
  blackShadow = false,
  className,
  ...props
}: ButtonProps) {
  const brand = useBrand();
  return (
    <button
      className={cn(
        "rounded-md font-bold uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        brand.buttonColors.backgroundColor,
        brand.buttonColors.hoverBackgroundColor,
        brand.buttonColors.hoverTextColor,
        brand.buttonColors.focusOutlineColor,
        {
          "px-6 py-3 text-base tracking-wider shadow-md hover:shadow-lg":
            size === "large",
          "px-3 py-2 text-xs tracking-wide shadow-sm hover:shadow-md":
            size === "small",
        },
        blackShadow && "shadow-black/50 hover:shadow-black/50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
