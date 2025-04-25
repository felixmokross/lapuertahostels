import { Brand, type Link as LinkType } from "@lapuertahostels/payload-types";
import { Link, LinkProps } from "./link";
import { PropsWithChildren } from "react";
import { gracefully, isObject } from "./utils";

export type PageLinkProps = {
  link?: NonNullable<Brand["navLinks"]>[number]["link"] | null;
} & Omit<PropsWithChildren<LinkProps>, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  return (
    <Link
      {...props}
      to={isObject(link) ? getPageLinkHref(link) : "about:blank"}
    />
  );
}

type PageLinkData = Pick<
  LinkType,
  "type" | "page" | "queryString" | "fragment" | "url"
>;

export function getPageLinkHref(linkData: PageLinkData) {
  return linkData.type === "internal"
    ? `${gracefully(linkData.page, "pathname") ?? ""}${linkData.queryString ? `?${linkData.queryString}` : ""}${linkData.fragment ? `#${linkData.fragment}` : ""}`
    : (linkData.url ?? "about:blank");
}
