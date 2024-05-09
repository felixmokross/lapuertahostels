import { PropsWithChildren, ReactNode } from "react";
import { cn } from "./cn";
import { Image, ImageProps } from "./image";

export type ImageWithTextSectionProps = PropsWithChildren<{
  orientation?: "image-left" | "image-right";
  image: ImageProps;
  children: ReactNode;
}>;

export function ImageWithTextSection({
  orientation = "image-left",
  image,
  children,
}: ImageWithTextSectionProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-10",
        orientation === "image-right" && "flex-row-reverse",
      )}
    >
      <div className="max-w-md shrink-0 overflow-hidden rounded-md">
        <Image {...image} />
      </div>
      <div className="text-center">{children}</div>
    </div>
  );
}
