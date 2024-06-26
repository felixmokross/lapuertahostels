import { slateEditor } from "@payloadcms/richtext-slate";
import { GroupField, RadioField } from "payload/types";
import { makeCallToActionField } from "./call-to-action";
import { showField } from "./show";
import { Page } from "payload/generated-types";

type OverlayTitleFieldOptions = {
  optional?: boolean;
  supportsCallToAction?: boolean;
  supportsPositions?: (NonNullable<Page["layout"]>[number] & {
    blockType: "ImageWithFloatingText";
  })["overlayTitle"]["position"][];
};

const callToActionField = makeCallToActionField({
  optional: true,
  showByDefault: false,
  variant: { default: "primary" },
});

export function makeOverlayTitleField({
  optional = false,
  supportsCallToAction = true,
  supportsPositions,
}: OverlayTitleFieldOptions = {}): GroupField {
  const condition = optional ? (_, siblingData) => siblingData.show : undefined;

  return {
    name: "overlayTitle",
    label: {
      en: "Overlay Title",
      es: "Título superpuesto",
    },
    type: "group",
    fields: [
      ...(optional ? [showField] : []),
      {
        name: "text",
        label: {
          en: "Text",
          es: "Texto",
        },
        localized: true,
        required: true,
        type: "richText",
        editor: slateEditor({
          admin: {
            elements: [],
            leaves: ["bold"],
          },
        }),
        admin: {
          description: {
            en: "Mark parts of the text as bold to make it stand out. You can use line breaks to ensure that the text is displayed as you want.",
            es: "Marca partes del texto como negrita para que destaque. Puedes usar saltos de línea para asegurarte de que el texto se muestre como deseas.",
          },
          condition,
        },
      },
      ...(supportsCallToAction
        ? [
            {
              ...callToActionField,
              admin: {
                ...callToActionField.admin,
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
