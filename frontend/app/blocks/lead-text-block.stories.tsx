import type { Meta, StoryObj } from "@storybook/react";
import { LeadTextBlock } from "./lead-text-block";
import { callToAction, plainText, richText } from "~/common/cms-data.builders";
import { createId } from "@paralleldrive/cuid2";
import { bold, paragraph, text } from "~/common/rich-text.builders";

const meta = {
  title: "blocks/Lead Text Block",
  component: LeadTextBlock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LeadTextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "LeadText",
    id: createId(),
    heading: plainText("Discover the Colombian Costa Caribe"),
    text: richText(
      paragraph(
        text("Hike through the breath-taking beauty of "),
        bold("Tayrona National Park"),
        text(", discover the mysterious "),
        bold("Lost City"),
        text(", or refresh yourself in the river of "),
        bold("Minca"),
        text(
          ". Our variety of heartful accommodations in the city of Santa Marta are ",
        ),
        bold("your perfect home base"),
        text("."),
      ),
    ),
  },
};

export const WithCallToAction: Story = {
  args: {
    ...Default.args,
    cta: callToAction("Book Now"),
  },
};

export const WithoutHeading: Story = {
  args: {
    ...Default.args,
    heading: undefined,
  },
};
