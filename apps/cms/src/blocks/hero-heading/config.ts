import { Block } from "payload";
import { imageField } from "@/fields/image";
import { descriptionField } from "@/fields/description";
import { textField } from "@/fields/text";

const optionalImageField = imageField({ required: false });

export const HeroHeadingBlock: Block = {
  slug: "HeroHeading",
  interfaceName: "HeroHeading",
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
    descriptionField({
      en: "The Hero Heading block can have an optional image for a more engaging page heading. If no image is uploaded, a simple page heading will be displayed.",
      es: "El bloque de encabezado de héroe puede tener una imagen opcional para un encabezado de página más atractivo. Si no se sube ninguna imagen, se mostrará un encabezado de página simple.",
    }),
    textField({ name: "heading", label: { en: "Heading", es: "Título" } }),
    optionalImageField,
  ],
};
