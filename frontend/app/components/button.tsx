import {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";
import { cn } from "./cn";
import { useTheme } from "~/brands";

export type ButtonProps<T extends ElementType> = PropsWithChildren<{
  as?: T;
  size: "small" | "medium" | "large";
  blackShadow?: boolean;
}> &
  Omit<ComponentPropsWithoutRef<T>, "as">;

export function Button<T extends ElementType>({
  as,
  children,
  size,
  blackShadow = false,
  className,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  const theme = useTheme();
  return (
    <Component
      className={cn(
        "inline-block rounded-md font-bold uppercase text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        theme.buttonColors.backgroundColor,
        theme.buttonColors.hoverBackgroundColor,
        theme.buttonColors.hoverTextColor,
        theme.buttonColors.focusOutlineColor,
        {
          "px-4 py-2 text-sm tracking-wider shadow-md hover:shadow-lg md:px-6 md:py-3 md:text-base":
            size === "large",
          "px-4 py-2 text-xs tracking-wide shadow-md hover:shadow-lg md:px-4 md:py-3 md:text-sm":
            size === "medium",
          "px-3 py-2 text-xs tracking-wide shadow-sm hover:shadow-md":
            size === "small",
        },
        blackShadow && "shadow-black/50 hover:shadow-black/50",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
