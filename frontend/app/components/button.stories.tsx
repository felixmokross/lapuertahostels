import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta = {
  title: "Button",
  component: Button,
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    children: "Click Here",
    size: "large",
  },
};

export const Medium: Story = {
  args: {
    children: "Click Here",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    children: "Click Here",
    size: "small",
  },
};
