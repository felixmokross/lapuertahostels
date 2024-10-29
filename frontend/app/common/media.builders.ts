import { Media } from "~/payload-types";

export function media(filename: string, alt?: string): Media {
  return {
    id: "1",
    filename,
    alt,
    createdAt: "2022-01-01T00:00:00Z",
    updatedAt: "2022-01-01T00:00:00Z",
  };
}
