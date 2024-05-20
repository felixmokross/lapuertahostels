import { PropsWithChildren } from "react";
import { cn } from "./cn";
import { Image } from "./image";

export type ImageWithTextSectionProps = PropsWithChildren<{
  orientation?: "image-left" | "image-right";
  image: { src: string; alt: string };
  className?: string;
}>;

export function ImageWithTextSection({
  orientation = "image-left",
  image,
  className,
  children,
}: ImageWithTextSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-16 md:gap-10 lg:flex-row",
        orientation === "image-left" && "lg:flex-row-reverse",
        className,
      )}
    >
      <div className="px-16 text-center md:px-0">{children}</div>
      <div className="shrink-0 overflow-hidden shadow-lg sm:max-w-md sm:rounded-md">
        <Image
          {...image}
          transformation={{
            width: 1000,
            aspectRatio: { width: 4, height: 3 },
          }}
        />
      </div>
    </div>
  );
}
