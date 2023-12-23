import type { Meta, StoryObj } from "@storybook/react";

import { Image } from "./image";

const meta = {
  title: "Image",
  component: Image,
  argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717&tr=ar-4-3,w-1600",
  },
};
