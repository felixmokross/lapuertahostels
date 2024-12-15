import { Brand, NewPage } from "~/payload-types";
import { Link, LinkProps } from "./link";
import { forwardRef, PropsWithChildren } from "react";

export type PageLinkProps = {
  link: NonNullable<Brand["navLinks"]>[number]["link"];
} & Omit<PropsWithChildren<LinkProps>, "to">;

export const PageLink = forwardRef<HTMLAnchorElement, PageLinkProps>(
  function PageLink({ link, ...props }, ref) {
    if (typeof link !== "object") throw new Error("Invalid link");

    return (
      <Link
        {...props}
        ref={ref}
        to={
          link.type === "internal"
            ? `${(link.newPage as NewPage).pathname}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
            : link.url!
        }
      />
    );
  },
);
