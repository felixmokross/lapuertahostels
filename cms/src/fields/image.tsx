import { GroupField, TextField, ValidateOptions } from "payload/types";
import { mediaUrlFieldPlaceholder } from "../common/constants";
import { text } from "payload/dist/fields/validations";
import { fieldBaseClass } from "payload/dist/admin/components/forms/field-types/shared";
import React from "react";
import { useField } from "payload/components/forms";

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

export const imageField: GroupField = {
  name: "image",
  label: {
    en: "Image",
    es: "Imagen",
  },
  type: "group",
  fields: [
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
      },
    },
    {
      name: "aspectRatio",
      type: "number",
      hidden: true,
      access: {
        create: () => false,
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            // ensures data is not stored in DB
            delete data.aspectRatio;
          },
        ],
        afterRead: [
          async ({ siblingData }) => {
            try {
              const probeImageSize = require("probe-image-size");
              const result = await probeImageSize(siblingData.url);
              return result.width / result.height;
            } catch (e) {
              console.error(e);
              return undefined;
            }
          },
        ],
      },
    },
  ],
};
