import { GroupField, RichTextField, TextField } from "payload";
import { makeCallToAction2Field } from "./call-to-action-2";
import { showField } from "./show";
import { heading2Field } from "./heading2";
import { makeRichText2Field } from "./rich-text-2";

const richTextField = makeRichText2Field();
const callToAction2Field = makeCallToAction2Field({
  optional: true,
  showByDefault: false,
});

type OverlayTextBox2FieldOptions = {
  optional?: boolean;
  callToActionLabelOnly?: boolean;
};

export function overlayTextBox2Field({
  optional = true,
  callToActionLabelOnly = false,
}: OverlayTextBox2FieldOptions = {}): GroupField {
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
        ...heading2Field,
        admin: {
          ...heading2Field.admin,
          condition,
        },
      } as TextField,
      {
        ...richTextField,
        admin: {
          ...richTextField.admin,
          condition,
        },
      } as RichTextField,
      callToActionLabelOnly
        ? {
            name: "callToActionLabel",
            label: {
              en: "Call to Action Label",
              es: "Etiqueta del Call to Action",
            },
            type: "text",
            localized: true,
            admin: {
              description: {
                en: "Leave blank to hide the call to action.",
                es: "Deja en blanco para ocultar el call to action.",
              },
            },
          }
        : {
            ...callToAction2Field,
            admin: {
              ...callToAction2Field.admin,
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
