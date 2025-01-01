import { Meta, StoryObj } from "@storybook/react";
import { MapBlock } from "./map-block";
import { plainText, richText } from "~/common/cms-data.builders";
import { paragraph, text } from "~/common/rich-text.builders";

const meta = {
  title: "blocks/Map Block",
  component: MapBlock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MapBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Map",
    address:
      "Puerta Aqua By La Puerta Hostels, Calle 18, Comuna 2, Santa Marta, Magdalena, Colombia",
    mapId: "7686c4d7ba62c06",
    region: "CO",
    zoomLevel: 14.5,
    overlayTextBox: {
      heading: plainText("Visit Us"),
      text: richText(
        paragraph(text("We're located in Santa Marta, Colombia.")),
      ),
      callToActionLabel: plainText("Get Directions"),
    },
  },
};
