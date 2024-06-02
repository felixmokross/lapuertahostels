import { Page } from "~/payload-types";
import { OverlayTitle } from "./common/overlay-title";
import { useEnvironment } from "~/environment";

export type HeroVideoBlockProps = NonNullable<Page["hero"]>[number] & {
  blockType: "HeroVideo";
};

export function HeroVideoBlock({
  previewUrl,
  videoUrl,
  overlayTitle,
}: HeroVideoBlockProps) {
  const { imagekitBaseUrl } = useEnvironment();

  if (previewUrl && !previewUrl.startsWith(imagekitBaseUrl)) {
    throw new Error(`Preview Image URL must start with ${imagekitBaseUrl}`);
  }

  previewUrl = previewUrl?.slice(imagekitBaseUrl.length);
  return (
    <div className="relative h-[30rem] bg-puerta-100 md:h-[40rem]">
      <video
        src={videoUrl}
        poster={previewUrl && `${imagekitBaseUrl}/tr:h-720${previewUrl}`}
        autoPlay
        muted
        loop
        playsInline
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        className="pointer-events-none absolute top-0 h-full w-full object-cover"
      />
      {overlayTitle?.show && <OverlayTitle {...overlayTitle} />}
    </div>
  );
}
