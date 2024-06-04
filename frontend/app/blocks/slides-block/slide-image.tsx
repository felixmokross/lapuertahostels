import { cn } from "../../common/cn";
import { useEffect, useRef, useState } from "react";
import { Image, ImageProps } from "../../common/image";

export type SlideImageProps = ImageProps & {
  withPreview?: boolean;
  alignment?: "center" | "bottom";
};

export function SlideImage({
  src,
  alt,
  className,
  withPreview = false,
  alignment,
  ...props
}: SlideImageProps) {
  const [state, setState] = useState<"loading" | "loaded">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // Image might already be loaded, see https://stackoverflow.com/a/59153135
  useEffect(() => {
    if (state === "loading" && imgRef.current!.complete) {
      setState("loaded");
    }
  }, [state]);
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
        ref={imgRef}
        onLoad={() => {
          setState("loaded");
        }}
        alt={alt}
        className={imageClassName}
        {...props}
      />
    </div>
  );
}
