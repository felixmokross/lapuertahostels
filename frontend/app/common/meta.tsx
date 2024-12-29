import { Brand, Page, Text } from "~/payload-types";

export function getPageTitle(page: Page) {
  if (page.title != null && typeof page.title !== "object") {
    throw new Error("Title is not an object");
  }
  return getTitle(page.title?.text ?? undefined, page.brand as Brand);
}

export function getTitle(title: string | undefined, brand: Brand | undefined) {
  if (brand?.baseTitle && typeof brand?.baseTitle !== "object") {
    throw new Error("Base title is not an object");
  }

  const baseTitle = brand?.baseTitle
    ? (brand.baseTitle as Text).text
    : undefined;

  if (!baseTitle) {
    return title ?? "";
  }

  return title ? `${title} \u00B7 ${baseTitle}` : baseTitle;
}
