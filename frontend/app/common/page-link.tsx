import { Brand, Page } from "~/payload-types";
import { Link, LinkProps } from "./link";

export type PageLinkProps = {
  link: NonNullable<Brand["navLinks"]>[number];
} & Omit<LinkProps, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  const pageUrl = (link!.page as Page).url;

  return (
    <Link
      {...props}
      to={
        link.type === "internal"
          ? `${pageUrl}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
          : link.url!
      }
    >
      {link.label}
    </Link>
  );
}
