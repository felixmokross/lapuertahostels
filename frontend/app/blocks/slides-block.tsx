import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../components/cn";
import { SlideImage } from "../components/slide-image";
import { Transition } from "@headlessui/react";
import { ImageTransformation } from "../components/image";
import { OverlayTitle } from "../components/overlay-title";

export type SlidesBlockProps = {
  slides: Slide[];
  transformation?: ImageTransformation;
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

export function SlidesBlock({ slides, transformation }: SlidesBlockProps) {
  if (slides.length === 0) {
    throw new Error("Slides Block must have at least one slide");
  }

  const { slideIndex, goTo } = useSlidesState(slides);

  return (
    <div className="relative h-[30rem] bg-puerta-100 md:h-[40rem]">
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
      <div className="absolute bottom-8 flex w-full -translate-y-1/2 justify-center">
        {slides.map((slide, i) => (
          <button
            className={cn("group inline-flex h-10 items-center px-2")}
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
    </div>
  );
}

function useSlidesState(slides: Slide[]) {
  const [slideIndex, setSlideIndex] = useState(0);

  const intervalRef = useRef(0);

  const startInterval = useCallback(() => {
    intervalRef.current = window.setInterval(
      () => setSlideIndex((currentIndex) => (currentIndex + 1) % slides.length),
      10_000,
    );
  }, [slides.length]);

  function stopInterval() {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }

  useEffect(() => {
    startInterval();
    return stopInterval;
  }, [startInterval]);

  return {
    slideIndex,
    goTo(newSlideIndex: number) {
      stopInterval();

      setSlideIndex(newSlideIndex);
    },
  };
}
