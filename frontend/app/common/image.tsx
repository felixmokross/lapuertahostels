import {
  ImgHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useEnvironment } from "~/environment";
import { mergeRefs } from "./utils";

export type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  transformation?: ImageTransformation;
  onLoadingFinished?: () => void;
} & Pick<
  React.DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "loading"
>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, className, transformation, onLoadingFinished, ...props },
  ref,
) {
  const { imagekitBaseUrl } = useEnvironment();
  const [isLoading, setIsLoading] = useState(true);
  const localRef = useRef<HTMLImageElement>(null);

  const onLoad = useCallback(
    function onLoad() {
      setIsLoading(false);
      onLoadingFinished?.();
    },
    [onLoadingFinished],
  );

  // Image might already be loaded, see https://stackoverflow.com/a/59153135
  useEffect(() => {
    if (isLoading && localRef.current!.complete) {
      onLoad();
    }
  }, [onLoad, isLoading, localRef]);

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
      ref={mergeRefs(ref, localRef)}
      onLoad={onLoad}
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
