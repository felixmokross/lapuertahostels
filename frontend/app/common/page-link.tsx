import { Brand, NewPage } from "~/payload-types";
import { Link, LinkProps } from "./link";
import { PropsWithChildren } from "react";

export type PageLinkProps = {
  link: NonNullable<Brand["navLinks"]>[number]["link"];
} & Omit<PropsWithChildren<LinkProps>, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  if (typeof link !== "object") throw new Error("Invalid link");

  return (
    <Link
      {...props}
      to={
        link.type === "internal"
          ? `${(link.newPage as NewPage).pathname}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
          : link.url!
      }
    />
  );
}
