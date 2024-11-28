import { CollectionConfig } from "payload";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { heroField } from "../fields/hero";
import { layoutField } from "../fields/layout";
import { canManageContent } from "../common/access-control";

// TODO remove this once all envs have migrated to NewPages
export const Pages: CollectionConfig = {
  slug: "pages",
  defaultSort: "id",
  admin: {
    hidden: true,
    useAsTitle: "url",
    defaultColumns: ["url", "title", "brand", "updatedAt"],
    listSearchableFields: ["url"],
  },
  access: {
    create: ({ req: { user } }) => user?.role === "admin",
    update: canManageContent,
    delete: ({ req: { user } }) => user?.role === "admin",
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
      access: {
        update: () => false,
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
      relationTo: "brands",
      access: {
        create: () => false,
        update: () => false,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (!data) throw new Error("No data provided");
            // ensures data is not stored in DB
            delete data.brand;
          },
        ],
        afterRead: [
          ({ data }) => {
            if (!data) throw new Error("No data provided");
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

function brandForId(id: string) {
  if (id === ":azul" || id.startsWith(":azul:")) {
    return "azul";
  }

  if (id === ":aqua" || id.startsWith(":aqua:")) {
    return "aqua";
  }

  return "puerta";
}
