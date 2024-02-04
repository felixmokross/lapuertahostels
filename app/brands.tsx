import { useMatch } from "@remix-run/react";
import { PropsWithChildren, createContext, useContext } from "react";

export const BrandContext = createContext<Brand | undefined>(undefined);

export function RoutingBrandProvider({ children }: PropsWithChildren) {
  const brandFromUrl = useMatch("/:locale/:brand/*")?.params.brand;
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

export type Brand = "puerta" | "aqua" | "azul";

export type BrandConfig<TBrand extends Brand = Brand> = {
  key: TBrand;
  name: string;
  homeLinkUrl: string;
  navLinks: NavLinkConfig[];
  logoTextColor: string;
  logoUrl: string;
  headingTextColor: string;
  bannerBackgroundColor: string;
  footerBackgroundColor: string;
};

export type NavLinkConfig = { url: string; labelKey: string };

type BrandRegistry = {
  [KBrand in Brand]: BrandConfig<KBrand>;
};

export const brands: BrandRegistry = {
  puerta: {
    key: "puerta",
    homeLinkUrl: "/",
    navLinks: [
      { url: "/aqua", labelKey: "brands.aqua" },
      { url: "/azul", labelKey: "brands.azul" },
      { url: ".#santa-marta", labelKey: "santaMarta" },
      { url: ".#about-us", labelKey: "aboutUs" },
      { url: "", labelKey: "contact" },
    ],
    name: "La Puerta Hostels",
    logoTextColor: "text-neutral-900",
    logoUrl: "logos/logo-puerta-simple.png?updatedAt=1703906701749",
    headingTextColor: "text-puerta-600",
    bannerBackgroundColor: "bg-puerta-800",
    footerBackgroundColor: "bg-puerta-100",
  },
  aqua: {
    key: "aqua",
    homeLinkUrl: "/aqua",
    navLinks: [{ url: "/", labelKey: "brands.puerta" }],
    name: "Puerta Aqua",
    logoTextColor: "text-aqua-600",
    logoUrl: "logos/logo-aqua-simple.png?updatedAt=1703915191239",
    headingTextColor: "text-aqua-600",
    bannerBackgroundColor: "bg-aqua-600",
    footerBackgroundColor: "bg-aqua-50",
  },
  azul: {
    key: "azul",
    homeLinkUrl: "/azul",
    navLinks: [{ url: "/", labelKey: "brands.puerta" }],
    name: "La Puerta Azul",
    logoTextColor: "text-azul-900",
    logoUrl: "logos/logo-azul-simple.png?updatedAt=1703915175439",
    headingTextColor: "text-azul-900",
    bannerBackgroundColor: "bg-azul-950",
    footerBackgroundColor: "bg-azul-50",
  },
};
