import type { Meta, StoryObj } from "@storybook/react";

import { PuertaLogo } from "./puerta-logo";

const meta = {
  title: "PuertaLogo",
  component: PuertaLogo,
  argTypes: {},
} satisfies Meta<typeof PuertaLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
