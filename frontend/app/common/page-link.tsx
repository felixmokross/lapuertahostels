import { Brand } from "~/payload-types";
import { Link, LinkProps } from "./link";
import { forwardRef, PropsWithChildren } from "react";
import { gracefully, isObject } from "./utils";

export type PageLinkProps = {
  link: NonNullable<Brand["navLinks"]>[number]["link"];
} & Omit<PropsWithChildren<LinkProps>, "to">;

export const PageLink = forwardRef<HTMLAnchorElement, PageLinkProps>(
  function PageLink({ link, ...props }, ref) {
    return (
      <Link
        {...props}
        ref={ref}
        to={
          isObject(link)
            ? link.type === "internal"
              ? `${gracefully(link.page, "pathname") ?? ""}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
              : link.url ?? "about:blank"
            : "about:blank"
        }
      />
    );
  },
);
