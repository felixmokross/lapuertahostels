import type { Meta, StoryObj } from "@storybook/react";

import { FeaturesBlock } from "./features-block";

const meta = {
  title: "blocks/Features Block",
  component: FeaturesBlock,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeaturesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Features",
    items: [
      {
        image: {
          id: "1",
          filename: "_DSC0358.jpg",
          alt: "Example image",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        heading: "Feel Refreshed",
        text: [
          {
            children: [
              {
                type: "text",
                text: "A day full of exploring the city can be tiring. Our ",
              },
              { type: "text", text: "air-conditioned", bold: true },
              { type: "text", text: " rooms with " },
              { type: "text", text: "tasteful", bold: true },
              {
                type: "text",
                text: " details give you the perfect place to relax and unwind.",
              },
            ],
          },
        ],
      },
      {
        image: {
          id: "2",
          filename: "_DSC0299.jpg",
          alt: "Example image",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        heading: "Cool Down in the Pool",
        text: [
          {
            children: [
              {
                type: "text",
                text: "Our ",
              },
              { type: "text", text: "courtyard pool", bold: true },
              {
                type: "text",
                text: " is the perfect place to cool down after a hot day under the Carribean sun.",
              },
            ],
          },
        ],
      },
      {
        image: {
          id: "3",
          filename: "_DSC0325.jpg",
          alt: "Example image",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        heading: "Bring Your Family",
        text: [
          {
            children: [
              {
                type: "text",
                text: "Traveling with your loved ones? We offer ",
              },
              { type: "text", text: "Twin Rooms", bold: true },
              {
                type: "text",
                text: " allowing an occupancy of up to four people.",
              },
            ],
          },
        ],
        cta: {
          show: true,
          link: {
            label: "Book Twin Room",
            type: "external",
            url: "http://example.com/booking-engine",
          },
        },
      },
    ],
  },
};

export const OrientationFirstImageRight: Story = {
  args: {
    ...Default.args,
    orientation: "first-image-right",
  },
};
