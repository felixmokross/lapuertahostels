import { elementIdField } from "@/fields/element-id";
import { moreOptionsField } from "@/fields/more-options";
import { overlayTextBoxField } from "@/fields/overlay-text-box";
import { Block } from "payload";

export const MapBlock: Block = {
  slug: "Map",
  interfaceName: "Map",
  labels: {
    singular: {
      en: "Map",
      es: "Mapa",
    },
    plural: {
      en: "Maps",
      es: "Mapas",
    },
  },
  imageURL: "/assets/blocks/Map.png",
  imageAltText:
    "Preview of the Map block, showing a map with a pin and an overlay text box.",
  fields: [
    {
      name: "address",
      type: "textarea",
      required: true,
      label: {
        en: "Address",
        es: "Dirección",
      },
      admin: {
        description: {
          en: "Enter the address to display on the map, including the business name. It should resolve unambiguously to a place on Google Maps.",
          es: "Ingresa la dirección para mostrar en el mapa, incluyendo el nombre del negocio. Debería resolver inequívocamente a un lugar en Google Maps.",
        },
      },
    },
    {
      name: "zoomLevel",
      type: "number",
      required: true,
      defaultValue: 14,
      label: {
        en: "Zoom Level",
        es: "Nivel de Zoom",
      },
      min: 0,
      max: 22,
      admin: {
        description: {
          en: "Enter a number from 0 to 22. The level of detail for the different zoom levels is approximately: 1—World, 5—Landmass/continent, 10—City, 15—Streets, 20—Buildings. Floating point numbers are allowed, e.g. 14.5.",
          es: "Ingresa un número de 0 a 22. El nivel de detalle para los diferentes niveles de zoom es aproximadamente: 1—Mundo, 5—Masa de tierra/continente, 10—Ciudad, 15—Calles, 20—Edificios. Se permiten números decimales, por ejemplo 14.5.",
        },
      },
    },
    overlayTextBoxField({ optional: false, callToActionLabelOnly: true }),
    moreOptionsField(elementIdField()),
  ],
};
