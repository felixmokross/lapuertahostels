import type { Meta, StoryObj } from "@storybook/react";

import { SlideImage } from "./slide-image";

const meta = {
  component: SlideImage,
  title: "blocks/Slides Block/Slide Image",
  argTypes: {},
} satisfies Meta<typeof SlideImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://ik.imagekit.io/lapuertahostels/azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717",
    alt: "Example image",
  },
};
