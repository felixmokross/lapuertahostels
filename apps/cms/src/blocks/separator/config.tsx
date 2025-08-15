import { descriptionField } from "@fxmk/cms-plugin";
import { Block } from "payload";

export const SeparatorBlock: Block = {
  slug: "Separator",
  interfaceName: "Separator",
  labels: {
    singular: {
      en: "Separator",
      es: "Separador",
    },
    plural: {
      en: "Separators",
      es: "Separadores",
    },
  },
  imageURL: "/assets/blocks/Separator.png",
  imageAltText: "Preview of the Separator block, showing a horizontal line",
  fields: [
    descriptionField({
      en: "Use this separator to create a visual break between two subsequent blocks.",
      es: "Utiliza este separador para crear una división visual entre dos bloques consecutivos.",
    }),
  ],
};
