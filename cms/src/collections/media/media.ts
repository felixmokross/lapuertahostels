import { CollectionConfig } from "payload";
import { generateAltTextEndpoint } from "./generate-alt-text-endpoint";
import { mediaUsagesField } from "./usages";
import { refreshCacheHook } from "./refresh-cache-hook";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: {
      en: "Media",
      es: "Medio",
    },
    plural: {
      en: "Media",
      es: "Medios",
    },
  },
  defaultSort: "filename",
  defaultPopulate: {
    filename: true,
    mimeType: true,
    width: true,
    height: true,
    alt: true,
  },
  admin: {
    defaultColumns: ["filename", "category", "comment", "updatedAt"],
    listSearchableFields: ["id", "filename", "comment", "alt"],
  },
  endpoints: [generateAltTextEndpoint],
  hooks: {
    afterChange: [refreshCacheHook()],
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
      },
    ],
    displayPreview: true,
    crop: false,
    focalPoint: false,
  },
  fields: [
    {
      name: "category",
      label: {
        en: "Category",
        es: "Categoría",
      },
      type: "relationship",
      relationTo: "mediaCategory",
      admin: {
        description: {
          en: "Add a media category to easily find this media. When you select the media, you can filter by this category.",
          es: "Agrega una categoría de medios para encontrar fácilmente este medio. Al seleccionar el medio, puedes filtrar por esta categoría.",
        },
        position: "sidebar",
      },
    },

    {
      name: "comment",
      label: {
        en: "Comment (internal)",
        es: "Comentario (interno)",
      },
      type: "text",
      admin: {
        description: {
          en: "Add an internal comment to note any important information about this media, e.g. the source.",
          es: "Agrega un comentario interno para anotar cualquier información importante sobre este medio, por ejemplo, la fuente.",
        },
        position: "sidebar",
      },
    },

    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Alternative Text",
            es: "Texto alternativo",
          },
          fields: [
            {
              name: "alt",
              label: {
                en: "Alternative Text",
                es: "Texto alternativo",
              },
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "plainText" },
              },
              admin: {
                description: {
                  en: "A brief description of the media for screen readers and search engines. It is not displayed on the page but is important for accessibility. For images an alt text can be generated automatically using OpenAI.",
                  es: "Una breve descripción del medio para lectores de pantalla y motores de búsqueda. No se muestra en la página pero es importante para la accesibilidad. Para las imágenes se puede generar un texto alternativo automáticamente utilizando OpenAI.",
                },
                components: {
                  afterInput: [
                    "/src/collections/media/generate-alt-text-button#GenerateAltTextButton",
                  ],
                },
              },
            },
          ],
        },
        {
          label: {
            en: "Usages",
            es: "Usos",
          },
          fields: [mediaUsagesField()],
        },
      ],
    },
  ],
};
