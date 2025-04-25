import { validateUrl } from "@/common/validation";
import { GroupField, RowField } from "payload";

export function linkField(config: Partial<GroupField> = {}): GroupField {
  return {
    name: "link",
    type: "group",
    fields: [
      {
        name: "linkType",
        label: {
          en: "Link Type",
          es: "Tipo de enlace",
        },
        type: "radio",
        required: true,
        defaultValue: "internal",
        options: [
          {
            label: {
              en: "Custom URL",
              es: "URL Personalizado",
            },
            value: "custom",
          },
          {
            label: {
              en: "Internal Link",
              es: "Enlace interno",
            },
            value: "internal",
          },
        ],
        admin: {
          position: "sidebar",
          description: {
            en: "Choose between entering a custom text URL or linking to another document.",
            es: "Elige entre ingresar una URL personalizada o enlazar a otro documento.",
          },
        },
      },
      {
        name: "doc",
        label: {
          en: "Choose a document to link",
          es: "Elige un documento a enlazar",
        },
        type: "relationship",
        relationTo: "pages",
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData.linkType === "internal",
          appearance: "drawer",
        },
      },
      queryStringAndFragmentField(),
      {
        name: "url",
        label: {
          en: "URL",
          es: "URL",
        },
        type: "text",
        required: true,
        // TODO check if we should re-use the one from Lexical
        validate: validateUrl,
        admin: {
          condition: (_, siblingData) => siblingData.linkType === "custom",
        },
      },
    ],
    ...config,
  };
}

export function queryStringAndFragmentField(): RowField {
  return {
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
          condition: (_, siblingData) => siblingData.linkType === "internal",
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
          condition: (_, siblingData) => siblingData.linkType === "internal",
        },
      },
    ],
  };
}
