import {
  ForwardedRef,
  Fragment,
  RefObject,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../cn";
import { ImageViewerImage } from "./types";
import { Transition } from "@headlessui/react";
import { Image } from "~/common/image";
import { ImageViewerControlsOverlay } from "./image-viewer-controls-overlay";

export type ImageViewerPanelProps = {
  defaultImageIndex?: number;
  images: ImageViewerImage[];
  zoomButtonRef?: RefObject<HTMLButtonElement>;
  onDismiss: () => void;
};

export const ImageViewerPanel = forwardRef(function ImageViewerPanel(
  {
    defaultImageIndex,
    images,
    zoomButtonRef,
    onDismiss,
  }: ImageViewerPanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    defaultImageIndex ?? 0,
  );
  const [isZoomed, setIsZoomed] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(isInFullscreen());
  const activityTimeoutRef = useRef(0);

  // sync fullscreen state with browser
  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(isInFullscreen());
    }

    document.documentElement.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
    );

    return () =>
      document.documentElement.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
  }, []);

  useEffect(() => {
    if (!isFullscreen) setIsZoomed(false);
  }, [isFullscreen]);

  useEffect(() => {
    function handleActivity() {
      setIsUserActive(true);
      resetTimer();
    }

    function resetTimer() {
      clearTimer();

      activityTimeoutRef.current = window.setTimeout(() => {
        setIsUserActive(false);
      }, 3000);
    }

    function clearTimer() {
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
    }

    resetTimer();

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);

      clearTimer();
    };
  }, []);

  const goToPreviousImage = useCallback(
    function goToPreviousImage() {
      goToImage((v) => (v > 0 ? v - 1 : images.length - 1));
    },
    [images.length],
  );

  const goToNextImage = useCallback(
    function goToNextImage() {
      goToImage((v) => (v < images.length - 1 ? v + 1 : 0));
    },
    [images.length],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        goToPreviousImage();
      } else if (e.key === "ArrowRight") {
        goToNextImage();
      } else if (isZoomed && e.key === "Escape") {
        e.stopPropagation();
        setIsZoomed(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToNextImage, goToPreviousImage, isZoomed]);

  function goToImage(value: SetStateAction<number>) {
    setIsZoomed(false);
    setCurrentImageIndex(value);
  }
  return (
    <div
      ref={ref}
      className={cn(
        "m-auto",
        isZoomed
          ? "fixed inset-0 overflow-auto"
          : cn(
              "fixed inset-0 w-max",
              !isFullscreen &&
                "max-h-[calc(100%-6rem)] max-w-[calc(100%-6rem)]",
            ),
      )}
    >
      <button
        ref={zoomButtonRef}
        className={cn(
          "block h-full w-full focus:outline-none",
          isZoomed ? "cursor-all-scroll" : "cursor-zoom-in",
        )}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="-translate-x-96 -translate-y-24 scale-50 opacity-0"
          enterTo="translate-x-0 translate-y-0 scale-100 opacity-100"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0 translate-y-0 scale-100 opacity-100"
          leaveTo="-translate-x-96 -translate-y-24 scale-50 opacity-0"
        >
          <Image
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className={cn(isZoomed ? "h-max w-max scale-110" : "h-full w-full")}
            {...(isZoomed
              ? undefined
              : {
                  transformation: {
                    height: document.body.clientHeight * 2,
                  },
                })}
          />
        </Transition.Child>
      </button>
      {isUserActive && (
        <Transition.Child
          enter="delay-200"
          enterFrom="invisible"
          enterTo="visible"
        >
          <ImageViewerControlsOverlay
            currentImageIndex={currentImageIndex}
            isFullscreen={isFullscreen}
            numberOfImages={images.length}
            caption={images[currentImageIndex].caption}
            onDismiss={onDismiss}
            onGoToNextImage={goToNextImage}
            onGoToPreviousImage={goToPreviousImage}
            onEnterFullscreen={() =>
              document.documentElement.requestFullscreen()
            }
            onExitFullscreen={() => document.exitFullscreen()}
          />
        </Transition.Child>
      )}
    </div>
  );
});

function isInFullscreen() {
  return !!document.fullscreenElement;
}
