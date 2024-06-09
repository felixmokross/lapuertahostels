import { Image } from "../image";
import { cn } from "../cn";
import { ImageViewerImage } from "./types";
import { useState } from "react";
import { ImageViewerDialog } from "./image-viewer-dialog";

export type ImageViewerProps = {
  images: ImageViewerImage[];
};

export function ImageViewer({ images }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <>
      <div className="grid w-[40rem] grid-cols-5 grid-rows-[auto,auto] gap-2">
        <button
          className="col-span-5 aspect-[16/9]"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="h-full w-full object-cover"
            transformation={{
              width: 1280,
              aspectRatio: { width: 16, height: 9 },
            }}
            loading="lazy"
          />
        </button>
        {images.map((image, index) => (
          <button
            className="relative block w-full"
            key={image.src}
            onClick={() => setIsOpen(true)}
            onMouseOver={() => setCurrentImageIndex(index)}
            onFocus={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] object-cover"
              transformation={{
                width: 244,
                aspectRatio: { width: 4, height: 3 },
              }}
              loading="lazy"
            />
            {currentImageIndex === index && (
              <div className={cn("absolute inset-0 bg-white/50")}></div>
            )}
          </button>
        ))}
      </div>
      <ImageViewerDialog
        key={currentImageIndex}
        images={images}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        defaultImageIndex={currentImageIndex}
      />
    </>
  );
}
