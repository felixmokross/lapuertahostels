import { Brand, Page, Text } from "~/payload-types";
import { Link, LinkProps } from "./link";

export type PageLinkProps = {
  label?: Text | string;
  link:
    | NonNullable<Brand["navLinks"]>[number]["link"]
    | NonNullable<
        (NonNullable<Page["layout"]>[number] & {
          blockType: "Lead";
        })["cta"]
      >["link"];
} & Omit<LinkProps, "to">;

export function PageLink({ label, link, ...props }: PageLinkProps) {
  if (typeof link !== "object") throw new Error("Invalid link");

  if (label != null && typeof label !== "object") {
    throw new Error("Invalid label");
  }
  return (
    <Link
      {...props}
      to={
        link.type === "internal"
          ? `${(link.page as Page).url}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
          : link.url!
      }
    >
      {"label" in link ? link.label : label!.text}
    </Link>
  );
}
