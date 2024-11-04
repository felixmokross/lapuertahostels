import { CollectionConfig } from "payload/types";
import { cachePurgeHook } from "../hooks/cache-purge-hook";
import { Node } from "slate";
import { slateEditor } from "@payloadcms/richtext-slate";
import { getSupportedLocales } from "../common/locales";

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
    afterChange: [
      async ({ doc, req }) => {
        console.log(doc.id);
        console.log(typeof doc.id);
        const translationLocales = (await getSupportedLocales()).filter(
          (l) => l !== req.locale,
        );

        for (const translationLocale of translationLocales) {
        }
      },
      ({ req }) => cachePurgeHook({ type: "all-pages" }, req),
    ],
  },
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
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === "plainText",
      },
    },
    {
      name: "richText",
      type: "richText",
      label: {
        en: "Rich Text",
        es: "Texto enriquecido",
      },
      localized: true,
      required: true,
      editor: slateEditor({
        admin: {
          elements: ["h4", "h5", "link", "ul", "ol", "indent"],
          leaves: ["bold", "italic", "underline", "strikethrough", "code"],
        },
      }),
      admin: {
        condition: (_, siblingData) => siblingData.type === "richText",
      },
    },
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
            const fullText = getFullText();

            return fullText.length > 80
              ? `${fullText.slice(0, 79).trim()}…`
              : fullText;

            function getFullText() {
              switch (data.type) {
                case "plainText":
                  return data.text;
                case "richText":
                  return data.richText.map((n) => Node.string(n)).join(" ");
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
  ],
};
