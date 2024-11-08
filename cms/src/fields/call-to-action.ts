import { GroupField, RadioField } from "payload/types";
import { showField } from "./show";
import { Links } from "../collections/Links";
import { Texts } from "../collections/Texts";

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
        name: "label",
        label: {
          en: "Label",
          es: "Etiqueta",
        },
        type: "relationship",
        filterOptions: {
          type: { equals: "plainText" },
        },
        relationTo: Texts.slug,
        required: true,
        admin: { condition },
      },
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
