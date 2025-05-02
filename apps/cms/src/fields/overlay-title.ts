import { GroupField, RadioField } from "payload";
import { showField } from "./show";
import { ImageWithFloatingText } from "@/payload-types";
import { callToActionField } from "./call-to-action";
import { richTextField } from "./rich-text";

type OverlayTitleFieldOptions = {
  optional?: boolean;
  supportsSupportingText?: boolean;
  supportsCallToAction?: boolean;
  supportsPositions?: ImageWithFloatingText["overlayTitle"]["position"][];
};

const configuredCallToActionField = callToActionField({
  optional: true,
  showByDefault: false,
  variant: { default: "primary" },
});

export function overlayTitleField({
  optional = false,
  supportsSupportingText = true,
  supportsCallToAction = true,
  supportsPositions,
}: OverlayTitleFieldOptions = {}): GroupField {
  const condition = optional
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_: any, siblingData: any) => siblingData.show
    : undefined;

  return {
    name: "overlayTitle",
    label: {
      en: "Overlay Title",
      es: "Título superpuesto",
    },
    type: "group",
    fields: [
      ...(optional ? [showField()] : []),
      richTextField({ admin: { condition } }),
      ...(supportsSupportingText
        ? [
            richTextField({
              name: "supportingText",
              label: {
                en: "Supporting Text",
                es: "Texto de apoyo",
              },
              admin: { condition },
              required: false,
            }),
          ]
        : []),
      ...(supportsCallToAction
        ? [
            {
              ...configuredCallToActionField,
              admin: {
                ...configuredCallToActionField.admin,
                condition,
              },
            },
          ]
        : []),
      getPositionField(),
      {
        name: "overlay",
        label: {
          en: "Overlay",
          es: "Superposición",
        },
        type: "radio",
        options: [
          { value: "subtle", label: { en: "Subtle", es: "Sutil" } },
          { value: "moderate", label: { en: "Moderate", es: "Moderado" } },
          { value: "intense", label: { en: "Intense", es: "Intenso" } },
        ],
        defaultValue: "moderate",
        admin: {
          description: {
            en: "The overlay is a semi-transparent black layer that is placed on top of the image to make the text more readable. Choose the intensity that is the best trade-off between readability of the text and brightness of the image.",
            es: "La superposición es una capa negra semitransparente que se coloca sobre la imagen para que el texto sea más legible. Elige la intensidad que sea el mejor compromiso entre la legibilidad del texto y el brillo de la imagen.",
          },
          condition,
        },
      },
    ],
  };

  function getPositionField(): RadioField {
    const options = getPositionOptions();

    return {
      name: "position",
      label: {
        en: "Position",
        es: "Posición",
      },
      type: "radio",
      options,
      defaultValue: "center",
      admin: {
        layout: options.length > 2 ? "vertical" : "horizontal",
        condition,
      },
    };
  }

  function getPositionOptions(): RadioField["options"] {
    const allOptions = [
      { value: "center", label: { en: "Center", es: "Centro" } },
      {
        value: "top-left",
        label: { en: "Top Left", es: "Arriba a la Izquierda" },
      },
      {
        value: "top-right",
        label: { en: "Top Right", es: "Arriba a la Derecha" },
      },
      {
        value: "bottom-right",
        label: { en: "Bottom Right", es: "Abajo a la Derecha" },
      },
      {
        value: "bottom-left",
        label: { en: "Bottom Left", es: "Abajo a la Izquierda" },
      },
    ];

    return supportsPositions
      ? allOptions.filter((option) =>
          supportsPositions.includes(
            option.value as (typeof supportsPositions)[number],
          ),
        )
      : allOptions;
  }
}
