import { GroupField, RadioField } from "payload/types";
import { showField } from "./show";
import { linkField } from "./link";
import { Links } from "../collections/Links";

export type NewCallToActionFieldOptions = {
  optional?: boolean;
  showByDefault?: boolean;
  variant?: { default: "primary" | "secondary" };
};

export function makeNewCallToActionField({
  optional = false,
  showByDefault = true,
  variant = { default: "secondary" },
}: NewCallToActionFieldOptions = {}): GroupField {
  const condition = optional ? (_, siblingData) => siblingData.show : undefined;
  return {
    name: "cta",
    label: {
      en: "Call to Action (CTA)",
      es: "Call to Action (CTA)",
    },
    type: "group",
    fields: [
      ...(optional ? [{ ...showField, defaultValue: showByDefault }] : []),
      {
        name: "link",
        label: {
          en: "Link",
          es: "Enlace",
        },
        type: "relationship",
        relationTo: Links.slug,
        required: true,
        admin: { condition },
      },
      {
        name: "variant",
        type: "radio",
        label: {
          en: "Variant",
          es: "Variante",
        },
        options: [
          {
            label: {
              en: "Primary",
              es: "Primario",
            },
            value: "primary",
          },
          {
            label: {
              en: "Secondary",
              es: "Secundario",
            },
            value: "secondary",
          },
        ],
        defaultValue: variant.default,
        admin: { condition },
      } as RadioField,
    ],
  };
}
