import { PropsWithChildren, createContext, useContext } from "react";
import { Brand } from "./payload-types";
import { BrandId } from "./brands";

export type Theme = {
  logoTextColor: string;
  headingTextColor: string;
  headingWhiteHighlightTextColor: string;
  bannerBackgroundColor: string;
  lightBackgroundColor: string;
  buttonColors: {
    primary: {
      backgroundColor: string;
      textColor: string;
      hoverBackgroundColor: string;
      hoverTextColor: string;
    };
    secondary: {
      backgroundColor: string;
      textColor: string;
      hoverBackgroundColor: string;
      hoverTextColor: string;
    };
    focusOutlineColor: string;
  };
  navButtonClassName: string;
  strongBackgroundGradientColors: string;
  paragraphTextColor: string;
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
    lightBackgroundColor: "bg-puerta-100",
    buttonColors: {
      primary: {
        backgroundColor: "bg-puerta-500",
        textColor: "text-white",
        hoverBackgroundColor: "hover:bg-puerta-200",
        hoverTextColor: "hover:text-puerta-800",
      },
      secondary: {
        backgroundColor: "bg-puerta-200",
        textColor: "text-puerta-800",
        hoverBackgroundColor: "hover:bg-puerta-300",
        hoverTextColor: "hover:text-puerta-900",
      },
      focusOutlineColor: "focus-visible:outline-puerta-600",
    },
    navButtonClassName: "border-puerta-500 bg-puerta-50 text-puerta-700",
    strongBackgroundGradientColors: "from-puerta-100 to-puerta-300",
    paragraphTextColor: "text-puerta-800",
  },
  aqua: {
    logoTextColor: "text-aqua-600",
    headingTextColor: "text-aqua-600",
    headingWhiteHighlightTextColor: "text-aqua-200",
    bannerBackgroundColor: "bg-aqua-500",
    lightBackgroundColor: "bg-aqua-50",
    buttonColors: {
      primary: {
        backgroundColor: "bg-aqua-400",
        textColor: "text-white",
        hoverBackgroundColor: "hover:bg-aqua-200",
        hoverTextColor: "hover:text-aqua-800",
      },
      secondary: {
        backgroundColor: "bg-aqua-100",
        textColor: "text-aqua-800",
        hoverBackgroundColor: "hover:bg-aqua-300",
        hoverTextColor: "hover:text-aqua-950",
      },
      focusOutlineColor: "focus-visible:outline-aqua-600",
    },
    navButtonClassName: "border-aqua-400 bg-aqua-50 text-aqua-700",
    strongBackgroundGradientColors: "from-aqua-50 to-aqua-200",
    paragraphTextColor: "text-aqua-950",
  },
  azul: {
    logoTextColor: "text-azul-900",
    headingTextColor: "text-azul-900",
    headingWhiteHighlightTextColor: "text-azul-200",
    bannerBackgroundColor: "bg-azul-950",
    lightBackgroundColor: "bg-azul-50",
    buttonColors: {
      primary: {
        backgroundColor: "bg-azul-950",
        textColor: "text-white",
        hoverBackgroundColor: "hover:bg-azul-200",
        hoverTextColor: "hover:text-azul-900",
      },
      secondary: {
        backgroundColor: "bg-azul-100",
        textColor: "text-azul-900",
        hoverBackgroundColor: "hover:bg-azul-300",
        hoverTextColor: "hover:text-azul-950",
      },
      focusOutlineColor: "focus-visible:outline-azul-900",
    },
    navButtonClassName: "border-azul-950 bg-azul-50 text-azul-800",
    strongBackgroundGradientColors: "from-azul-50 to-azul-200",
    paragraphTextColor: "text-azul-950",
  },
};
