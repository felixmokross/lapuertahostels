import { Media } from "~/payload-types";

export function getSrcFromMedia(media: Media) {
  if (!media.filename) throw new Error("Media filename is required");

  return `/${encodeURIComponent(media.filename)}`;
}
