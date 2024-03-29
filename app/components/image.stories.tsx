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
    src: "logos/logo-puerta-with-text.png?updatedAt=1703906701749&tr=h-160",
    width: 66,
    height: 80,
  },
};
