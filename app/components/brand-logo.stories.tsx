import type { Meta, StoryObj } from "@storybook/react";

import { BrandLogo } from "./brand-logo";

const meta = {
  title: "BrandLogo",
  component: BrandLogo,
  argTypes: {
    brand: {
      control: "radio",
      options: ["puerta", "aqua", "azul"],
    },
    size: {
      control: "radio",
      options: ["large", "small"],
    },
  },
} satisfies Meta<typeof BrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
    brand: "puerta",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    brand: "puerta",
  },
};
