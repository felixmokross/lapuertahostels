import { cn } from "../../common/cn";
import { useState } from "react";
import { Image, ImageProps } from "../../common/image";

export type SlideImageProps = Pick<ImageProps, "src" | "alt"> & {
  withPreview?: boolean;
  alignment?: "center" | "bottom";
  onLoadingFinished?: () => void;
};

export function SlideImage({
  src,
  alt,
  withPreview = false,
  alignment,
  onLoadingFinished,
}: SlideImageProps) {
  const [state, setState] = useState<"loading" | "loaded">("loading");

  const imageProps = {
    src,
    alt,
    layout: "responsive",
    srcMultiplier: 6,
    sizes: "100vw",
    className: cn("absolute top-0 h-full w-full object-cover", {
      "object-[center_90%]": alignment === "bottom",
    }),
    transformation: {
      aspectRatio: { width: 4, height: 3 },
      width: 800,
    },
  } as ImageProps;

  return (
    <div className={"h-full w-full"}>
      {withPreview && state === "loading" && (
        <Image
          {...imageProps}
          transformation={{ ...imageProps.transformation, blur: 20 }}
        />
      )}
      <Image
        {...imageProps}
        onLoadingFinished={() => {
          setState("loaded");
          onLoadingFinished?.();
        }}
        loading={withPreview ? "eager" : "lazy"}
      />
    </div>
  );
}
