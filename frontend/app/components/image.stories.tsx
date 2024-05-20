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
    src: "https://ik.imagekit.io/lapuertahostels/logos/logo-puerta-with-text.png?updatedAt=1703906701749",
    alt: "Logo Puerta",
    transformation: {
      height: 160,
    },
    className: "h-[80px]",
  },
};
