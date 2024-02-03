import type { Meta, StoryObj } from "@storybook/react";

import { AzulLogo } from "./azul-logo";

const meta = {
  title: "logos/AzulLogo",
  component: AzulLogo,
  argTypes: {},
} satisfies Meta<typeof AzulLogo>;

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
