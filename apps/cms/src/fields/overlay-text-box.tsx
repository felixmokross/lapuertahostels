import { GroupField, TextField } from "payload";
import { makeCallToActionField } from "./call-to-action";
import { showField } from "./show";
import { headingField } from "./heading";
import { richTextField } from "./rich-text";
import { textField } from "./text";

const callToActionField = makeCallToActionField({
  optional: true,
  showByDefault: false,
});

type OverlayTextBoxFieldOptions = {
  optional?: boolean;
  callToActionLabelOnly?: boolean;
};

export function overlayTextBoxField({
  optional = true,
  callToActionLabelOnly = false,
}: OverlayTextBoxFieldOptions = {}): GroupField {
  const condition = optional
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_: any, siblingData: any) => siblingData.show
    : undefined;
  return {
    name: "overlayTextBox",
    label: {
      en: "Overlay Text Box",
      es: "Caja de texto superpuesta",
    },
    type: "group",
    fields: [
      ...(optional ? [showField] : []),
      {
        ...headingField,
        admin: {
          ...headingField.admin,
          condition,
        },
      } as TextField,
      richTextField({ admin: { condition } }),
      callToActionLabelOnly
        ? textField({
            name: "callToActionLabel",
            label: {
              en: "Call to Action Label",
              es: "Etiqueta del Call to Action",
            },
            required: false,
            admin: {
              description: {
                en: "Leave blank to hide the call to action.",
                es: "Deja en blanco para ocultar el call to action.",
              },
            },
          })
        : {
            ...callToActionField,
            admin: {
              ...callToActionField.admin,
              condition,
            },
          },
      {
        name: "position",
        label: {
          en: "Position",
          es: "Posición",
        },
        type: "radio",
        options: [
          {
            label: { en: "Top Left", es: "Arriba a la izquierda" },
            value: "top-left",
          },
          {
            label: { en: "Top Right", es: "Arriba a la derecha" },
            value: "top-right",
          },
          {
            label: { en: "Bottom Left", es: "Abajo a la izquierda" },
            value: "bottom-left",
          },
          {
            label: { en: "Bottom Right", es: "Abajo a la derecha" },
            value: "bottom-right",
          },
        ],
        admin: {
          condition,
        },
      },
    ],
  };
}
