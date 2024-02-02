import { PropsWithChildren, createContext, useContext } from "react";
import { cn } from "./classnames";

type HeadingVariant = "puerta" | "white";

type HeadingProps = PropsWithChildren<{
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: HeadingVariant;
  size: "medium" | "large" | "extra-large";
  textShadow?: boolean;
}>;

export function Heading({
  as: Component,
  variant = "puerta",
  size,
  textShadow = false,
  children,
}: HeadingProps) {
  return (
    <VariantContext.Provider value={variant}>
      <Component
        className={cn(
          "font-serif tracking-tight text-puerta-600",
          {
            "text-puerta-600": variant === "puerta",
            "text-white": variant === "white",
          },
          {
            "text-4xl": size === "medium",
            "text-5xl": size === "large",
            "text-6xl font-light leading-relaxed": size === "extra-large",
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
