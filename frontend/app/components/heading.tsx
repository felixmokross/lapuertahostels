import { PropsWithChildren, createContext, useContext } from "react";
import { cn } from "./cn";
import { useTheme } from "~/brands";

type HeadingVariant = "brand" | "white" | "inherit";

export type HeadingProps = PropsWithChildren<{
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: HeadingVariant;
  size: "small" | "medium" | "large" | "extra-large";
  textShadow?: boolean;
  className?: string;
}>;

export function Heading({
  as: Component,
  variant = "brand",
  size,
  textShadow = false,
  children,
  className,
}: HeadingProps) {
  const theme = useTheme();
  return (
    <VariantContext.Provider value={variant}>
      <Component
        className={cn(
          variant === "brand"
            ? theme.headingTextColor
            : {
                "text-white": variant === "white",
                "text-inherit": variant === "inherit",
              },
          {
            "font-sans text-sm font-bold uppercase leading-relaxed tracking-wider":
              size === "small",
            "font-serif text-3xl leading-relaxed tracking-tight md:text-4xl md:leading-relaxed":
              size === "medium",
            "font-serif text-4xl leading-relaxed tracking-tight md:text-5xl md:leading-relaxed":
              size === "large",
            "font-serif text-5xl leading-relaxed tracking-tight md:text-6xl md:font-light md:leading-relaxed":
              size === "extra-large",
          },
          className,
        )}
        {...(textShadow ? { style: { textShadow: "0 0 50px black" } } : {})}
      >
        {children}
      </Component>
    </VariantContext.Provider>
  );
}

const VariantContext = createContext<HeadingVariant | undefined>(undefined);

function useVariant() {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error("HeadingHighlight must be used inside a Heading");
  }
  return context;
}

export function HeadingHighlight({ children }: PropsWithChildren) {
  const variant = useVariant();
  const theme = useTheme();

  if (variant !== "white") throw new Error("Only white variant is supported");

  return (
    <span className={theme.headingWhiteHighlightTextColor}>{children}</span>
  );
}
