import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { Block } from "payload/types";
import { elementIdField } from "../fields/element-id";
import { makeMoreOptionsField } from "../fields/more-options";
import { imageField } from "../fields/image";
import { Brands } from "../collections/Brands";
import { newHeadingField } from "../fields/new-heading";
import { makeNewRichTextField } from "../fields/new-rich-text";
import { Texts } from "../collections/Texts";

export const AccommodationSelectorBlock: Block = {
  slug: "AccommodationSelector",
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
  imageURL: "/assets/blocks/AccommodationSelector.png",
  imageAltText:
    "Preview of the Accommodation Selector block, showing a heading and introductory text followed by two accommodation cards",
  fields: [
    newHeadingField,
    makeNewRichTextField(),
    {
      name: "cards",
      label: {
        en: "Cards",
        es: "Tarjetas",
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
          relationTo: Brands.slug,
          filterOptions: { id: { not_equals: "puerta" } },
          required: true,
        },
        imageField,
        {
          name: "description",
          label: {
            en: "Description",
            es: "Descripción",
          },
          type: "relationship",
          relationTo: Texts.slug,
          filterOptions: {
            type: { equals: "richText" },
          },
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ({ data }: RowLabelArgs) => data?.brand,
        },
        description: {
          en: "Each card represents an accommodation brand. You can change their order and update their image and description here.",
          es: "Cada tarjeta representa una marca de alojamiento. Puedes cambiar su orden y actualizar su imagen y descripción aquí.",
        },
      },
    },
    makeMoreOptionsField(elementIdField),
  ],
};
