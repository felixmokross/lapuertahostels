import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./header";

const meta = {
  title: "header/Header",
  component: Header,
  argTypes: {
    brand: {
      options: ["puerta", "aqua", "azul"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    brand: "puerta",
  },
};
