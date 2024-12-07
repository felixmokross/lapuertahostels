import { UploadField } from "payload";

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
    relationTo: "media",
    required: !optional,
    filterOptions: {
      mimeType: { contains: "image/" },
    },
  };
}

export const imageField = makeImageField();
