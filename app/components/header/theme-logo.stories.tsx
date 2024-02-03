import type { Meta, StoryObj } from "@storybook/react";

import { ThemeLogo } from "./theme-logo";

const meta = {
  title: "header/ThemeLogo",
  component: ThemeLogo,
  argTypes: {
    theme: {
      control: "radio",
      options: ["puerta", "aqua", "azul"],
    },
  },
} satisfies Meta<typeof ThemeLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: "puerta",
  },
};
