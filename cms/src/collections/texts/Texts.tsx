import { CollectionConfig } from "payload";
import { cachePurgeHook } from "../../hooks/cache-purge-hook";
import { translateEndpoint } from "./translateEndpoint";
import { fullTextToTitle, richTextToFullText } from "./utils";

export const Texts: CollectionConfig = {
  slug: "texts",
  labels: {
    singular: {
      en: "Text",
      es: "Texto",
    },
    plural: {
      en: "Texts",
      es: "Textos",
    },
  },
  defaultSort: "title",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "comment"],
    listSearchableFields: ["title"],
  },
  hooks: {
    afterChange: [({ req }) => cachePurgeHook({ type: "all-pages" }, req)],
  },
  endpoints: [translateEndpoint],
  fields: [
    {
      name: "type",
      type: "radio",
      label: {
        en: "Type",
        es: "Tipo",
      },
      options: [
        {
          label: { en: "Plain Text", es: "Texto simple" },
          value: "plainText",
        },
        {
          label: { en: "Rich Text", es: "Texto enriquecido" },
          value: "richText",
        },
      ],
      defaultValue: "plainText",
      access: {
        update: () => false,
      },
      required: true,
      admin: {
        description: {
          en: "This cannot be changed after creation.",
          es: "Esto no se puede cambiar después de la creación.",
        },
        layout: "horizontal",
      },
    },
    {
      name: "text",
      type: "textarea",
      label: {
        en: "Text",
        es: "Texto",
      },
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === "plainText",
      },
    },
    // TODO migrate slate to lexical
    // {
    //   name: "richText",
    //   type: "richText",
    //   label: {
    //     en: "Rich Text",
    //     es: "Texto enriquecido",
    //   },
    //   localized: true,
    //   editor: slateEditor({
    //     admin: {
    //       elements: ["h4", "h5", "link", "ul", "ol", "indent"],
    //       leaves: ["bold", "italic", "underline", "strikethrough", "code"],
    //     },
    //   }),
    //   admin: {
    //     condition: (_, siblingData) => siblingData.type === "richText",
    //   },
    // },
    {
      name: "comment",
      type: "text",
      label: {
        en: "Comment",
        es: "Comentario",
      },
      admin: {
        position: "sidebar",
        description: {
          en: "Add a comment to help other editors understand the purpose of this text. Keep in mind that texts might need different translations depending on the context.",
          es: "Añade un comentario para ayudar a otros editores a entender el propósito de este texto. Ten en cuenta que los textos pueden necesitar diferentes traducciones dependiendo del contexto.",
        },
      },
    },
    {
      name: "title",
      label: {
        en: "Title (internal)",
        es: "Título (interno)",
      },
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
      localized: true,
      hooks: {
        beforeChange: [
          ({ data }) => {
            return fullTextToTitle(getFullText());

            function getFullText() {
              if (!data) throw new Error("Data is missing.");
              switch (data.type) {
                case "plainText":
                  return data.text ?? "";
                case "richText":
                  return richTextToFullText(data.richText ?? []);
              }
            }
          },
        ],
      },
      admin: {
        description: {
          en: "This field is generated automatically and is only used internally in the CMS to identity the text.",
          es: "Este campo se genera automáticamente y solo se usa internamente en el CMS para identificar el texto.",
        },
        position: "sidebar",
      },
    },
    {
      type: "ui",
      name: "translations",
      admin: {
        components: {
          Field: "src/collections/texts/TranslateField#TranslateField",
        },
      },
    },
  ],
};