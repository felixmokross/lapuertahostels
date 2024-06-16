import {
  ForwardedRef,
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
import { SpinnerIcon } from "../icons/SpinnerIcon";

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
  const [isControlsHovered, setIsControlsHovered] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(isInFullscreen());
  const activityTimeoutRef = useRef(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showImageLoadingIndicator, setShowImageLoadingIndicator] =
    useState(false);

  useEffect(() => {
    let timeout = 0;

    if (isImageLoading) {
      timeout = window.setTimeout(
        () => setShowImageLoadingIndicator(true),
        100,
      );
    } else {
      setShowImageLoadingIndicator(false);
      cancelTimer();
    }

    function cancelTimer() {
      if (timeout) window.clearTimeout(timeout);
    }

    return () => {
      cancelTimer();
    };
  }, [isImageLoading]);

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
      if (activityTimeoutRef.current) return;

      activityTimeoutRef.current = window.setTimeout(() => {
        setIsUserActive(false);
      }, 3000);
    }

    function clearTimer() {
      if (activityTimeoutRef.current) {
        window.clearTimeout(activityTimeoutRef.current);
        activityTimeoutRef.current = 0;
      }
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
    onSwipedUp: onDismiss,
    onSwipedDown: onDismiss,
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
    setIsImageLoading(true);
    setCurrentImageIndex(value);
  }
  return (
    <div
      ref={ref}
      // use a full screen panel on touch devices to
      // gather swipe gestures from the whole screen
      // as a side effect, this prevents accidental dismissals when left/right swiping
      // up/down swipes are set up to dismiss it
      className={cn(isTouchDevice() && "fixed inset-0 h-full w-full")}
    >
      <div className="fixed inset-0 m-auto h-fit w-fit">
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="-translate-x-96 -translate-y-24 scale-50 opacity-0"
          enterTo="translate-x-0 translate-y-0 scale-100 opacity-100"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0 translate-y-0 scale-100 opacity-100"
          leaveTo="-translate-x-96 -translate-y-24 scale-50 opacity-0"
        >
          <Image
            key={currentImageIndex} // ensure an old image is not rendered anymore while a new one is loading
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className={cn(
              "max-w-screen max-h-screen",
              !isFullscreen && "py-12",
            )}
            transformation={{
              height: window.innerHeight * 2,
            }}
            onLoadingFinished={() => setIsImageLoading(false)}
            {...swipeHandlers}
          />
          {showImageLoadingIndicator && (
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <SpinnerIcon className="size-10 text-neutral-300" />
            </div>
          )}
        </Transition.Child>
        <Transition.Child
          enter="delay-200"
          enterFrom="opacity-0" // need to use opacity instead of visibility so that button can be focused by the Dialog's FocusTrap
          enterTo="opacity-100"
        >
          <Transition
            show={isUserActive || isControlsHovered}
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
              onMouseEnter={() => setIsControlsHovered(true)}
              onMouseLeave={() => setIsControlsHovered(false)}
            />
          </Transition>
        </Transition.Child>
      </div>
    </div>
  );
});

function isInFullscreen() {
  return !!document.fullscreenElement;
}

function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches;
}
