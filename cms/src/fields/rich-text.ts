import { slateEditor } from "@payloadcms/richtext-slate";
import { RichTextField } from "payload/types";

export const richTextField: RichTextField = {
  name: "text",
  label: {
    en: "Text",
    es: "Texto",
  },
  type: "richText",
  required: true,
  localized: true,
  editor: slateEditor({
    admin: {
      elements: [],
      leaves: ["bold"],
    },
  }),
  admin: {
    description: {
      en: "Mark parts of the text as bold to make it stand out.",
      es: "Marca partes del texto como negrita para que destaque.",
    },
  },
};
