import {
  CollectionConfig,
  Locale,
  Payload,
  SanitizedCollectionConfig,
} from "payload";
import { refreshCacheHook } from "../../hooks/refresh-cache-hook";
import { canManageContent } from "../../common/access-control";
import { imageField } from "../../fields/image";
import { getLivePreviewUrl } from "@/common/live-preview";
import { NewPage } from "@/payload-types";
import { RowLabelProps } from "@/components/RowLabel";
import { getFullCollectionCacheKey } from "@/common/frontend-cache";
import { showField } from "@/fields/show";
import { brandUsagesField } from "./usages";

export const Brands: CollectionConfig = {
  slug: "brands",
  labels: {
    singular: {
      en: "Brand",
      es: "Marca",
    },
    plural: {
      en: "Brands",
      es: "Marcas",
    },
  },
  defaultSort: "name",
  defaultPopulate: {
    id: true,
    name: true,
    homeLink: true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "logo", "homeLink", "updatedAt"],
    listSearchableFields: ["id", "name"],
    livePreview: {
      url: async ({
        data,
        locale,
        payload,
      }: {
        collectionConfig?: SanitizedCollectionConfig;
        data: Record<string, any>;
        locale: Locale;
        payload: Payload;
      }) => {
        const homeLink = await payload.findByID({
          collection: "links",
          id: data.homeLink,
          populate: {
            links: {
              newPage: true,
            },
          },
        });

        if (!(homeLink.newPage as NewPage | null)?.pathname)
          throw new Error("Brand home page not found");
        return getLivePreviewUrl(
          (homeLink.newPage as NewPage).pathname,
          `brands/${data.id}`,
          locale.code,
        );
      },
    },
  },
  access: {
    create: () => false,
    update: canManageContent,
    delete: () => false,
  },
  hooks: {
    afterChange: [
      refreshCacheHook({
        cacheKey: getFullCollectionCacheKey("brands"),
        pageUrl: "/",
      }),
    ],
  },
  fields: [
    {
      name: "id",
      label: {
        en: "ID",
        es: "ID",
      },
      type: "text",
      required: true,
      access: {
        update: () => false,
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "name",
      label: {
        en: "Name",
        es: "Nombre",
      },
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "homeLink",
      label: {
        en: "Home Link",
        es: "Enlace de inicio",
      },
      type: "relationship",
      relationTo: "links",
      filterOptions: {
        type: { equals: "internal" },
      },
      access: {
        create: () => false,
        update: () => false,
      },
      required: true,
      admin: {
        position: "sidebar",
      },
    },

    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Logo",
            es: "Logo",
          },
          fields: [
            {
              ...imageField,
              name: "logo",
              label: {
                en: "Logo",
                es: "Logo",
              },
            },
          ],
        },
        {
          label: {
            en: "Header",
            es: "Encabezado",
          },
          fields: [
            {
              name: "banner",
              label: {
                en: "Banner",
                es: "Banner",
              },
              type: "relationship",
              relationTo: "banners",
              admin: {
                description: {
                  en: "A banner is useful to announce promotions or important news and can have a call to action. It will be shown on all pages of the brand.",
                  es: "Un banner es útil para anunciar promociones o noticias importantes y puede tener un call to action. Se mostrará en todas las páginas de la marca.",
                },
              },
            },
            {
              name: "navLinks",
              label: {
                en: "Navigation Links",
                es: "Enlaces de navegación",
              },
              labels: {
                singular: {
                  en: "Navigation Link",
                  es: "Enlace de navegación",
                },
                plural: {
                  en: "Navigation Links",
                  es: "Enlaces de navegación",
                },
              },
              type: "array",
              fields: [
                {
                  name: "label",
                  label: {
                    en: "Label",
                    es: "Etiqueta",
                  },
                  type: "relationship",
                  relationTo: "texts",
                  filterOptions: {
                    type: { equals: "plainText" },
                  },
                  required: true,
                },
                {
                  name: "link",
                  label: {
                    en: "Link",
                    es: "Enlace",
                  },
                  type: "relationship",
                  relationTo: "links",
                  required: true,
                },
              ],
              admin: {
                components: {
                  RowLabel: {
                    path: "/src/components/RowLabel",
                    exportName: "RowLabel",
                    clientProps: {
                      textProp: "label",
                      fallbackLabelKey: "custom:brands:navLinkRowLabel",
                    } as RowLabelProps,
                  },
                },
              },
            },
            {
              name: "bookCta",
              label: {
                en: "Book CTA",
                es: "CTA de reserva",
              },
              type: "group",
              fields: [
                showField,
                {
                  name: "label",
                  label: {
                    en: "Label",
                    es: "Etiqueta",
                  },
                  type: "relationship",
                  relationTo: "texts",
                  filterOptions: {
                    type: { equals: "plainText" },
                  },
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData?.show,
                  },
                },
                {
                  name: "link",
                  label: {
                    en: "Link",
                    es: "Enlace",
                  },
                  type: "relationship",
                  relationTo: "links",
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData?.show,
                  },
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Footer",
            es: "Pie de página",
          },
          name: "footer",
          fields: [
            {
              name: "linkGroups",
              label: {
                en: "Link Groups",
                es: "Grupos de enlaces",
              },
              labels: {
                singular: {
                  en: "Link Group",
                  es: "Grupo de enlaces",
                },
                plural: {
                  en: "Link Groups",
                  es: "Grupos de enlaces",
                },
              },
              type: "array",
              fields: [
                {
                  name: "title",
                  label: {
                    en: "Title",
                    es: "Título",
                  },
                  required: true,
                  type: "relationship",
                  relationTo: "texts",
                  filterOptions: {
                    type: { equals: "plainText" },
                  },
                },
                {
                  name: "links",
                  label: {
                    en: "Links",
                    es: "Enlaces",
                  },
                  labels: {
                    singular: {
                      en: "Link",
                      es: "Enlace",
                    },
                    plural: {
                      en: "Links",
                      es: "Enlaces",
                    },
                  },
                  type: "array",
                  fields: [
                    {
                      name: "label",
                      label: {
                        en: "Label",
                        es: "Etiqueta",
                      },
                      type: "relationship",
                      relationTo: "texts",
                      filterOptions: {
                        type: { equals: "plainText" },
                      },
                      required: true,
                    },
                    {
                      name: "link",
                      label: {
                        en: "Link",
                        es: "Enlace",
                      },
                      type: "relationship",
                      relationTo: "links",
                      required: true,
                    },
                  ],
                  admin: {
                    components: {
                      RowLabel: {
                        path: "/src/components/RowLabel",
                        exportName: "RowLabel",
                        clientProps: {
                          textProp: "label",
                          fallbackLabelKey: "custom:rowLabel:link",
                        } as RowLabelProps,
                      },
                    },
                  },
                },
              ],
              admin: {
                components: {
                  RowLabel: {
                    path: "/src/components/RowLabel",
                    exportName: "RowLabel",
                    clientProps: {
                      textProp: "title",
                      fallbackLabelKey: "custom:rowLabel:linkGroup",
                    } as RowLabelProps,
                  },
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
          fields: [brandUsagesField()],
        },
      ],
    },
  ],
};