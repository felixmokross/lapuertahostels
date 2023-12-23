import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

export type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function Image({ src, alt, ...props }: ImageProps) {
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
  return <img src={`${imagekitBaseUrl}/${src}`} alt={alt} {...props} />;
}
