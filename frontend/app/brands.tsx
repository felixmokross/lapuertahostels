import { PropsWithChildren, createContext, useContext } from "react";
import { Brand, Page } from "./payload-types";
import { useMatches } from "@remix-run/react";

export function useBrand() {
  const matches = useMatches();
  const pageMatch = matches.find(
    (match) => match.id === "routes/$" || match.id === "routes/_index",
  );

  if (!pageMatch) {
    throw new Error("No page match found!");
  }
  const brand = (pageMatch.data! as { content: Page }).content.brand as Brand;
  if (!brand) throw new Error("No brand");
  return brand;
}

export type BrandId = "puerta" | "aqua" | "azul";

export type Theme = {
  logoTextColor: string;
  headingTextColor: string;
  headingWhiteHighlightTextColor: string;
  bannerBackgroundColor: string;
  footerBackgroundColor: string;
  buttonColors: {
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    focusOutlineColor: string;
  };
  navButtonClassName: string;
};

export type ThemeProviderProps = {
  brand: Brand;
};

export function ThemeProvider({
  brand,
  children,
}: PropsWithChildren<ThemeProviderProps>) {
  const theme = themesByBrand[brand.id as BrandId];

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export const ThemeContext = createContext<Theme | undefined>(undefined);

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return theme;
}

export const themesByBrand: Record<BrandId, Theme> = {
  puerta: {
    logoTextColor: "text-neutral-900",
    headingTextColor: "text-puerta-600",
    headingWhiteHighlightTextColor: "text-puerta-200",
    bannerBackgroundColor: "bg-puerta-800",
    footerBackgroundColor: "bg-puerta-100",
    buttonColors: {
      backgroundColor: "bg-puerta-500",
      hoverBackgroundColor: "hover:bg-puerta-200",
      hoverTextColor: "hover:text-puerta-800",
      focusOutlineColor: "focus-visible:outline-puerta-600",
    },
    navButtonClassName: "border-puerta-500 bg-puerta-50 text-puerta-700",
  },
  aqua: {
    logoTextColor: "text-aqua-600",
    headingTextColor: "text-aqua-600",
    headingWhiteHighlightTextColor: "text-aqua-200",
    bannerBackgroundColor: "bg-aqua-500",
    footerBackgroundColor: "bg-aqua-50",
    buttonColors: {
      backgroundColor: "bg-aqua-400",
      hoverBackgroundColor: "hover:bg-aqua-200",
      hoverTextColor: "hover:text-aqua-800",
      focusOutlineColor: "focus-visible:outline-aqua-600",
    },
    navButtonClassName: "border-aqua-400 bg-aqua-50 text-aqua-700",
  },
  azul: {
    logoTextColor: "text-azul-900",
    headingTextColor: "text-azul-900",
    headingWhiteHighlightTextColor: "text-azul-200",
    bannerBackgroundColor: "bg-azul-950",
    footerBackgroundColor: "bg-azul-50",
    buttonColors: {
      backgroundColor: "bg-azul-950",
      hoverBackgroundColor: "hover:bg-azul-200",
      hoverTextColor: "hover:text-azul-900",
      focusOutlineColor: "focus-visible:outline-azul-900",
    },
    navButtonClassName: "border-azul-950 bg-azul-50 text-azul-800",
  },
};
