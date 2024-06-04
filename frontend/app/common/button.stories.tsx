import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";

const meta = {
  title: "common/Button",
  component: Button,
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click Here",
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: "primary",
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: "large",
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
  },
};
