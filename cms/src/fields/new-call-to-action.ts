import { GroupField, RadioField } from "payload/types";
import { showField } from "./show";
import { linkField } from "./link";

export type NewCallToActionFieldOptions = {
  optional?: boolean;
  showByDefault?: boolean;
  variant?: { default: "primary" | "secondary" } | false;
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
      { ...linkField, admin: { ...linkField.admin, condition } },
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
