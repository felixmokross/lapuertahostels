import { Media, Page } from "~/payload-types";
import { OverlayTitle } from "./common/overlay-title";
import { useEnvironment } from "~/environment";

export type HeroVideoBlockProps = NonNullable<Page["hero"]>[number] & {
  blockType: "HeroVideo";
};

export function HeroVideoBlock({
  previewImage,
  video,
  overlayTitle,
}: HeroVideoBlockProps) {
  const { imagekitBaseUrl } = useEnvironment();

  const previewUrl = (previewImage as Media).filename;
  const videoMedia = video as Media;
  return (
    <div className="relative h-[30rem] bg-puerta-100 md:h-[40rem]">
      <video
        src={`${imagekitBaseUrl}/${videoMedia.filename}`}
        poster={
          previewUrl ? `${imagekitBaseUrl}/tr:h-720/${previewUrl}` : undefined
        }
        autoPlay
        muted
        loop
        playsInline
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        className="pointer-events-none absolute top-0 h-full w-full object-cover"
      >
        {videoMedia.alt && <p>${videoMedia.alt}</p>}
      </video>
      {overlayTitle?.show && <OverlayTitle {...overlayTitle} />}
    </div>
  );
}
