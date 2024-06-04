import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../components/cn";
import { SlideImage } from "./slide-image";
import { Transition } from "@headlessui/react";
import { OverlayTitle } from "../common/overlay-title";
import { useEnvironment } from "~/environment";
import { useSwipeable } from "react-swipeable";
import { Page } from "~/payload-types";

export type SlidesBlockProps = NonNullable<Page["hero"]>[number] & {
  blockType: "Slides";
};

export function SlidesBlock({
  slides,
  autoplayIntervalInSeconds,
}: SlidesBlockProps) {
  autoplayIntervalInSeconds = autoplayIntervalInSeconds || 10;

  if (slides.length === 0) {
    throw new Error("Slides Block must have at least one slide");
  }

  const { slideIndex, goTo, goToNext, goToPrevious } = useSlidesState(
    slides,
    autoplayIntervalInSeconds,
  );

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventScrollOnSwipe: true,
  });

  return (
    <div
      {...handlers}
      className="relative h-[30rem] bg-puerta-100 focus:outline-none md:h-[40rem]"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
      }}
      tabIndex={0}
      role="tablist"
    >
      {slides.length > 1 && (
        <>
          <div className="absolute bottom-10 hidden w-full justify-center md:flex">
            {slides.map((slide, i) => (
              <button
                className="group z-10 inline-flex h-10 items-center px-2"
                key={i}
                onClick={() => goTo(i)}
              >
                <span
                  className={cn(
                    "h-1 w-10 rounded-full shadow-md shadow-black/50 transition-[background-color,opacity] duration-200 ease-in",
                    i === slideIndex
                      ? "bg-white opacity-100"
                      : "bg-neutral-200 opacity-75 group-hover:bg-white group-hover:opacity-100",
                  )}
                ></span>
                <span className="sr-only">Go to {slide.image.alt}</span>
              </button>
            ))}
          </div>
          <div className="absolute bottom-0 flex w-full justify-center md:hidden">
            {slides.map((slide, i) => (
              <button
                className="group z-10 inline-flex h-10 flex-grow items-end"
                key={i}
                onClick={() => goTo(i)}
              >
                <span
                  className={cn(
                    "h-1.5 flex-grow transition-[background-color,opacity] duration-200 ease-in",
                    i === slideIndex
                      ? "bg-white opacity-85"
                      : "bg-neutral-200 opacity-65 group-hover:bg-white group-hover:opacity-85",
                  )}
                ></span>
                <span className="sr-only">Go to {slide.image.alt}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {slides.map((slide, i) => {
        return (
          <Transition
            key={i}
            className="absolute top-0 h-full w-full transform-gpu"
            show={i === slideIndex}
            unmount={false}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <SlideImage
              src={slide.image.url}
              alt={slide.image.alt}
              transformation={{
                aspectRatio: { width: 4, height: 3 },
                width: 3200,
              }}
              withPreview={i === 0}
              alignment={slide.image.alignment || "center"}
            />
            {slide.overlayTitle?.show && (
              <OverlayTitle {...slide.overlayTitle} />
            )}
          </Transition>
        );
      })}
    </div>
  );
}

function useSlidesState(
  slides: SlidesBlockProps["slides"],
  autoplayIntervalInSeconds: number,
) {
  const [slideIndex, setSlideIndex] = useState(0);
  const { preview } = useEnvironment();

  const intervalRef = useRef(0);

  const startInterval = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = window.setInterval(
      () => setSlideIndex((currentIndex) => (currentIndex + 1) % slides.length),
      autoplayIntervalInSeconds * 1000,
    );
  }, [slides.length, autoplayIntervalInSeconds]);

  function stopInterval() {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  }

  function goTo(newSlideIndex: number) {
    stopInterval();

    setSlideIndex(newSlideIndex);
  }

  useEffect(() => {
    // Do not auto-advance slides in preview mode
    if (preview) return;

    // Do not auto-advance if there is only one slide
    if (slides.length === 1) return;

    startInterval();
    return stopInterval;
  }, [startInterval, preview, slides.length]);

  return {
    slideIndex,
    goTo,
    goToNext() {
      goTo((slideIndex + 1) % slides.length);
    },
    goToPrevious() {
      goTo((slideIndex - 1 + slides.length) % slides.length);
    },
  };
}
