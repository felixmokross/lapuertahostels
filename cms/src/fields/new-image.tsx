import { UploadField } from "payload/types";
import { Media } from "../collections/Media";

export type NewImageFieldOptions = {
  optional?: boolean;
};

export function makeNewImageField({
  optional = false,
}: NewImageFieldOptions = {}): UploadField {
  return {
    name: "image",
    label: {
      en: "Image",
      es: "Imagen",
    },
    type: "upload",
    relationTo: Media.slug,
    required: !optional,
    filterOptions: {
      mimeType: { contains: "image/" },
    },
  };
}

export const newImageField = makeNewImageField();
