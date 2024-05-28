import { OverlayTitle, OverlayTitleProps } from "./overlay-title";

export type HeroVideoProps = {
  src: string;
  overlayTitle?: OverlayTitleProps;
};

export function HeroVideo({ src, overlayTitle }: HeroVideoProps) {
  return (
    <div className="relative h-[30rem] bg-puerta-100 md:h-[40rem]">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        className="pointer-events-none absolute top-0 h-full w-full object-cover"
      />
      {overlayTitle && <OverlayTitle {...overlayTitle} />}
    </div>
  );
}
