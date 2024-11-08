import { Brand, Page } from "~/payload-types";
import { Link, LinkProps } from "./link";
import { PropsWithChildren } from "react";

export type PageLinkProps = {
  link:
    | NonNullable<Brand["navLinks"]>[number]["link"]
    | NonNullable<
        (NonNullable<Page["layout"]>[number] & {
          blockType: "Lead";
        })["cta"]
      >["link"];
} & Omit<PropsWithChildren<LinkProps>, "to">;

export function PageLink({ link, ...props }: PageLinkProps) {
  if (typeof link !== "object") throw new Error("Invalid link");

  return (
    <Link
      {...props}
      to={
        link.type === "internal"
          ? `${(link.page as Page).url}${link.queryString ? `?${link.queryString}` : ""}${link.fragment ? `#${link.fragment}` : ""}`
          : link.url!
      }
    />
  );
}
