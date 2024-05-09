import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./cn";
import { CarouselImage } from "./carousel-image";
import { Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { Heading } from "./heading";
import { Button } from "./button";
import { Link } from "@remix-run/react";
import { ImageTransformation } from "./image";

export type CarouselProps = {
  items: CarouselItem[];
  transformation?: ImageTransformation;
};

export type CarouselItem = {
  src: string;
  alt: string;
  title?: CarouselItemTitle;
  position?: "center" | "bottom";
  cta?: CarouselItemCallToAction;
};

export type CarouselItemCallToAction = {
  text: string;
  to?: string;
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
};

export function Carousel({ items, transformation }: CarouselProps) {
  if (items.length === 0) {
    throw new Error("Carousel must have at least one item");
  }

  const { itemIndex, goTo } = useCarouselState(items);
  const { t } = useTranslation();

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
              <>
                <div
                  className={cn("absolute top-0 h-full w-full bg-black", {
                    "opacity-15": item.title.imageOverlay === "subtle",
                    "opacity-20":
                      !item.title.imageOverlay ||
                      item.title.imageOverlay === "moderate",
                    "opacity-25": item.title.imageOverlay === "intense",
                  })}
                ></div>
                <div
                  className={cn("absolute max-w-xl space-y-6", {
                    "left-8 top-8": item.title.position === "top-left",
                    "right-8 top-8 text-right":
                      item.title.position === "top-right",
                    "bottom-8 left-8": item.title.position === "bottom-left",
                    "bottom-8 right-8 text-right":
                      item.title.position === "bottom-right",
                    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center":
                      !item.title.position || item.title.position === "center",
                  })}
                >
                  <Heading
                    as="h3"
                    size="extra-large"
                    variant="white"
                    textShadow
                  >
                    {item.title.text}
                  </Heading>
                  {item.cta && (
                    <Button
                      as={Link}
                      size="large"
                      blackShadow
                      to={item.cta.to || "#"}
                    >
                      {t("carousel.cta")}
                    </Button>
                  )}
                </div>
              </>
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
