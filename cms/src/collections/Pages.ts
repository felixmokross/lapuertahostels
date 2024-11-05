import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";
import { text } from "payload/dist/fields/validations";
import { canManageContent } from "../common/access-control";
import { Brands } from "./Brands";
import { Texts } from "./Texts";

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
  defaultSort: "id",
  admin: {
    useAsTitle: "url",
    defaultColumns: ["url", "title", "brand", "updatedAt"],
    disableDuplicate: true,
    listSearchableFields: ["url"],
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
          { type: "target", dataUrl: `pages/${doc.id}`, pageUrl: doc.url },
          req,
        ),
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
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "url",
      label: {
        en: "URL",
        es: "URL",
      },
      type: "text",
      required: true,
      validate: (_, args) =>
        text(args.data._id ? idToUrl(args.data._id) : "", args),
      access: {
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            data._id = data.url ? urlToId(data.url as string) : "";

            // ensures data is not stored in DB
            delete data["url"];
          },
        ],
        afterRead: [
          ({ data }) => {
            return idToUrl(data.id as string);
          },
        ],
      },
      admin: {
        position: "sidebar",
        description: {
          en: "The URL used to navigate to this page. It must be unique and cannot be changed after the page has been created.",
          es: "La URL utilizada para navegar a esta página. Debe ser única y no se puede cambiar después de que se haya creado la página.",
        },
      },
    },
    {
      name: "brand",
      label: {
        en: "Brand",
        es: "Marca",
      },
      type: "relationship",
      relationTo: Brands.slug,
      access: {
        create: () => false,
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            // ensures data is not stored in DB
            delete data.brand;
          },
        ],
        afterRead: [
          ({ data }) => {
            return brandForId(data.id as string);
          },
        ],
      },
      admin: {
        position: "sidebar",
        description: {
          en: "The brand is automatically determined based on the page’s URL.",
          es: "La marca se determina automáticamente en función de la URL de la página.",
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
      relationTo: Texts.slug,
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

function idToUrl(id: string) {
  return id.replaceAll(":", "/");
}

function urlToId(url: string) {
  return url.replaceAll("/", ":");
}

function brandForId(id: string) {
  if (id === ":azul" || id.startsWith(":azul:")) {
    return "azul";
  }

  if (id === ":aqua" || id.startsWith(":aqua:")) {
    return "aqua";
  }

  return "puerta";
}
