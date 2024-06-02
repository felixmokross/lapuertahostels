import { Block } from "payload/types";
import React from "react";
import { FieldDescription, useFieldType } from "payload/components/forms";

export const SeparatorBlock: Block = {
  slug: "Separator",
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
    {
      type: "ui",
      name: "description",
      label: { en: "Description", es: "Descripción" },
      admin: {
        components: {
          Field: ({ custom }) => (
            <FieldDescription description={custom.description} />
          ),
        },
      },
      custom: {
        description: {
          en: "Use this separator to create a visual break between two subsequent blocks.",
          es: "Utiliza este separador para crear una división visual entre dos bloques consecutivos.",
        },
      },
    },
  ],
};
