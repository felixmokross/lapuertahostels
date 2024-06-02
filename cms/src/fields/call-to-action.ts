import { GroupField, RadioField } from "payload/types";
import { showField } from "./show";

export type CallToActionFieldOptions = {
  optional?: boolean;
  showByDefault?: boolean;
  variant?: { default: "primary" | "secondary" } | false;
};

export function makeCallToActionField({
  optional = false,
  showByDefault = true,
  variant = { default: "secondary" },
}: CallToActionFieldOptions = {}): GroupField {
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
        name: "text",
        label: {
          en: "Text",
          es: "Texto",
        },
        type: "text",
        localized: true,
        required: true,
        admin: { condition },
      },
      {
        name: "url",
        label: {
          en: "URL",
          es: "URL",
        },
        type: "text",
        required: true,
        admin: { condition },
      },
      ...(variant
        ? [
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
          ]
        : []),
    ],
  };
}
