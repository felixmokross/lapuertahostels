import { Brand, Page } from "~/payload-types";

export function getPageTitle(page: Page) {
  if (page.title != null && typeof page.title !== "object") {
    throw new Error("Title is not an object");
  }
  return getTitle(page.title?.text ?? undefined, page.brand as Brand);
}

export function getTitle(title: string | undefined, brand: Brand | undefined) {
  const uppercasedBrandName = (
    brand?.name ?? "La Puerta Hostels"
  ).toUpperCase();
  return title ? `${title} \u00B7 ${uppercasedBrandName}` : uppercasedBrandName;
}
