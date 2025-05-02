import {
  CollectionConfig,
  Locale,
  Payload,
  SanitizedCollectionConfig,
  TextField,
  ValidateOptions,
} from "payload";
import { heroField } from "../../fields/hero";
import { contentField as contentField } from "../../fields/content";
import { canManageContent, isAdmin } from "../../common/access-control";
import { Page } from "@/payload-types";
import { TFunction } from "@payloadcms/translations";
import { TranslationsKey } from "@/translations";
import { descriptionField } from "@/fields/description";
import { pageUsagesField } from "./usages";
import { getLivePreviewUrl } from "@/common/live-preview";
import { textareaField } from "@/fields/textarea";
import { textField } from "@/fields/text";
import { text } from "payload/shared";
import {
  getLocalizedPathnameEndpoint,
  getPagesForPathname,
} from "./localized-pathname";
import { contentGroup } from "@/groups";

export const Pages: CollectionConfig = {
  slug: "pages",
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
  endpoints: [getLocalizedPathnameEndpoint],
  admin: {
    group: contentGroup,
    useAsTitle: "pathname",
    defaultColumns: ["pathname", "title", "brand", "updatedAt"],
    listSearchableFields: ["id", "pathname", "title", "brand.name"],
    livePreview: {
      url: ({
        data,
        locale,
      }: {
        collectionConfig?: SanitizedCollectionConfig;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: Record<string, any>;
        locale: Locale;
        payload: Payload;
      }) =>
        getLivePreviewUrl(
          (data as Page).pathname,
          `pages/${data.id}`,
          locale.code,
        ),
    },
  },
  access: {
    create: canManageContent,
    update: canManageContent,
    delete: ({ req }) => isAdmin(req),
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
          fields: [heroField()],
        },
        {
          label: {
            en: "Content",
            es: "Contenido",
          },
          fields: [contentField],
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
            textareaField({
              name: "description",
              label: {
                en: "Description",
                es: "Descripción",
              },
              required: false,
              admin: {
                description: {
                  en: "The description is shown in search engine results. It should be between 100 and 150 characters.",
                  es: "La descripción se muestra en los resultados de los motores de búsqueda. Debe tener entre 100 y 150 caracteres.",
                },
              },
            }),
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
      localized: true,
      unique: true,
      hooks: {
        afterChange: [
          async ({ previousDoc, req, operation, siblingData }) => {
            if (operation !== "update") return;
            if (!siblingData["pathname_createRedirect"]) return;

            const redirects = await req.payload.find({
              collection: "redirects",
              where: {
                fromPathname: { equals: previousDoc.pathname },
              },
              pagination: false,
            });

            if (redirects.totalDocs > 0) {
              // Redirect already exists, so we don't need to create it again.
              console.log(
                `Redirect already exists for ${previousDoc.pathname}`,
              );
              return;
            }

            console.log(`Creating redirect for ${previousDoc.pathname}`);
            await req.payload.create({
              collection: "redirects",
              data: {
                fromPathname: previousDoc.pathname,
                to: { page: previousDoc.id },
              },
            });
          },
        ],
      },
      validate: async (
        value: string | undefined | null,
        options: ValidateOptions<Page, Page, TextField, string>,
      ) => {
        const defaultValidationResult = text(value, options);
        if (defaultValidationResult !== true) return defaultValidationResult;

        const { req, siblingData, id } = options;
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

        if (brand.homeLink?.doc) {
          // Brand does not have a home link, so we can't validate the pathname.
          // We can't make the brand home link required, because we need to create a brand when there is no page yet.

          const brandHomeLinkPathname = (brand.homeLink.doc as Page).pathname;
          const safePrefix = brandHomeLinkPathname.endsWith("/")
            ? brandHomeLinkPathname
            : brandHomeLinkPathname + "/";
          if (
            value !== brandHomeLinkPathname &&
            !value.startsWith(safePrefix)
          ) {
            return t("custom:pages:pathname:pathnameMustStartWithPrefix", {
              prefix: brandHomeLinkPathname,
            });
          }
        }

        // Unique constraint only checks within the locale, but our pathnames must be unique across locales
        const pages = await getPagesForPathname(req, value);
        const alreadyExists = pages.some((p) => p.id !== id);
        if (alreadyExists) {
          return t("custom:pages:pathname:alreadyExists");
        }

        return true;
      },
      admin: {
        position: "sidebar",
        placeholder: "e.g. /experiences/lost-city",
        description: {
          en: "The pathname is used to navigate to this page. It must be unique. The first path segment must be the brand's home link.",
          es: "La ruta se utiliza para navegar a esta página. Debe ser única. El primer segmento de la ruta debe ser el enlace de inicio de la marca.",
        },
        components: {
          Field: "/src/collections/pages/pathname-field#PathnameField",
        },
      },
    },
    {
      name: "pathname_locked",
      type: "checkbox",
      defaultValue: true,
      virtual: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "pathname_createRedirect",
      type: "checkbox",
      defaultValue: true,
      virtual: true,
      admin: {
        hidden: true,
      },
    },
    textField({
      name: "title",
      label: { en: "Title", es: "Título" },
      required: false,
      admin: {
        position: "sidebar",
        description: {
          en: "The title is shown in the title bar of the browser and in search engine results. Include important keywords for SEO. The brand’s base title is appended to the title.",
          es: "El título se muestra en la barra de título del navegador y en los resultados de los motores de búsqueda. Incluye palabras clave importantes para el SEO. El título base de la marca se añade al título.",
        },
      },
    }),
  ],
};
