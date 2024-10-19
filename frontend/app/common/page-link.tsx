import { Brand, Page } from "~/payload-types";
import { Link, LinkProps } from "./link";

export type PageLinkProps = {
  link: NonNullable<Brand["navLinks"]>[number];
} & Omit<LinkProps, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  return (
    <Link
      {...props}
      to={
        link.type === "internal"
          ? `${(link!.page as Page).url}${link.search ? `?${link.search}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
          : link.url!
      }
    >
      {link.label}
    </Link>
  );
}
