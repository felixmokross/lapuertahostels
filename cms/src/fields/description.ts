import { UIField } from "payload";

export function descriptionField(description: Record<string, string>): UIField {
  return {
    type: "ui",
    name: "adminDescription",
    label: { en: "Description", es: "Descripción" },
    admin: {
      components: {
        Field: {
          path: "/src/components/DescriptionField",
          exportName: "DescriptionField",
          serverProps: {
            description,
          },
        },
      },
    },
  };
}
