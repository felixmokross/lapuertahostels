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
