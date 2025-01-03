import {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
  PropsWithChildren,
  Ref,
} from "react";
import { cn } from "./cn";
import { useTheme } from "~/themes";

export type ButtonProps<T extends ElementType = ElementType> =
  PropsWithChildren<{
    as?: T;
    size?: "small" | "medium" | "large" | "floating-action-button";
    blackShadow?: boolean;
    variant?: "primary" | "secondary";
    icon?: ComponentType<{ className?: string }>;
    ref?: Ref<HTMLButtonElement>;
  }> &
    Omit<ComponentPropsWithoutRef<T>, "as">;

export function Button<T extends ElementType>({
  as,
  children,
  size = "medium",
  blackShadow = false,
  className,
  variant = "secondary",
  icon: Icon,
  ref,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  const theme = useTheme();
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center text-center font-bold uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        theme.buttonColors[variant].textColor,
        theme.buttonColors[variant].backgroundColor,
        theme.buttonColors[variant].hoverBackgroundColor,
        theme.buttonColors[variant].hoverTextColor,
        theme.buttonColors.focusOutlineColor,
        {
          "gap-2.5 rounded-full px-6 py-4 text-base tracking-wider shadow-lg shadow-black/20 hover:shadow-xl":
            size === "floating-action-button",
          "gap-2 rounded-md px-4 py-2 text-sm tracking-wider shadow-md hover:shadow-lg md:gap-2.5 md:px-6 md:py-3 md:text-base":
            size === "large",
          "gap-1.5 rounded-md px-4 py-2 text-xs tracking-wide shadow-md hover:shadow-lg md:gap-2 md:px-4 md:py-3 md:text-sm":
            size === "medium",
          "gap-1.5 rounded-md px-3 py-2 text-xs tracking-wide shadow-sm hover:shadow-md":
            size === "small",
        },
        blackShadow && "shadow-black/50 hover:shadow-black/50",
        className,
      )}
      {...props}
      ref={ref}
    >
      {Icon && (
        <Icon
          className={cn("flex-shrink-0", {
            "size-5": size === "floating-action-button",
            "size-4 md:size-5": size === "large",
            "size-3.5 md:size-4": size === "medium",
            "size-3.5": size === "small",
          })}
        />
      )}
      {children}
    </Component>
  );
}
