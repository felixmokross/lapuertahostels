import { PropsWithChildren, createContext, useContext } from "react";
import { cn } from "./classnames";
import { useBrand } from "../brands";

type HeadingVariant = "brand" | "white" | "inherit";

type HeadingProps = PropsWithChildren<{
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: HeadingVariant;
  size: "small" | "medium" | "large" | "extra-large";
  textShadow?: boolean;
}>;

export function Heading({
  as: Component,
  variant = "brand",
  size,
  textShadow = false,
  children,
}: HeadingProps) {
  const brand = useBrand();
  return (
    <VariantContext.Provider value={variant}>
      <Component
        className={cn(
          variant === "brand"
            ? brand.headingTextColor
            : {
                "text-white": variant === "white",
                "text-inherit": variant === "inherit",
              },
          {
            "font-sans text-sm font-bold uppercase tracking-wider":
              size === "small",
            "font-serif text-4xl tracking-tight": size === "medium",
            "font-serif text-5xl tracking-tight": size === "large",
            "font-serif text-6xl font-light leading-relaxed tracking-tight":
              size === "extra-large",
          },
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

  if (variant !== "white") throw new Error("Only white variant is supported");

  return (
    <span
      className={cn({
        "text-puerta-200": variant === "white",
      })}
    >
      {children}
    </span>
  );
}
