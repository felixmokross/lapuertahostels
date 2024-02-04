import type { Meta, StoryObj } from "@storybook/react";

import { HeaderBrandLogo } from "./header-brand-logo";

const meta = {
  title: "header/HeaderBrandLogo",
  component: HeaderBrandLogo,
  argTypes: {},
} satisfies Meta<typeof HeaderBrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
