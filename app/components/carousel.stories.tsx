import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./carousel";

const meta = {
  title: "Carousel",
  component: Carousel,
  argTypes: {},
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        src: "datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843&tr=ar-4-3,w-1600",
        alt: "Lost City",
        title: { text: "Lost City", position: "top-right" },
      },
      {
        src: "azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717&tr=ar-4-3,w-1600",
        alt: "Parque Tayrona",
        title: { text: "Parque Tayrona", position: "top-left" },
      },
      {
        src: "denise-leisner-8eVV287ST0E-unsplash.jpg?updatedAt=1703369612704",
        alt: "Minca",
        title: { text: "Minca", position: "bottom-left" },
      },
    ],
  },
};
