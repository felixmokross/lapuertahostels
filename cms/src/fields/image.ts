import { GroupField } from "payload/types";
import { mediaUrlFieldPlaceholder } from "../common/constants";

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
      required: true,
      localized: true,
      admin: {
        description: {
          en: "A brief description of the image for screen readers and search engines. It is not displayed on the page but is important for accessibility.",
          es: "Una breve descripción de la imagen para lectores de pantalla y motores de búsqueda. No se muestra en la página, pero es importante para la accesibilidad.",
        },
      },
    },
  ],
};
