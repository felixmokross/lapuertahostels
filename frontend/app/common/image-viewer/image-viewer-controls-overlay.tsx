import { useTranslation } from "react-i18next";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { cn } from "../cn";
import { ElementType, ForwardedRef, forwardRef } from "react";

export type ImageViewerControlsOverlayProps = {
  supportsFullscreen: boolean;
  isFullscreen: boolean;
  currentImageIndex: number;
  numberOfImages: number;
  caption?: string;
  onDismiss: () => void;
  onGoToNextImage: () => void;
  onGoToPreviousImage: () => void;
  onEnterFullscreen: () => void;
  onExitFullscreen: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function ImageViewerControlsOverlay({
  currentImageIndex,
  numberOfImages,
  caption,
  supportsFullscreen,
  isFullscreen,
  onDismiss,
  onGoToNextImage,
  onGoToPreviousImage,
  onEnterFullscreen,
  onExitFullscreen,
  onMouseEnter,
  onMouseLeave,
}: ImageViewerControlsOverlayProps) {
  const { t } = useTranslation();
  return (
    <>
      <PreviousNextButton
        className={cn("right-0 top-1/2 -translate-y-1/2")}
        icon={ArrowRightIcon}
        onClick={onGoToNextImage}
        title={t("imageViewer.next")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <PreviousNextButton
        className={cn("left-0 top-1/2 -translate-y-1/2")}
        icon={ArrowLeftIcon}
        onClick={onGoToPreviousImage}
        title={t("imageViewer.previous")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <div
        className="fixed inset-0 flex h-12 w-full items-center justify-between gap-2 bg-black/60 px-2 text-sm text-neutral-300 shadow-lg md:gap-4 md:px-4"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="whitespace-nowrap p-2 text-center">
          {currentImageIndex + 1} / {numberOfImages}
        </div>
        <div className="invisible flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap p-2 text-center sm:visible">
          {caption}
        </div>
        <div className="flex items-center justify-end gap-1 md:gap-2">
          {supportsFullscreen &&
            (isFullscreen ? (
              <IconButton
                icon={ArrowsPointingInIcon}
                onClick={onExitFullscreen}
                title={t("imageViewer.exitFullscreen")}
              />
            ) : (
              <IconButton
                icon={ArrowsPointingOutIcon}
                onClick={onEnterFullscreen}
                title={t("imageViewer.fullscreen")}
              />
            ))}
          {!isFullscreen && (
            <IconButton
              onClick={onDismiss}
              icon={XMarkIcon}
              title={t("imageViewer.close")}
            />
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex h-12 w-full items-center justify-center bg-black/60 px-4 text-sm text-neutral-300 shadow-lg sm:hidden">
        <div className="overflow-hidden overflow-ellipsis whitespace-nowrap px-2 text-center ">
          {caption}
        </div>
      </div>
    </>
  );
}

type PreviousNextButtonProps = {
  className?: string;
  icon: ElementType;
  onClick: () => void;
  title: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const PreviousNextButton = forwardRef(function PreviousNextButton(
  {
    className,
    onClick,
    icon,
    title,
    onMouseEnter,
    onMouseLeave,
  }: PreviousNextButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <IconButton
      icon={icon}
      onClick={onClick}
      title={title}
      className={cn(
        "fixed z-10 m-4 rounded-full bg-black/60 shadow-md",
        className,
      )}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
});

type IconButtonProps = {
  className?: string;
  icon: ElementType;
  onClick: () => void;
  title: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const IconButton = forwardRef(function IconButton(
  {
    className,
    icon: Icon,
    onClick,
    title,
    onMouseEnter,
    onMouseLeave,
  }: IconButtonProps,
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="sr-only">{title}</span>
      <Icon className="h-5 w-5" />
    </button>
  );
});
