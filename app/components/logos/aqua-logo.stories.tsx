import type { Meta, StoryObj } from "@storybook/react";

import { AquaLogo } from "../logos/aqua-logo";

const meta = {
  title: "logos/AquaLogo",
  component: AquaLogo,
  argTypes: {},
} satisfies Meta<typeof AquaLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};
