import type { Meta, StoryObj } from "@storybook/react";

import { Image } from "./image";

const meta = {
  title: "common/Image",
  component: Image,
  argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "/logo-puerta-simple.png",
    alt: "Logo Puerta",
    transformation: {
      height: 160,
    },
    className: "h-[80px]",
    layout: "fixed",
  },
};
