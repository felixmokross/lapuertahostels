import type { Meta, StoryObj } from "@storybook/react";
import { LeadTextBlock } from "./lead-text-block";
import { Page } from "~/payload-types";

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
      link: {
        label: "Book Now",
        type: "internal",
        page: { url: "/" } as Page,
        fragment: "bookings",
      },
    },
  },
};

export const WithoutHeading: Story = {
  args: {
    ...Default.args,
    heading: undefined,
  },
};
