import { useRouteLoaderData } from "@remix-run/react";
import { ImgHTMLAttributes, forwardRef } from "react";
import { type loader as rootLoader } from "~/root";

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  transformation?: ImageTransformation;
} & Pick<
  React.DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "onLoad"
>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, className, transformation },
  ref,
) {
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
  if (!imagekitBaseUrl) throw new Error("imagekitBaseUrl not available");

  if (src && !src.startsWith(imagekitBaseUrl)) {
    throw new Error(`Image URL must start with ${imagekitBaseUrl}`);
  }

  src = src?.slice(imagekitBaseUrl.length);

  return (
    <img
      src={`${imagekitBaseUrl}/${transformation ? toImagekitTransformationString(transformation) : ""}${src}`}
      className={className}
      alt={alt}
      ref={ref}
    />
  );
});

export type ImageTransformation = {
  width?: number;
  height?: number;
  aspectRatio?: { width: number; height: number };
  cropStrategy?: "maintain_ratio";
  focus?: "auto" | "custom";
  enhancement?: "grayscale";
};

function toImagekitTransformationString(transformation: ImageTransformation) {
  const transformationItems = Object.keys(transformation).map((key) =>
    toImagekitTransformationItemString(
      transformation,
      key as keyof ImageTransformation,
    ),
  );

  return `tr:${transformationItems.join(",")}`;
}

function toImagekitTransformationItemString(
  transformation: ImageTransformation,
  key: keyof ImageTransformation,
) {
  switch (key) {
    case "width":
      return `w-${transformation.width!}`;
    case "height":
      return `h-${transformation.height!}`;
    case "aspectRatio":
      return `ar-${transformation.aspectRatio!.width}-${transformation.aspectRatio!.height}`;
    case "cropStrategy":
      return `c-${transformation.cropStrategy!}`;
    case "focus":
      return `fo-${transformation.focus!}`;
    case "enhancement":
      return `e-${transformation.enhancement!}`;
    default:
      throw new Error(`Unsupported key: ${key}`);
  }
}
