import type { Meta, StoryObj } from "@storybook/react";

import { SlideImage } from "./slide-image";

const meta = {
  title: "SlideImage",
  component: SlideImage,
  argTypes: {},
} satisfies Meta<typeof SlideImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "https://ik.imagekit.io/lapuertahostels/azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717&tr=ar-4-3,w-1600",
    alt: "Example image",
  },
};