import { GroupField, RelationshipField } from "payload/types";
import { validateUrl } from "../common/validation";

export const linkField: GroupField = {
  name: "link",
  label: {
    en: "Link",
    es: "Enlace",
  },
  type: "group",
  fields: [
    {
      name: "label",
      label: {
        en: "Label",
        es: "Etiqueta",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "type",
      label: {
        en: "Type",
        es: "Tipo",
      },
      type: "radio",
      required: true,
      options: [
        {
          label: {
            en: "Internal",
            es: "Interno",
          },
          value: "internal",
        },
        {
          label: {
            en: "External",
            es: "Externo",
          },
          value: "external",
        },
      ],
      admin: {
        description: {
          en: "Use 'internal' to link to a page within the site. 'External' allows you to enter a URL.",
          es: "Usa 'interno' para enlazar a una página dentro del sitio. 'Externo' te permite introducir una URL.",
        },
      },
    },
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
        condition: (_, siblingData) => siblingData.type === "internal",
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
      admin: {
        condition: (_, siblingData) => siblingData.type === "internal",
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
      validate: validateUrl,
      admin: {
        condition: (_, siblingData) => siblingData.type === "external",
      },
    },
  ],
};
