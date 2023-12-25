import { useCallback, useEffect, useRef, useState } from "react";
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
  text: string;
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
              className="absolute top-0 h-full w-full object-cover"
            />
            <div className="absolute top-0 h-full w-full bg-black opacity-10"></div>
            {item.title && (
              <h3
                className={cn(
                  "absolute -translate-y-1/2 text-6xl font-light tracking-tighter text-white",
                  {
                    "left-8 top-1/3": item.title.position === "top-left",
                    "right-8 top-1/3": item.title.position === "top-right",
                    "bottom-1/3 left-8": item.title.position === "bottom-left",
                    "bottom-1/3 right-8":
                      item.title.position === "bottom-right",
                  },
                )}
                style={{ textShadow: "0 0 50px black" }}
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
    clearInterval(intervalRef.current);
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

      startInterval();
    },
  };
}
