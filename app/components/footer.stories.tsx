import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";

const meta = {
  title: "Footer",
  component: Footer,
  argTypes: {
    brand: {
      control: "radio",
      options: ["puerta", "aqua", "azul"],
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    brand: "puerta",
  },
};
