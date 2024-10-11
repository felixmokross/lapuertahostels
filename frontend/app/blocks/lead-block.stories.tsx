import type { Meta, StoryObj } from "@storybook/react";
import { LeadBlock } from "./lead-block";

const meta = {
  title: "blocks/Lead Block",
  component: LeadBlock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LeadBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Lead",
    id: "lead-1",
    heading: "Discover the Colombian Costa Caribe",
    text: [
      {
        children: [
          {
            text: "Hike through the breath-taking beauty of ",
          },
          {
            text: "Tayrona National Park",
            bold: true,
          },
          {
            text: ", discover the mysterious ",
          },
          {
            text: "Lost City",
            bold: true,
          },
          {
            text: ", or refresh yourself in the river of ",
          },
          {
            text: "Minca",
            bold: true,
          },
          {
            text: ". Our variety of heartful accommodations in the city of Santa Marta are ",
          },
          {
            text: "your perfect home base",
            bold: true,
          },
          {
            text: ".",
          },
        ],
      },
    ],
  },
};

export const WithCallToAction: Story = {
  args: {
    ...Default.args,
    cta: {
      show: true,
      text: "Book now",
      url: "/santa-marta",
    },
  },
};

export const WithoutHeading: Story = {
  args: {
    ...Default.args,
    heading: undefined,
  },
};
