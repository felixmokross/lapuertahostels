import { cn } from "./cn";
import { useEffect, useRef, useState } from "react";
import { Image, ImageProps } from "./image";

export type CarouselImageProps = ImageProps & {
  withPreview?: boolean;
  position?: "center" | "bottom";
};

export function CarouselImage({
  src,
  alt,
  className,
  withPreview = false,
  position,
  ...props
}: CarouselImageProps) {
  const [state, setState] = useState<"loading" | "loaded">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // Image might already be loaded, see https://stackoverflow.com/a/59153135
  useEffect(() => {
    if (state === "loading" && imgRef.current!.complete) {
      setState("loaded");
    }
  }, [state]);

  const previewImageSrc = `${src},bl-10`;
  const imageClassName = cn("absolute top-0 h-full w-full object-cover", {
    "object-[center_70%]": position === "bottom",
  });

  return (
    <div className={cn("h-full w-full", className)}>
      {withPreview && state === "loading" && (
        <Image
          src={previewImageSrc}
          alt={alt}
          className={imageClassName}
          {...props}
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
