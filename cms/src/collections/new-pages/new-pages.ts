import { CollectionConfig, TextField, ValidateOptions } from "payload";
import { refreshCacheHook } from "../../hooks/refresh-cache-hook";
import { heroField } from "../../fields/hero";
import { layoutField } from "../../fields/layout";
import { canManageContent, isAdmin } from "../../common/access-control";
import { Link, NewPage } from "@/payload-types";
import { TFunction } from "@payloadcms/translations";
import { TranslationsKey } from "@/translations";
import { getPageCacheKey } from "@/common/frontend-cache";
import { descriptionField } from "@/fields/description";
import { pageUsagesField } from "./usages";

export const NewPages: CollectionConfig = {
  slug: "new-pages",
  labels: {
    singular: {
      en: "Page",
      es: "Página",
    },
    plural: {
      en: "Pages",
      es: "Páginas",
    },
  },
  defaultSort: "pathname",
  defaultPopulate: {
    pathname: true,
    brand: true,
  },
  admin: {
    useAsTitle: "pathname",
    defaultColumns: ["pathname", "title", "brand", "updatedAt"],
    listSearchableFields: ["id", "pathname", "title.text", "brand.name"],
  },
  access: {
    create: canManageContent,
    update: canManageContent,
    delete: ({ req }) => isAdmin(req),
  },
  hooks: {
    afterChange: [
      ({ doc, req }) =>
        refreshCacheHook({
          cacheKey: getPageCacheKey(doc),
          pageUrl: doc.pathname,
        })({ req }),
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Hero",
            es: "Héroe",
          },
          fields: [heroField],
        },
        {
          label: {
            en: "Layout",
            es: "Diseño",
          },
          fields: [layoutField],
        },
        {
          label: {
            en: "SEO",
            es: "SEO",
          },
          name: "seo",
          fields: [
            descriptionField({
              en: "The SEO fields are used to improve the page's visibility in search engine results and social media. The data should be unique and relevant to the page.",
              es: "Los campos SEO se utilizan para mejorar la visibilidad de la página en los resultados de los motores de búsqueda y en las redes sociales. Los datos deben ser únicos y relevantes para la página.",
            }),
            {
              name: "description",
              label: {
                en: "Description",
                es: "Descripción",
              },
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "plainText" },
              },
              admin: {
                description: {
                  en: "The description is shown in search engine results. It should be between 100 and 150 characters.",
                  es: "La descripción se muestra en los resultados de los motores de búsqueda. Debe tener entre 100 y 150 caracteres.",
                },
              },
            },
            {
              name: "image",
              label: {
                en: "Image",
                es: "Imagen",
              },
              type: "upload",
              relationTo: "media",
              filterOptions: {
                mimeType: { contains: "image/" },
              },
              admin: {
                description: {
                  en: "The image is shown in search engine results and when the page is shared on social media. It will be automatically sized to 1200x630 pixels.",
                  es: "La imagen se muestra en los resultados de los motores de búsqueda y cuando se comparte la página en las redes sociales. Se redimensionará automáticamente a 1200x630 píxeles.",
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
          fields: [pageUsagesField()],
        },
      ],
    },

    {
      name: "brand",
      label: {
        en: "Brand",
        es: "Marca",
      },
      type: "relationship",
      relationTo: "brands",
      required: true,
      access: {
        update: () => false,
      },
      admin: {
        position: "sidebar",
        description: {
          en: "Choose the brand to which the page belongs. The brand determines the theme of the page.",
          es: "Elige la marca a la que pertenece la página. La marca determina el tema de la página.",
        },
      },
    },
    {
      name: "pathname",
      label: {
        en: "Pathname",
        es: "Ruta",
      },
      type: "text",
      index: true,
      required: true,
      access: {
        update: () => false,
      },
      validate: async (
        value: string | undefined | null,
        {
          req,
          siblingData,
        }: ValidateOptions<NewPage, NewPage, TextField, string>,
      ) => {
        const t = req.t as unknown as TFunction<TranslationsKey>;

        if (!siblingData.brand) {
          return t("custom:pages:pathname:pleaseSelectABrandFirst");
        }

        if (!value) return t("custom:pages:pathname:pleaseEnterAPathname");

        const brand = await req.payload.findByID({
          collection: "brands",
          id: siblingData.brand as string,
          depth: 2,
          select: {
            homeLink: true,
          },
        });

        const brandHomeLinkPathname = (
          (brand.homeLink as Link).newPage as NewPage
        ).pathname;
        const safePrefix = brandHomeLinkPathname.endsWith("/")
          ? brandHomeLinkPathname
          : brandHomeLinkPathname + "/";
        if (value !== brandHomeLinkPathname && !value.startsWith(safePrefix)) {
          return t("custom:pages:pathname:pathnameMustStartWithPrefix", {
            prefix: brandHomeLinkPathname,
          });
        }

        return true;
      },
      admin: {
        position: "sidebar",
        placeholder: "e.g. /experiences/lost-city",
        description: {
          en: "The pathname is used to navigate to this page. It must be unique and cannot be changed after the page has been created. The first path segment must be the brand's home link.",
          es: "La ruta se utiliza para navegar a esta página. Debe ser única y no se puede cambiar después de que se haya creado la página. El primer segmento de la ruta debe ser el enlace de inicio de la marca.",
        },
      },
    },
    {
      name: "title",
      label: {
        en: "Title",
        es: "Título",
      },
      type: "relationship",
      relationTo: "texts",
      filterOptions: {
        type: { equals: "plainText" },
      },
      admin: {
        position: "sidebar",
        description: {
          en: "The title is shown in the title bar of the browser and in search engine results.",
          es: "El título se muestra en la barra de título del navegador y en los resultados de los motores de búsqueda.",
        },
      },
    },
  ],
};