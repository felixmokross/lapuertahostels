import { Block } from "payload";
import {
  textField,
  richTextField,
  moreOptionsField,
  elementIdField,
  imageField,
} from "@fxmk/cms-plugin";

export const AccommodationSelectorBlock: Block = {
  slug: "AccommodationSelector",
  interfaceName: "AccommodationSelector",
  labels: {
    singular: {
      en: "Accommodation Selector",
      es: "Selector de alojamiento",
    },
    plural: {
      en: "Accommodation Selectors",
      es: "Selectores de alojamiento",
    },
  },
  fields: [
    textField({ name: "heading", label: { en: "Heading", es: "Título" } }),
    richTextField(),
    {
      name: "cards",
      label: {
        en: "Cards",
        es: "Tarjetas",
      },
      labels: {
        singular: {
          en: "Card",
          es: "Tarjeta",
        },
        plural: {
          en: "Cards",
          es: "Tarjetas",
        },
      },
      type: "array",
      minRows: 2,
      maxRows: 2,
      required: true,
      fields: [
        {
          name: "brand",
          label: {
            en: "Brand",
            es: "Marca",
          },
          type: "relationship",
          relationTo: "brands",
          filterOptions: { id: { not_equals: "puerta" } },
          required: true,
        },
        imageField(),
        richTextField({
          name: "description",
          label: {
            en: "Description",
            es: "Descripción",
          },
        }),
      ],
      admin: {
        initCollapsed: true,
        description: {
          en: "Each card represents an accommodation brand. You can change their order and update their image and description here.",
          es: "Cada tarjeta representa una marca de alojamiento. Puedes cambiar su orden y actualizar su imagen y descripción aquí.",
        },
      },
    },
    moreOptionsField(elementIdField()),
  ],
};
