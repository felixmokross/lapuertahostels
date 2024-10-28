import { Brand, Page } from "./payload-types";
import { useMatches } from "@remix-run/react";

export function useBrandId() {
  const matches = useMatches();
  const pageMatch = matches.find((match) => match.id === "routes/$");

  if (!pageMatch) {
    throw new Error("No page match found!");
  }
  const brand = (pageMatch.data! as { content: Page }).content.brand as Brand;
  if (!brand) throw new Error("No brand");
  return brand.id as BrandId;
}

export type BrandId = "puerta" | "aqua" | "azul";
