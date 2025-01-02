import { Page, Text } from "~/payload-types";
import { OverlayTitle } from "./common/overlay-title";
import { useEnvironment } from "~/common/environment";

export type HeroVideoBlockProps = NonNullable<Page["hero"]>[number] & {
  blockType: "HeroVideo";
};

export function HeroVideoBlock({
  previewImage,
  video,
  overlayTitle,
}: HeroVideoBlockProps) {
  const { imagekitBaseUrl } = useEnvironment();

  if (previewImage != null && typeof previewImage !== "object") {
    throw new Error("Invalid previewImage");
  }

  if (typeof video !== "object") {
    throw new Error("Invalid video");
  }

  if (video != null && video.alt != null && typeof video.alt !== "object") {
    throw new Error("Invalid video alt text");
  }

  const previewUrl = previewImage?.filename;
  return (
    <div className="relative h-[30rem] bg-puerta-100 md:h-[40rem]">
      <video
        src={`${imagekitBaseUrl}/${video.filename}`}
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
        {video.alt && <p>{(video.alt as Text).text}</p>}
      </video>
      {overlayTitle?.show && (
        <OverlayTitle headingLevel={2} {...overlayTitle} />
      )}
    </div>
  );
}
