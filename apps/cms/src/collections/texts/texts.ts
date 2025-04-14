import { CollectionConfig } from "payload";
import { translateEndpoint } from "./translate-endpoint";
import { fullTextToTitle, richTextToFullText, richTextToHtml } from "./utils";
import { editor } from "./editor";
import { transformRecordAsync } from "@/common/records";
import { textUsagesField } from "./usages";
import { refreshCacheHook } from "./refresh-cache-hook";

// TODO remove collection once all environments have been migrated
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
  defaultPopulate: {
    type: true,
    text: true,
    richText: true,
    title: true,
  },
  admin: {
    hidden: true,
    useAsTitle: "title",
    defaultColumns: ["title", "type", "comment"],
    listSearchableFields: ["id", "title", "comment"],
  },
  hooks: {
    afterChange: [refreshCacheHook()],
  },
  endpoints: [translateEndpoint],
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Edit",
            es: "Editar",
          },
          fields: [
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
            {
              name: "richText",
              type: "richText",
              label: {
                en: "Rich Text",
                es: "Texto enriquecido",
              },
              localized: true,
              editor: editor(),
              admin: {
                condition: (_, siblingData) => siblingData.type === "richText",
              },
            },
            {
              name: "richText_html",
              type: "textarea",
              virtual: true,
              localized: true,
              admin: {
                hidden: true,
                condition: (_, siblingData) => siblingData.type === "richText",
              },
              hooks: {
                afterRead: [
                  async ({ data, req }) => {
                    if (!data) return data;
                    if (data.type !== "richText") return null;

                    return req.locale === "all"
                      ? await transformRecordAsync(
                          data.richText,
                          richTextToHtml,
                        )
                      : await richTextToHtml(data.richText);
                  },
                ],
              },
            },
          ],
        },
        {
          label: {
            en: "Usages",
            es: "Usos",
          },
          fields: [textUsagesField()],
        },
      ],
    },

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
        position: "sidebar",
      },
    },
    {
      type: "ui",
      name: "translations",
      admin: {
        components: {
          Field:
            "src/collections/texts/translations-field.server#TranslationsFieldServer",
        },
        position: "sidebar",
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
          async ({ data }) => {
            return fullTextToTitle(await getFullText());

            async function getFullText() {
              if (!data) throw new Error("Data is missing.");
              switch (data.type) {
                case "plainText":
                  return data.text ?? "";
                case "richText":
                  return data.richText
                    ? await richTextToFullText(data.richText)
                    : "";
              }
            }
          },
        ],
      },
      admin: {
        description: {
          en: "This field is generated automatically and is only used internally in the CMS to identify the text.",
          es: "Este campo se genera automáticamente y solo se usa internamente en el CMS para identificar el texto.",
        },
        position: "sidebar",
      },
    },
  ],
};
