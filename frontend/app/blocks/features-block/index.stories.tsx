import type { Meta, StoryObj } from "@storybook/react";

import { FeaturesBlock } from ".";

const meta = {
  title: "blocks/Features Block/Features Block",
  component: FeaturesBlock,
  argTypes: {},
} satisfies Meta<typeof FeaturesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Features",
    items: [
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
          alt: "Example image",
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
          url: "https://ik.imagekit.io/lapuertahostels/azul/piscina/_DSC0299.jpg?updatedAt=1714162023408",
          alt: "Example image",
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
          url: "https://ik.imagekit.io/lapuertahostels/azul/delux%20twin%20with%20terrace/_DSC0325.jpg?updatedAt=1714162301928",
          alt: "Example image",
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
          text: "Book Twin Room",
          url: "https://reservas.azul.lapuertahostels.co/la-puerta-azul/room/33860",
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
