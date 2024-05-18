import { useMatch } from "@remix-run/react";
import { PropsWithChildren, createContext, useContext } from "react";

export function getBrandIdFromUrl(pathname: string): BrandId {
  if (pathname.startsWith("/aqua")) return "aqua";
  if (pathname.startsWith("/azul")) return "azul";

  return "puerta";
}

export const BrandContext = createContext<BrandId | undefined>(undefined);

export function RoutingBrandProvider({ children }: PropsWithChildren) {
  const brandFromUrl = useMatch("/:brand/*")?.params.brand;
  const brand =
    brandFromUrl === "azul"
      ? "azul"
      : brandFromUrl === "aqua"
        ? "aqua"
        : "puerta";

  return (
    <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
  );
}

export function useBrand(): BrandConfig {
  const brand = useContext(BrandContext);
  if (!brand) throw new Error("useBrand must be used within a BrandProvider");
  return brands[brand];
}

export type BrandId = "puerta" | "aqua" | "azul";

export type BrandConfig<TBrand extends BrandId = BrandId> = {
  key: TBrand;
  homeLinkUrl: string;
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

export type NavLinkConfig = { url: string; labelKey: string };

type BrandRegistry = {
  [KBrand in BrandId]: BrandConfig<KBrand>;
};

export const brands: BrandRegistry = {
  puerta: {
    key: "puerta",
    homeLinkUrl: "/",
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
    key: "aqua",
    homeLinkUrl: "/aqua",
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
    key: "azul",
    homeLinkUrl: "/azul",
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
