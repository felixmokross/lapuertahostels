import { Link as RemixLink, LinkProps as RemixLinkProps } from "react-router";
import { useTranslation } from "react-i18next";
import { buildLocalizedRelativeUrl } from "./routing";
import { forwardRef } from "react";

export type LinkProps = Omit<RemixLinkProps, "to"> & {
  to: string;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, children, ...props },
  ref,
) {
  const { i18n } = useTranslation();
  const isExternal = to.startsWith("http://") || to.startsWith("https://");
  return (
    <RemixLink
      to={isExternal ? to : buildLocalizedRelativeUrl(i18n.language, to)}
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      ref={ref}
    >
      {children}
    </RemixLink>
  );
});
