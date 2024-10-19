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
      name: "fragment",
      label: {
        en: "Fragment",
        es: "Fragmento",
      },
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData.type === "internal",
      },
    },
    {
      name: "search",
      label: {
        en: "Search",
        es: "Búsqueda",
      },
      type: "text",
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
