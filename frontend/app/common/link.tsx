import {
  Link as RemixLink,
  LinkProps as RemixLinkProps,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";

export type LinkProps = RemixLinkProps;

export function Link({ to, children, ...props }: LinkProps) {
  const { i18n } = useTranslation();
  const isExternal =
    typeof to === "string" &&
    (to.startsWith("http://") || to.startsWith("https://"));
  return (
    <RemixLink
      to={isExternal ? to : `/${i18n.language}${to === "/" ? "" : to}`}
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </RemixLink>
  );
}
