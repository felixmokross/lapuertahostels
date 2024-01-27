import type { Meta, StoryObj } from "@storybook/react";

import { CarouselImage } from "./carousel-image";

const meta = {
  title: "CarouselImage",
  component: CarouselImage,
  argTypes: {},
} satisfies Meta<typeof CarouselImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717&tr=ar-4-3,w-1600",
  },
};
