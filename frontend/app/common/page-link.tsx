import { Brand, Page } from "~/payload-types";
import { Link, LinkProps } from "./link";

export type PageLinkProps = {
  link: NonNullable<Brand["navLinks"]>[number];
} & Omit<LinkProps, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  if (typeof link !== "object") throw new Error("Invalid link");
  if (typeof link.label !== "object") throw new Error("Invalid link label");
  return (
    <Link
      {...props}
      to={
        link.type === "internal"
          ? `${(link.page as Page).url}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
          : link.url!
      }
    >
      {link.label.text}
    </Link>
  );
}
