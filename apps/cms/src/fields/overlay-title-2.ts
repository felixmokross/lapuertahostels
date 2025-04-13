import { GroupField, RadioField, RelationshipField } from "payload";
import { showField } from "./show";
import { Page } from "@/payload-types";
import { makeCallToAction2Field } from "./call-to-action-2";
import { editor } from "@/collections/texts/editor";
import { transformRecordAsync } from "@/common/records";
import { richTextToHtml } from "@/collections/texts/utils";

type OverlayTitle2FieldOptions = {
  optional?: boolean;
  supportsSupportingText?: boolean;
  supportsCallToAction?: boolean;
  supportsPositions?: (NonNullable<Page["layout"]>[number] & {
    blockType: "ImageWithFloatingText";
  })["overlayTitle"]["position"][];
};

const callToAction2Field = makeCallToAction2Field({
  optional: true,
  showByDefault: false,
  variant: { default: "primary" },
});

export function makeOverlayTitle2Field({
  optional = false,
  supportsSupportingText = true,
  supportsCallToAction = true,
  supportsPositions,
}: OverlayTitle2FieldOptions = {}): GroupField {
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
      ...(optional ? [showField] : []),
      {
        name: "text",
        label: {
          en: "Text",
          es: "Texto",
        },
        required: true,
        type: "richText",
        localized: true,
        editor: editor(),
        admin: {
          condition,
        },
      },
      ...(supportsSupportingText
        ? [
            {
              name: "supportingText",
              label: {
                en: "Supporting Text",
                es: "Texto de apoyo",
              },
              type: "relationship",
              relationTo: "texts",
              filterOptions: {
                type: { equals: "richText" },
              },
              admin: {
                condition,
              },
            } as RelationshipField,
          ]
        : []),
      ...(supportsCallToAction
        ? [
            {
              ...callToAction2Field,
              admin: {
                ...callToAction2Field.admin,
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
