import { useRouteLoaderData } from "@remix-run/react";
import { forwardRef } from "react";
import { type loader as rootLoader } from "~/root";

export type ImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "ref"
>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, ...props },
  ref,
) {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;

  return (
    <img src={`${imagekitBaseUrl}/${src}`} alt={alt} {...props} ref={ref} />
  );
});
