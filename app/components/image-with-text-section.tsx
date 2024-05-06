import { PropsWithChildren, ReactNode } from "react";
import { cn } from "./cn";
import { Image } from "./image";

export type ImageWithTextSectionProps = PropsWithChildren<{
  orientation?: "image-left" | "image-right";
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
}>;

export function ImageWithTextSection({
  orientation = "image-left",
  imageSrc,
  imageAlt,
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
        <Image src={imageSrc} alt={imageAlt} />
      </div>
      <div className="text-center">{children}</div>
    </div>
  );
}
