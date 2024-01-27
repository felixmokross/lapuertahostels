import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";
import { cn } from "./classnames";
import { useEffect, useRef, useState } from "react";

export type CarouselImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
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
  const rootLoaderData = useRouteLoaderData<typeof loader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;

  const [state, setState] = useState<"loading" | "loaded">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  // Image might already be loaded, see https://stackoverflow.com/a/59153135
  useEffect(() => {
    if (state === "loading" && imgRef.current!.complete) {
      setState("loaded");
    }
  }, [state]);

  const imageSrc = `${imagekitBaseUrl}/${src}`;
  const previewImageSrc = `${imageSrc},bl-10`;

  return (
    <div className={cn("h-full w-full", className)}>
      {withPreview && state === "loading" && (
        <img
          src={previewImageSrc}
          alt={alt}
          className="absolute top-0 h-full w-full object-cover"
          {...props}
        />
      )}
      <img
        src={imageSrc}
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
