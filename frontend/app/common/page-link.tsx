import { Brand, Page } from "~/payload-types";
import { Link, LinkProps } from "./link";
import { useTranslation } from "react-i18next";

export type PageLinkProps = {
  link: NonNullable<Brand["navLinks"]>[number];
} & Omit<LinkProps, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  const { i18n } = useTranslation();
  const pageUrl = (link!.page as Page).url;

  return (
    <Link
      {...props}
      to={
        link.type === "internal"
          ? `/${i18n.language}${pageUrl}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
          : link.url!
      }
    >
      {link.label}
    </Link>
  );
}
