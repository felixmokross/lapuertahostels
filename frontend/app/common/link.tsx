import {
  Link as RemixLink,
  LinkProps as RemixLinkProps,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { buildLocalizedRelativeUrl } from "./routing";

export type LinkProps = Omit<RemixLinkProps, "to"> & {
  to: string;
};

export function Link({ to, children, ...props }: LinkProps) {
  const { i18n } = useTranslation();
  const isExternal = to.startsWith("http://") || to.startsWith("https://");
  return (
    <RemixLink
      to={isExternal ? to : buildLocalizedRelativeUrl(i18n.language, to)}
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </RemixLink>
  );
}
