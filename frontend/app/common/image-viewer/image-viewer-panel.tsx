import {
  ElementType,
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
import { useTranslation } from "react-i18next";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

export type ImageViewerPanelProps = {
  defaultImageIndex?: number;
  images: ImageViewerImage[];
  zoomButtonRef?: RefObject<HTMLButtonElement>;
  onDismiss: () => void;
};

export function ImageViewerPanel({
  defaultImageIndex,
  images,
  zoomButtonRef,
  onDismiss,
}: ImageViewerPanelProps) {
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
      if (activityTimeoutRef.current) clearTimeout(activityTimeoutRef.current);
      activityTimeoutRef.current = window.setTimeout(() => {
        setIsUserActive(false);
      }, 3000);
    }

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);
    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
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
      {isUserActive && <PreviousButton onClick={goToPreviousImage} />}
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
      {isUserActive && <NextButton onClick={goToNextImage} />}
      {isUserActive && (
        <Transition.Child
          as={Fragment}
          enter="delay-200"
          enterFrom="invisible"
          enterTo="visible"
        >
          <div className="fixed inset-0 flex h-12 w-full items-center justify-between gap-4 bg-black/60 px-4 text-sm text-neutral-300 shadow-lg">
            <div>
              {currentImageIndex + 1} / {images.length}
            </div>
            <div>{images[currentImageIndex].caption}</div>
            <div className="space-x-2">
              {isFullscreen ? <ExitFullscreenButton /> : <FullscreenButton />}
              {!isFullscreen && <CloseButton onClick={onDismiss} />}
            </div>
          </div>
        </Transition.Child>
      )}
    </div>
  );
}
function isInFullscreen() {
  return !!document.fullscreenElement;
}

function PreviousButton({ onClick }: Pick<PreviousNextButtonProps, "onClick">) {
  const { t } = useTranslation();
  return (
    <PreviousNextButton
      className={cn("left-0 top-1/2 -translate-y-1/2")}
      icon={ArrowLeftIcon}
      onClick={onClick}
      title={t("imageViewer.previous")}
    />
  );
}

function NextButton({ onClick }: Pick<PreviousNextButtonProps, "onClick">) {
  const { t } = useTranslation();
  return (
    <PreviousNextButton
      className={cn("right-0 top-1/2 -translate-y-1/2")}
      icon={ArrowRightIcon}
      onClick={onClick}
      title={t("imageViewer.next")}
    />
  );
}

function ExitFullscreenButton() {
  const { t } = useTranslation();
  return (
    <IconButton
      icon={ArrowsPointingInIcon}
      onClick={() => document.exitFullscreen()}
      title={t("imageViewer.exitFullscreen")}
    />
  );
}

function FullscreenButton() {
  const { t } = useTranslation();
  return (
    <IconButton
      icon={ArrowsPointingOutIcon}
      onClick={() => document.documentElement.requestFullscreen()}
      title={t("imageViewer.fullscreen")}
    />
  );
}

type CloseButtonProps = {
  onClick: () => void;
};

function CloseButton({ onClick }: CloseButtonProps) {
  const { t } = useTranslation();
  return (
    <IconButton
      onClick={onClick}
      icon={XMarkIcon}
      title={t("imageViewer.close")}
    />
  );
}

type PreviousNextButtonProps = {
  className?: string;
  icon: ElementType;
  onClick: () => void;
  title: string;
};

function PreviousNextButton({
  className,
  onClick,
  icon,
  title,
}: PreviousNextButtonProps) {
  return (
    <Transition.Child
      as={Fragment}
      enter="delay-200"
      enterFrom="invisible"
      enterTo="visible"
    >
      <IconButton
        icon={icon}
        onClick={onClick}
        title={title}
        className={cn(
          "fixed z-10 m-4 rounded-full bg-black/60 shadow-md",
          className,
        )}
      />
    </Transition.Child>
  );
}

type IconButtonProps = {
  className?: string;
  icon: ElementType;
  onClick: () => void;
  title: string;
};

const IconButton = forwardRef(function IconButton(
  { className, icon: Icon, onClick, title }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      className={cn(
        "p-2 text-neutral-300 hover:text-white focus:text-white",
        className,
      )}
      onClick={onClick}
      title={title}
      ref={ref}
    >
      <span className="sr-only">{title}</span>
      <Icon className="h-5 w-5" />
    </button>
  );
});
