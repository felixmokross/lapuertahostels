import { cn } from "../../common/cn";
import { useState } from "react";
import { Image, ImageProps } from "../../common/image";

export type SlideImageProps = ImageProps & {
  withPreview?: boolean;
  alignment?: "center" | "bottom";
  onLoadingFinished?: () => void;
};

export function SlideImage({
  src,
  alt,
  className,
  withPreview = false,
  alignment,
  onLoadingFinished,
  ...props
}: SlideImageProps) {
  const [state, setState] = useState<"loading" | "loaded">("loading");

  const imageClassName = cn("absolute top-0 h-full w-full object-cover", {
    "object-[center_90%]": alignment === "bottom",
  });

  return (
    <div className={cn("h-full w-full", className)}>
      {withPreview && state === "loading" && (
        <Image
          {...props}
          transformation={{ ...props.transformation, blur: 20 }}
          src={src}
          alt={alt}
          className={imageClassName}
        />
      )}
      <Image
        src={src}
        onLoadingFinished={() => {
          setState("loaded");
          onLoadingFinished?.();
        }}
        alt={alt}
        className={imageClassName}
        {...props}
      />
    </div>
  );
}
