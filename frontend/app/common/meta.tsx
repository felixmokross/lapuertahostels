import { Brand, Page } from "~/payload-types";

export function getPageTitle(page: Page, brand: Brand) {
  const uppercasedBrandName = brand.name.toUpperCase();
  return page.title
    ? `${page.title} \u00B7 ${uppercasedBrandName}`
    : uppercasedBrandName;
}
