import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../common/cn";
import { SlideImage } from "./slide-image";
import { Transition } from "@headlessui/react";
import { OverlayTitle } from "../common/overlay-title";
import { useEnvironment } from "~/environment";
import { useSwipeable } from "react-swipeable";
import { Media, Page } from "~/payload-types";
import { useTranslation } from "react-i18next";
import { getSrcFromMedia } from "~/common/media";

export type HeroSlidesBlockProps = NonNullable<Page["hero"]>[number] & {
  blockType: "HeroSlides";
};

export function HeroSlidesBlock({
  slides,
  autoplayIntervalInSeconds,
}: HeroSlidesBlockProps) {
  autoplayIntervalInSeconds = autoplayIntervalInSeconds || 7;

  const { t } = useTranslation();
  const [isReady, setIsReady] = useState(false);
  if (slides.length === 0) {
    throw new Error("Slides Block must have at least one slide");
  }

  const {
    slideIndex,
    goTo,
    goToNext,
    goToPrevious,
    startInterval,
    stopInterval,
  } = useSlidesState(slides, autoplayIntervalInSeconds, isReady);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventScrollOnSwipe: true,
  });

  const pauseIntervalHandlers = {
    onMouseEnter: () => stopInterval(),
    onMouseLeave: () => startInterval(),
  };

  return (
    <div
      {...swipeHandlers}
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
          <div
            className="absolute bottom-10 hidden w-full justify-center md:flex"
            {...pauseIntervalHandlers}
          >
            {slides.map((_, i) => (
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
                <span className="sr-only">
                  {t("slidesBlock.goToSlide", { slide: i + 1 })}
                </span>
              </button>
            ))}
          </div>
          <div
            className="absolute bottom-0 flex w-full justify-center md:hidden"
            {...pauseIntervalHandlers}
          >
            {slides.map((_, i) => (
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
                <span className="sr-only">
                  {t("slidesBlock.goToSlide", { slide: i + 1 })}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
      {slides.map((slide, i) => {
        const imageMedia = slide.image as Media;
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
              src={getSrcFromMedia(imageMedia)}
              alt={imageMedia.alt ?? undefined}
              withPreview={i === 0}
              alignment={slide.imageAlignment ?? "center"}
              onLoadingFinished={i === 0 ? () => setIsReady(true) : undefined}
            />
            {slide.overlayTitle?.show && (
              <OverlayTitle
                {...slide.overlayTitle}
                {...pauseIntervalHandlers}
              />
            )}
          </Transition>
        );
      })}
    </div>
  );
}

function useSlidesState(
  slides: HeroSlidesBlockProps["slides"],
  autoplayIntervalInSeconds: number,
  isReady: boolean,
) {
  const [slideIndex, setSlideIndex] = useState(0);
  const { preview } = useEnvironment();

  const intervalRef = useRef(0);

  const startInterval = useCallback(() => {
    if (intervalRef.current) return;

    // Do not auto-advance slides in preview mode
    if (preview) return;

    // Do not auto-advance if there is only one slide
    if (slides.length === 1) return;

    intervalRef.current = window.setInterval(
      () => setSlideIndex((currentIndex) => (currentIndex + 1) % slides.length),
      autoplayIntervalInSeconds * 1000,
    );
  }, [slides.length, autoplayIntervalInSeconds, preview]);

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
    if (isReady) startInterval();
    return stopInterval;
  }, [startInterval, isReady]);

  return {
    slideIndex,
    stopInterval,
    startInterval,
    goTo,
    goToNext() {
      goTo((slideIndex + 1) % slides.length);
    },
    goToPrevious() {
      goTo((slideIndex - 1 + slides.length) % slides.length);
    },
  };
}
