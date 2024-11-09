import { Block } from "payload/types";
import { makeImageField } from "../fields/image";
import { FieldDescription } from "payload/components/forms";
import React from "react";
import { headingField } from "../fields/heading";

const optionalImageField = makeImageField({ optional: true });

export const HeroHeadingBlock: Block = {
  slug: "HeroHeading",
  labels: {
    singular: {
      en: "Hero Heading",
      es: "Encabezado de héroe",
    },
    plural: {
      en: "Hero Headings",
      es: "Encabezados de héroe",
    },
  },
  imageURL: "/assets/blocks/HeroHeading.png",
  imageAltText:
    "Preview of the Hero Heading block, showing a centered heading on a brand color background.",
  fields: [
    {
      type: "ui",
      name: "description",
      label: { en: "Description", es: "Descripción" },
      admin: {
        components: {
          Field: ({ custom }) => (
            <FieldDescription description={custom.description} />
          ),
        },
      },
      custom: {
        description: {
          en: "The Hero Heading block can have an optional image for a more engaging page heading. If no image is uploaded, a simple page heading will be displayed.",
          es: "El bloque de encabezado de héroe puede tener una imagen opcional para un encabezado de página más atractivo. Si no se sube ninguna imagen, se mostrará un encabezado de página simple.",
        },
      },
    },
    headingField,
    optionalImageField,
  ],
};
