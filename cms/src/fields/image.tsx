import { GroupField, ValidateOptions } from "payload/types";
import { mediaUrlFieldPlaceholder } from "../common/constants";
import { text } from "payload/dist/fields/validations";
import { fieldBaseClass } from "payload/dist/admin/components/forms/field-types/shared";
import React from "react";
import { useField } from "payload/components/forms";
import { showField } from "./show";
import { getImageKit } from "../common/imagekit";

function validateImageUrl(
  val: string,
  args: ValidateOptions<unknown, unknown, unknown>,
) {
  if (val && !val.startsWith(process.env.PAYLOAD_PUBLIC_IMAGEKIT_BASE_URL)) {
    return args.t("custom:validation.imageUrlMustBeImageKit", {
      exampleUrl: `${process.env.PAYLOAD_PUBLIC_IMAGEKIT_BASE_URL}/…`,
    });
  }

  return text(val, args);
}

export type ImageFieldOptions = {
  optional?: boolean;
};

export function makeImageField({
  optional = false,
}: ImageFieldOptions = {}): GroupField {
  const condition = optional ? (_, siblingData) => siblingData.show : undefined;
  return {
    name: "image",
    label: {
      en: "Image",
      es: "Imagen",
    },
    type: "group",
    fields: [
      ...(optional ? [showField] : []),
      {
        name: "url",
        label: {
          en: "URL",
          es: "URL",
        },
        type: "text",
        required: true,
        validate: validateImageUrl,
        admin: {
          description: {
            en: "Link to an image on ImageKit. You don’t need to optimize the image before uploading it to ImageKit.",
            es: "Enlace a una imagen en ImageKit. No es necesario optimizar la imagen antes de subirla a ImageKit.",
          },
          placeholder: mediaUrlFieldPlaceholder,
          condition,
        },
      },
      {
        name: "alt",
        label: {
          en: "Alternative Text",
          es: "Texto alternativo",
        },
        type: "text",
        localized: true,
        admin: {
          description: {
            en: "A brief description of the image for screen readers and search engines. It is not displayed on the page but is important for accessibility.",
            es: "Una breve descripción de la imagen para lectores de pantalla y motores de búsqueda. No se muestra en la página, pero es importante para la accesibilidad.",
          },
          condition,
        },
      },
      {
        name: "preview",
        type: "ui",
        admin: {
          components: {
            Field: ({ path }) => {
              const { value, valid } = useField<string>({
                path: `${path}.url`,
              });

              if (!value || !valid) {
                return null;
              }

              return (
                <div className={fieldBaseClass}>
                  <img src={value} alt="Preview of the image" />
                </div>
              );
            },
          },
          // API seems to be inconsistent here, the condition seems to get the parent's siblingData for UI fields
          condition: optional
            ? (_, siblingData) => siblingData.image?.show
            : undefined,
        },
      },
      {
        name: "aspectRatio",
        type: "number",
        access: {
          create: () => false,
          update: () => false,
        },
        label: {
          en: "Aspect Ratio",
          es: "Relación de aspecto",
        },
        hooks: {
          beforeChange: [
            async ({ siblingData }) => {
              if (!siblingData.show) return undefined;
              return getImageAspectRatio(siblingData.url);
            },
          ],
          afterRead: [
            async ({ siblingData }) => {
              if (!siblingData.show) return undefined;

              if (siblingData.aspectRatio != null) {
                return siblingData.aspectRatio;
              }

              console.log("Aspect ratio not cached, fetching from ImageKit");
              return await getImageAspectRatio(siblingData.url);
            },
          ],
        },
        admin: {
          condition,
          description: {
            en: "This value is determined automatically when saving.",
            es: "Este valor se determina automáticamente al guardar.",
          },
        },
      },
    ],
  };
}

export const imageField: GroupField = makeImageField();

async function getImageAspectRatio(imageUrl: string) {
  try {
    const result = await getImageKit().getFileMetadata(imageUrl);
    return result.width / result.height;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
