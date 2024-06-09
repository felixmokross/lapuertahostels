import { ImgHTMLAttributes, forwardRef } from "react";
import { useEnvironment } from "~/environment";

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
  "onLoad" | "loading"
>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, className, transformation, ...props },
  ref,
) {
  const { imagekitBaseUrl } = useEnvironment();

  if (src && !src.startsWith(imagekitBaseUrl)) {
    throw new Error(`Image URL must start with ${imagekitBaseUrl}`);
  }

  src = src?.slice(imagekitBaseUrl.length);

  return (
    <img
      {...props}
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
  blur?: number;
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
    case "blur":
      return `bl-${transformation.blur!}`;
    default:
      throw new Error(`Unsupported key: ${key}`);
  }
}
