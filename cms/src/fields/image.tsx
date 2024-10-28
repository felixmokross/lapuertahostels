import { UploadField } from "payload/types";
import { Media } from "../collections/Media";

export type ImageFieldOptions = {
  optional?: boolean;
};

export function makeImageField({
  optional = false,
}: ImageFieldOptions = {}): UploadField {
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

export const imageField = makeImageField();
