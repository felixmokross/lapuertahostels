import { Image } from "../image";
import { ImageViewerImage } from "./types";
import { useState } from "react";
import { ImageViewerDialog } from "./image-viewer-dialog";
import { Heading } from "../heading";
import { useTranslation } from "react-i18next";

export type ImageViewerProps = {
  className?: string;
  images: ImageViewerImage[];
};

export function ImageViewer({ images, className }: ImageViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<
    number | undefined
  >(undefined);
  const [t] = useTranslation();
  return (
    <div className={className}>
      <div className="grid w-[35rem] grid-cols-4 grid-rows-[auto,auto] gap-2">
        <button
          className="col-span-4 aspect-[16/9]"
          onClick={() => {
            setCurrentImageIndex(0);
          }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            className="h-full w-full object-cover"
            transformation={{
              width: 560,
              aspectRatio: { width: 16, height: 9 },
            }}
            loading="lazy"
            layout="fixed"
          />
        </button>
        {images.slice(1, 5).map((image, index) => (
          <button
            className="relative block w-full"
            key={image.src}
            onClick={() => {
              setCurrentImageIndex(index + 1);
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="aspect-[4/3] object-cover"
              transformation={{
                width: 140,
                aspectRatio: { width: 4, height: 3 },
              }}
              loading="lazy"
              layout="fixed"
            />
            {images.length > 5 && index === 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 p-6">
                <Heading as="h6" size="extra-small" variant="white">
                  {t("imageViewer.seeMoreImages", {
                    count: images.length - 4,
                  })}
                </Heading>
              </div>
            )}
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
    </div>
  );
}
