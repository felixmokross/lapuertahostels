import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from "react-router";
import { useTranslation } from "react-i18next";
import { buildLocalizedRelativeUrl } from "./routing";
import { Ref } from "react";

export type LinkProps = Omit<ReactRouterLinkProps, "to"> & {
  ref?: Ref<HTMLAnchorElement>;
  to: string;
};

export function Link({ to, children, ...props }: LinkProps) {
  const { i18n } = useTranslation();
  const isExternal = to.startsWith("http://") || to.startsWith("https://");
  return (
    <ReactRouterLink
      to={isExternal ? to : buildLocalizedRelativeUrl(i18n.language, to)}
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </ReactRouterLink>
  );
}
