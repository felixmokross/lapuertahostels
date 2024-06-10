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
}: ImageViewerControlsOverlayProps) {
  const { t } = useTranslation();
  return (
    <>
      <PreviousNextButton
        className={cn("right-0 top-1/2 -translate-y-1/2")}
        icon={ArrowRightIcon}
        onClick={onGoToNextImage}
        title={t("imageViewer.next")}
      />
      <PreviousNextButton
        className={cn("left-0 top-1/2 -translate-y-1/2")}
        icon={ArrowLeftIcon}
        onClick={onGoToPreviousImage}
        title={t("imageViewer.previous")}
      />
      <div className="fixed inset-0 grid h-12 w-full grid-cols-[12rem,minmax(0,1fr),12rem] gap-4 bg-black/60 px-4 text-sm text-neutral-300 shadow-lg">
        <div className="flex items-center justify-start">
          {currentImageIndex + 1} / {numberOfImages}
        </div>
        <div className="flex items-center justify-center">{caption}</div>
        <div className="flex items-center justify-end gap-2">
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
    </>
  );
}

type PreviousNextButtonProps = {
  className?: string;
  icon: ElementType;
  onClick: () => void;
  title: string;
};

const PreviousNextButton = forwardRef(function PreviousNextButton(
  { className, onClick, icon, title }: PreviousNextButtonProps,
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
    />
  );
});

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
