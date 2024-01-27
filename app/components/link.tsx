import {
  Link as RemixLink,
  useParams,
  type LinkProps as RemixLinkProps,
  useResolvedPath,
} from "@remix-run/react";

export type LinkProps = RemixLinkProps;

export function Link({ to, ...props }: LinkProps) {
  const { locale } = useParams<"locale">();
  const resolvedPath = useResolvedPath(to);
  return (
    <RemixLink
      to={`${locale ? `/${locale}` : ""}${resolvedPath.pathname === "/" ? "" : resolvedPath.pathname}${resolvedPath.search}${resolvedPath.hash}`}
      {...props}
    />
  );
}
