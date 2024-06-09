import { Image } from "../image";
import { ImageViewerImage } from "./types";
import { useState } from "react";
import { ImageViewerDialog } from "./image-viewer-dialog";

export type ImageViewerProps = {
  images: ImageViewerImage[];
};

export function ImageViewer({ images }: ImageViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >(undefined);
  return (
    <>
      <div className="grid w-[40rem] grid-cols-5 grid-rows-[auto,auto] gap-2">
        <button
          className="col-span-5 aspect-[16/9]"
          onClick={() => {
            setCurrentImageIndex(0);
          }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
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
            onClick={() => {
              setCurrentImageIndex(index);
            }}
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
          </button>
        ))}
      </div>
      {images.map((_, i) => (
        <ImageViewerDialog
          key={i}
          images={images}
          isOpen={currentImageIndex === i}
          onDismiss={() => setCurrentImageIndex(undefined)}
          defaultImageIndex={currentImageIndex}
        />
      ))}
    </>
  );
}
