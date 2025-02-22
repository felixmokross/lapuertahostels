import { CollapsibleField, Field } from "payload";

export function makeMoreOptionsField(...fields: Field[]): CollapsibleField {
  return {
    type: "collapsible",
    label: {
      en: "More Options",
      es: "Más opciones",
    },
    fields,
    admin: {
      initCollapsed: true,
    },
  };
}
