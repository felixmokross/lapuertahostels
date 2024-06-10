import {
  ForwardedRef,
  Fragment,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageViewerImage } from "./types";
import { Transition } from "@headlessui/react";
import { Image } from "~/common/image";
import { ImageViewerControlsOverlay } from "./image-viewer-controls-overlay";
import { cn } from "../cn";
import { useSwipeable } from "react-swipeable";

export type ImageViewerPanelProps = {
  defaultImageIndex?: number;
  images: ImageViewerImage[];
  onDismiss: () => void;
};

export const ImageViewerPanel = forwardRef(function ImageViewerPanel(
  { defaultImageIndex, images, onDismiss }: ImageViewerPanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [currentImageIndex, setCurrentImageIndex] = useState(
    defaultImageIndex ?? 0,
  );
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
    function handleActivity() {
      setIsUserActive(true);
      resetTimer();
    }

    function resetTimer() {
      clearTimer();
      startTimer();
    }

    function startTimer() {
      activityTimeoutRef.current = window.setTimeout(() => {
        setIsUserActive(false);
      }, 3000);
    }

    function clearTimer() {
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
    }

    startTimer();

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    document.addEventListener("touchstart", handleActivity);
    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("touchstart", handleActivity);

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNextImage,
    onSwipedRight: goToPreviousImage,
    preventScrollOnSwipe: true,
  });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      // blur the focused button to avoid confusion when navigating with arrow keys
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      if (e.key === "ArrowLeft") {
        goToPreviousImage();
      } else if (e.key === "ArrowRight") {
        goToNextImage();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToNextImage, goToPreviousImage]);

  function goToImage(value: SetStateAction<number>) {
    setCurrentImageIndex(value);
  }
  return (
    <div ref={ref} className="fixed inset-0 m-auto h-fit w-fit">
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
          className={cn("max-w-screen max-h-screen", !isFullscreen && "py-12")}
          transformation={{
            height: document.body.clientHeight * 2,
          }}
          {...swipeHandlers}
        />
      </Transition.Child>
      <Transition.Child
        enter="delay-200"
        enterFrom="opacity-0" // need to use opacity instead of visibility so that button can be focused by the Dialog's FocusTrap
        enterTo="opacity-100"
      >
        <Transition
          show={isUserActive}
          enter="duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ImageViewerControlsOverlay
            currentImageIndex={currentImageIndex}
            supportsFullscreen={!!document.fullscreenEnabled}
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
        </Transition>
      </Transition.Child>
    </div>
  );
});

function isInFullscreen() {
  return !!document.fullscreenElement;
}
