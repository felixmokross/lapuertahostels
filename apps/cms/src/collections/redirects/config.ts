import { CollectionConfig } from "payload";

export const Redirects: CollectionConfig = {
  slug: "redirects",
  labels: {
    singular: {
      en: "Redirect",
      es: "Redirección",
    },
    plural: {
      en: "Redirects",
      es: "Redirecciones",
    },
  },
  admin: {
    useAsTitle: "fromPathname",
    defaultColumns: ["fromPathname", "locales", "to"],
    listSearchableFields: ["id", "fromPathname", "to.page.pathname"],
  },
  fields: [
    {
      name: "fromPathname",
      label: {
        en: "From Pathname",
        es: "Desde la ruta",
      },
      type: "text",
      required: true,
      unique: true,
      index: true,
      access: { update: () => false },
    },
    {
      name: "to",
      label: {
        en: "Redirect To",
        es: "Redirigir a",
      },
      type: "group",
      fields: [
        {
          name: "page",
          label: {
            en: "Page",
            es: "Página",
          },
          type: "relationship",
          relationTo: "pages",
          required: true,
          admin: {
            appearance: "drawer",
          },
        },
        {
          type: "row",
          fields: [
            {
              name: "queryString",
              label: {
                en: "Query String",
                es: "Cadena de consulta",
              },
              type: "text",
              admin: {
                width: "50%",
                description: {
                  en: "If a query string is provided, it will be appended to the URL with a '?' character.",
                  es: "Si se proporciona una cadena de consulta, se añadirá a la URL con un carácter '?'.",
                },
              },
            },
            {
              name: "fragment",
              label: {
                en: "Fragment",
                es: "Fragmento",
              },
              type: "text",
              admin: {
                width: "50%",
                description: {
                  en: "If a fragment is provided, it will be appended to the URL with a '#' character. Use this to link to a section of a page, defined by an 'Element ID'.",
                  es: "Si se proporciona un fragmento, se añadirá a la URL con un carácter '#'. Úsalo para enlazar a una sección de una página, definida por un 'ID de elemento'.",
                },
              },
            },
          ],
        },
      ],
      admin: {
        components: {
          Cell: "/src/collections/redirects/to-cell#ToCell",
        },
      },
    },
  ],
};
