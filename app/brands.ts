import { useMatch } from "@remix-run/react";

export function useBrand(): Brand {
  const brandFromUrl = useMatch("/:locale/:brand/*")?.params.brand;
  if (brandFromUrl === "azul") {
    return "azul";
  }

  if (brandFromUrl === "aqua") {
    return "aqua";
  }

  return "puerta";
}

export type Brand = "puerta" | "aqua" | "azul";

export type BrandConfig<TBrand extends Brand = Brand> = {
  key: TBrand;
  name: string;
  logoTextColor: string;
  logoUrl: string;
  bannerBackgroundColor: string;
};

type BrandRegistry = {
  [KBrand in Brand]: BrandConfig<KBrand>;
};

export const brands: BrandRegistry = {
  puerta: {
    key: "puerta",
    name: "La Puerta Hostels",
    logoTextColor: "text-neutral-900",
    logoUrl: "logos/logo-puerta-simple.png?updatedAt=1703906701749",
    bannerBackgroundColor: "bg-puerta-800",
  },
  aqua: {
    key: "aqua",
    name: "Puerta Aqua",
    logoTextColor: "text-aqua-600",
    logoUrl: "logos/logo-aqua-simple.png?updatedAt=1703915191239",
    bannerBackgroundColor: "bg-aqua-600",
  },
  azul: {
    key: "azul",
    name: "La Puerta Azul",
    logoTextColor: "text-azul-900",
    logoUrl: "logos/logo-azul-simple.png?updatedAt=1703915175439",
    bannerBackgroundColor: "bg-azul-950",
  },
};
