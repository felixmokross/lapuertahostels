import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../components/cn";
import { SlideImage } from "../components/slide-image";
import { Transition } from "@headlessui/react";
import { ImageTransformation } from "../components/image";
import { OverlayTitle } from "../components/overlay-title";
import { useEnvironment } from "~/environment";
import { useSwipeable } from "react-swipeable";

export type SlidesBlockProps = {
  slides: Slide[];
  transformation?: ImageTransformation;
  autoplayIntervalInSeconds?: number;
};

export type Slide = {
  src: string;
  alt: string;
  title?: SlideTitle;
  imageAlignment?: "center" | "bottom";
};

export type SlideTitle = {
  text: string | ReactNode;
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
  imageOverlay?: "subtle" | "moderate" | "intense";
  cta?: SlideCallToAction;
};

export type SlideCallToAction = {
  text: string;
  to: string;
};

export function SlidesBlock({
  slides,
  transformation,
  autoplayIntervalInSeconds = 10,
}: SlidesBlockProps) {
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
                    "h-1 w-10 rounded-full transition-[background-color,opacity] duration-200 ease-in",
                    i === slideIndex
                      ? "bg-white opacity-100"
                      : "bg-neutral-200 opacity-75 group-hover:bg-white group-hover:opacity-100",
                  )}
                ></span>
                <span className="sr-only">Go to {slide.alt}</span>
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
                <span className="sr-only">Go to {slide.alt}</span>
              </button>
            ))}
          </div>
        </>
      )}
      {slides.map((slide, i) => {
        return (
          <Transition
            key={i}
            className="h-full"
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
              src={slide.src}
              alt={slide.alt}
              transformation={transformation}
              withPreview={i === 0}
              className="absolute top-0"
              alignment={slide.imageAlignment}
            />
            {slide.title && (
              <OverlayTitle
                overlay={slide.title.imageOverlay}
                position={slide.title.position}
                cta={slide.title.cta}
              >
                {slide.title.text}
              </OverlayTitle>
            )}
          </Transition>
        );
      })}
    </div>
  );
}

function useSlidesState(slides: Slide[], autoplayIntervalInSeconds: number) {
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
