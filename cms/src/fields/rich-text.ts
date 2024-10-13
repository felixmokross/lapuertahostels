import { slateEditor } from "@payloadcms/richtext-slate";
import { RichTextField } from "payload/types";

export type RichTextFieldOptions = {
  mode?: "highlight-only" | "long-form";
  optional?: boolean;
};

export function makeRichTextField({
  mode = "highlight-only",
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
        elements:
          mode === "long-form"
            ? ["h4", "h5", "link", "ul", "ol", "indent"]
            : [],
        leaves:
          mode === "long-form"
            ? ["bold", "italic", "underline", "strikethrough"]
            : ["bold"],
      },
    }),
    admin: {
      description:
        mode === "highlight-only"
          ? {
              en: "Mark parts of the text as bold to make it stand out. Line breaks will not produce separate paragraphs.",
              es: "Marca partes del texto como negrita para que destaque. Los saltos de línea no crearán párrafos separados.",
            }
          : {
              en: "Line breaks will produce separate paragraphs. You can also use headings and lists to structure the text. Use links to reference internal or external content.",
              es: "Los saltos de línea crearán párrafos separados. También puedes usar títulos y listas para estructurar el texto. Usa enlaces para referenciar contenido interno o externo.",
            },
    },
  };
}
