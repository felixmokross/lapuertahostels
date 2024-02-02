import { PropsWithChildren, createContext, useContext } from "react";
import { cn } from "./classnames";

type ParagraphVariant = "neutral" | "puerta" | "white" | "inherit";

export type ParagraphProps = PropsWithChildren<{
  className?: string;
  size?: "medium" | "large" | "extra-large";
  variant?: ParagraphVariant;
  justify?: boolean;
}>;

export function Paragraph({
  children,
  size,
  variant = "neutral",
  justify = false,
  className,
}: ParagraphProps) {
  return (
    <VariantContext.Provider value={variant}>
      <p
        className={cn(
          "leading-relaxed",
          justify && "hyphens-auto text-justify",
          {
            "text-base": size === "medium",
            "text-lg": size === "large",
            "text-xl": size === "extra-large",
          },
          {
            "text-white": variant === "white",
            "text-puerta-800": variant === "puerta",
            "text-inherit": variant === "inherit",
          },
          className,
        )}
      >
        {children}
      </p>
    </VariantContext.Provider>
  );
}

const VariantContext = createContext<ParagraphVariant | undefined>(undefined);

function useVariant() {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error("ParagrapgHighlight must be used inside a Paragraph");
  }
  return context;
}

export function ParagraphHighlight({ children }: PropsWithChildren) {
  const variant = useVariant();
  return (
    <strong className={cn(variant === "neutral" && "text-neutral-900")}>
      {children}
    </strong>
  );
}
