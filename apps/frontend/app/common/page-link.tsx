import { Brand } from "@lapuertahostels/shared";
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
      to={
        isObject(link)
          ? link.type === "internal"
            ? `${gracefully(link.page, "pathname") ?? ""}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
            : (link.url ?? "about:blank")
          : "about:blank"
      }
    />
  );
}
