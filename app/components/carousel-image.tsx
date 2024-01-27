import { cn } from "./classnames";
import { DetailedHTMLProps, useEffect, useRef, useState } from "react";
import { Image } from "./image";

export type CarouselImageProps = Omit<
  DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "ref"
> & {
  withPreview?: boolean;
};

export function CarouselImage({
  src,
  alt,
  className,
  withPreview = false,
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

  return (
    <div className={cn("h-full w-full", className)}>
      {withPreview && state === "loading" && (
        <Image
          src={previewImageSrc}
          alt={alt}
          className="absolute top-0 h-full w-full object-cover"
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
        className="absolute top-0 h-full w-full object-cover"
        {...props}
      />
    </div>
  );
}
