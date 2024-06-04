import {
  Link as RemixLink,
  LinkProps as RemixLinkProps,
} from "@remix-run/react";

export type LinkProps = RemixLinkProps;

export function Link({ to, children, ...props }: LinkProps) {
  const isExternal =
    typeof to === "string" &&
    (to.startsWith("http://") || to.startsWith("https://"));
  return (
    <RemixLink
      to={to}
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </RemixLink>
  );
}
