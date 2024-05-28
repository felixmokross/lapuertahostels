import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./cn";
import { CarouselImage } from "./carousel-image";
import { Transition } from "@headlessui/react";
import { ImageTransformation } from "./image";
import { OverlayTitle } from "./overlay-title";

export type CarouselProps = {
  items: CarouselItem[];
  transformation?: ImageTransformation;
};

export type CarouselItem = {
  src: string;
  alt: string;
  title?: CarouselItemTitle;
  position?: "center" | "bottom";
};

export type CarouselItemTitle = {
  text: string | ReactNode;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  imageOverlay?: "subtle" | "moderate" | "intense";
  cta?: CarouselItemCallToAction;
};

export type CarouselItemCallToAction = {
  text: string;
  to: string;
};

export function Carousel({ items, transformation }: CarouselProps) {
  if (items.length === 0) {
    throw new Error("Carousel must have at least one item");
  }

  const { itemIndex, goTo } = useCarouselState(items);

  return (
    <div className="relative h-[30rem] bg-puerta-100 md:h-[40rem]">
      {items.map((item, i) => {
        return (
          <Transition
            key={i}
            className="h-full"
            show={i === itemIndex}
            unmount={false}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <CarouselImage
              src={item.src}
              alt={item.alt}
              transformation={transformation}
              withPreview={i === 0}
              className="absolute top-0"
              position={item.position}
            />
            {item.title && (
              <OverlayTitle
                overlay={item.title.imageOverlay}
                position={item.title.position}
                cta={item.title.cta}
              >
                {item.title.text}
              </OverlayTitle>
            )}
          </Transition>
        );
      })}
      <div className="absolute bottom-8 flex w-full -translate-y-1/2 justify-center">
        {items.map((item, i) => (
          <button
            className={cn("group inline-flex h-10 items-center px-2")}
            key={i}
            onClick={() => goTo(i)}
          >
            <span
              className={cn(
                "h-1 w-10 rounded-full transition-[background-color,opacity] duration-200 ease-in",
                i === itemIndex
                  ? "bg-white opacity-100"
                  : "bg-neutral-200 opacity-75 group-hover:bg-white group-hover:opacity-100",
              )}
            ></span>
            <span className="sr-only">Go to {item.alt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function useCarouselState(items: CarouselItem[]) {
  const [itemIndex, setItemIndex] = useState(0);

  const intervalRef = useRef(0);

  const startInterval = useCallback(() => {
    intervalRef.current = window.setInterval(
      () => setItemIndex((currentIndex) => (currentIndex + 1) % items.length),
      10_000,
    );
  }, [items.length]);

  function stopInterval() {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }

  useEffect(() => {
    startInterval();
    return stopInterval;
  }, [startInterval]);

  return {
    itemIndex,
    goTo(newItemIndex: number) {
      stopInterval();

      setItemIndex(newItemIndex);
    },
  };
}
