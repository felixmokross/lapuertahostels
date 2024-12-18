import { Media } from "~/payload-types";
import { Image, ImageProps } from "./image";

export function getSrcFromMedia(media: Media) {
  if (!media.filename) throw new Error("Media filename is required");

  return `/${encodeURIComponent(media.filename)}`;
}

export function getAltFromMedia(media: Media) {
  if (media.alt != null && typeof media.alt !== "object") {
    throw new Error("Invalid alt text");
  }
  return media.alt?.text ?? undefined;
}

export type MediaImageProps = Omit<ImageProps, "src" | "alt"> & {
  media: string | Media; // matching generated Payload type to make usage simpler – check at runtime
};

export function MediaImage({ media, ...props }: MediaImageProps) {
  if (typeof media !== "object") {
    throw new Error(
      "Media must be an object, ensure that the data is retrieved with the right depth",
    );
  }

  return (
    <Image
      src={getSrcFromMedia(media)}
      alt={getAltFromMedia(media)}
      {...props}
    />
  );
}
