import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "./classnames";
import { Image } from "./image";
import { Transition } from "@headlessui/react";

export type CarouselProps = {
  items: CarouselItem[];
};

export type CarouselItem = {
  src: string;
  alt: string;
  title: CarouselItemTitle;
};

export type CarouselItemTitle = {
  text: string | ReactNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export function Carousel({ items }: CarouselProps) {
  if (items.length === 0) {
    throw new Error("Carousel must have at least one item");
  }

  const { itemIndex, goTo } = useCarouselState(items);

  return (
    <div className="relative h-[30rem] bg-puerta-100">
      {items.map((item, i) => {
        item = items[i];
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
            <Image
              src={item.src}
              alt={item.alt}
              withPreview={i === 0}
              className="absolute top-0"
            />
            <div className="absolute top-0 h-full w-full bg-black opacity-20"></div>
            {item.title && (
              <h3
                className={cn(
                  "absolute max-w-xl font-serif text-6xl font-light leading-relaxed tracking-tighter text-white",
                  {
                    "left-8 top-8": item.title.position === "top-left",
                    "right-8 top-8 text-right":
                      item.title.position === "top-right",
                    "bottom-8 left-8": item.title.position === "bottom-left",
                    "bottom-8 right-8 text-right":
                      item.title.position === "bottom-right",
                  },
                )}
                style={{ textShadow: "0 0 25px black" }}
              >
                {item.title.text}
              </h3>
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
      5000,
    );
  }, [items.length]);

  function stopInterval() {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }

  useEffect(() => {
    // startInterval();
    return stopInterval;
  }, [startInterval]);

  return {
    itemIndex,
    goTo(newItemIndex: number) {
      stopInterval();

      setItemIndex(newItemIndex);

      // startInterval();
    },
  };
}
