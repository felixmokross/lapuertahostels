import { OverlayTitle, OverlayTitleProps } from "../components/overlay-title";
import { useEnvironment } from "~/environment";

export type HeroVideoBlockProps = {
  src: string;
  previewSrc?: string;
  overlayTitle?: OverlayTitleProps;
};

export function HeroVideoBlock({
  src,
  previewSrc,
  overlayTitle,
}: HeroVideoBlockProps) {
  const { imagekitBaseUrl } = useEnvironment();

  if (previewSrc && !previewSrc.startsWith(imagekitBaseUrl)) {
    throw new Error(`Preview Image URL must start with ${imagekitBaseUrl}`);
  }

  previewSrc = previewSrc?.slice(imagekitBaseUrl.length);

  return (
    <div className="relative h-[30rem] bg-puerta-100 md:h-[40rem]">
      <video
        src={src}
        poster={previewSrc && `${imagekitBaseUrl}/tr:h-720${previewSrc}`}
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
