import {
  CollectionConfig,
  TextField,
  TextFieldSingleValidation,
  ValidateOptions,
} from "payload";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";
import { canManageContent } from "../common/access-control";
import { Link, NewPage } from "@/payload-types";
import { TFunction } from "@payloadcms/translations";
import { TranslationsKeys } from "@/translations";

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
  admin: {
    useAsTitle: "pathname",
    defaultColumns: ["pathname", "title", "brand", "updatedAt"],
    listSearchableFields: ["pathname", "title.text", "brand.name"],
  },
  access: {
    create: ({ req: { user } }) => user?.role === "admin",
    update: canManageContent,
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  hooks: {
    afterChange: [
      ({ doc, req }) =>
        cachePurgeHook(
          { type: "target", dataUrl: `pages/${doc.id}`, pageUrl: doc.pathname },
          req,
        ),
    ],
  },
  fields: [
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
        const t = req.t as unknown as TFunction<TranslationsKeys>;

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

        const prefix =
          ((brand.homeLink as Link).newPage as NewPage).pathname + "/";
        if (!value.startsWith(prefix)) {
          return t("custom:pages:pathname:pathnameMustStartWithPrefix", {
            prefix,
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
    heroField,
    layoutField,
  ],
};
