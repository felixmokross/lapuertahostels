import { Meta, StoryObj } from "@storybook/react";
import { MapBlock } from "./map-block";
import { plainText, richText } from "~/common/cms-data.builders";
import { paragraph, text } from "~/common/rich-text.builders";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useEnvironment } from "~/common/environment";
import { useCommon } from "~/common/common";

const meta = {
  title: "blocks/Map Block",
  component: MapBlock,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      const { googleMapsApiKey } = useEnvironment();
      const { maps } = useCommon();
      return (
        <APIProvider
          apiKey={googleMapsApiKey}
          region={maps.region ?? undefined}
        >
          <Story />
        </APIProvider>
      );
    },
  ],
} satisfies Meta<typeof MapBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Map",
    address:
      "Puerta Aqua By La Puerta Hostels, Calle 18, Comuna 2, Santa Marta, Magdalena, Colombia",
    zoomLevel: 14.5,
    overlayTextBox: {
      heading: plainText("Visit Us"),
      text: richText(
        paragraph(
          text(
            "We're located in Santa Marta, Colombia. Come say hi! This is a longer text.",
          ),
        ),
        paragraph(text("We're looking forward to meeting you!")),
      ),
      callToActionLabel: plainText("Get Directions"),
    },
  },
};
