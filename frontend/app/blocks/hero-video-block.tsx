import { useRouteLoaderData } from "@remix-run/react";
import { OverlayTitle, OverlayTitleProps } from "../components/overlay-title";
import { type loader as rootLoader } from "~/root";

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
  const rootLoaderData = useRouteLoaderData<typeof rootLoader>("root");
  if (!rootLoaderData) throw new Error("root loader not found");

  const { imagekitBaseUrl } = rootLoaderData;
  if (!imagekitBaseUrl) throw new Error("imagekitBaseUrl not available");

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
