import { Brand, Page } from "~/payload-types";

export function getPageTitle(page: Page) {
  const uppercasedBrandName = (page.brand as Brand).name.toUpperCase();
  return page.title
    ? `${page.title} \u00B7 ${uppercasedBrandName}`
    : uppercasedBrandName;
}
