import { PropsWithChildren, PropsWithoutRef } from "react";
import { cn } from "./classnames";

export type ButtonProps = PropsWithChildren<{
  size: "small" | "large";
  blackShadow?: boolean;
}> &
  PropsWithoutRef<JSX.IntrinsicElements["button"]>;

export function Button({
  children,
  size,
  blackShadow,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md bg-puerta-500 font-bold uppercase text-white hover:bg-puerta-200 hover:text-puerta-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-puerta-600",
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
