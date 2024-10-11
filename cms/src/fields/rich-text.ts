import { slateEditor } from "@payloadcms/richtext-slate";
import { RichTextField } from "payload/types";

export type RichTextFieldOptions = {
  supportsParagraphs?: boolean;
  optional?: boolean;
};

export function makeRichTextField({
  supportsParagraphs = false,
  optional = false,
}: RichTextFieldOptions = {}): RichTextField {
  return {
    name: "text",
    label: {
      en: "Text",
      es: "Texto",
    },
    type: "richText",
    required: !optional,
    localized: true,
    editor: slateEditor({
      admin: {
        elements: supportsParagraphs ? ["h4", "h5", "link", "ul"] : [],
        leaves: ["bold"],
      },
    }),
    admin: {
      description: supportsParagraphs
        ? {
            en: "Mark parts of the text as bold to make it stand out. Use two line breaks to create a new paragraph. You can also use headings to structure the text.",
            es: "Marca partes del texto como negrita para que destaque. Usa dos saltos de línea para crear un nuevo párrafo. También puedes usar títulos para estructurar el texto.",
          }
        : {
            en: "Mark parts of the text as bold to make it stand out.",
            es: "Marca partes del texto como negrita para que destaque.",
          },
    },
  };
}
