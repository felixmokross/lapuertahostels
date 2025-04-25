import { Brand, type Link as LinkType } from "@lapuertahostels/payload-types";
import { Link, LinkProps } from "./link";
import { PropsWithChildren } from "react";
import { gracefully, isObject } from "./utils";
import { buildLocalizedRelativeUrl } from "./routing";
import { useTranslation } from "react-i18next";

export type PageLinkProps = {
  link?: NonNullable<Brand["navLinks"]>[number]["link"] | null;
} & Omit<PropsWithChildren<LinkProps>, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  const { i18n } = useTranslation();
  return (
    <Link
      {...props}
      to={isObject(link) ? getPageLinkHref(link, i18n.language) : "about:blank"}
    />
  );
}

type PageLinkData = Pick<
  LinkType,
  "type" | "page" | "queryString" | "fragment" | "url"
>;

export function getPageLinkHref(linkData: PageLinkData, locale: string) {
  return linkData.type === "internal"
    ? buildLocalizedRelativeUrl(
        locale,
        `${gracefully(linkData.page, "pathname") ?? ""}${linkData.queryString ? `?${linkData.queryString}` : ""}${linkData.fragment ? `#${linkData.fragment}` : ""}`,
      )
    : (linkData.url ?? "about:blank");
}
