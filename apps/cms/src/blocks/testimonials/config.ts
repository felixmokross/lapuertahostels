import { richTextField } from "@/fields/rich-text";
import { textField } from "@/fields/text";
import { textareaField } from "@/fields/textarea";
import { Block } from "payload";

export const testimonialsBlock: Block = {
  slug: "testimonials",
  interfaceName: "Testimonials",
  labels: {
    singular: {
      en: "Testimonials",
      es: "Testimonios",
    },
    plural: {
      en: "Testimonials",
      es: "Testimonios",
    },
  },
  fields: [
    textField({
      name: "heading",
      label: {
        en: "Heading",
        es: "Título",
      },
      required: false,
    }),
    richTextField({
      name: "supportingText",
      label: {
        en: "Supporting Text",
        es: "Texto de apoyo",
      },
      required: false,
    }),
    {
      name: "items",
      type: "array",
      label: {
        en: "Items",
        es: "Elementos",
      },
      fields: [
        textareaField(),
        textField({
          name: "author",
          label: {
            en: "Author",
            es: "Autor",
          },
        }),
      ],
    },
  ],
};
