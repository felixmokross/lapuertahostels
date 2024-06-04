import type { Meta, StoryObj } from "@storybook/react";

import { LocaleSwitcher } from "./locale-switcher";

const meta = {
  title: "layout/Header/Locale Switcher",
  component: LocaleSwitcher,
  argTypes: {
    currentLocale: {
      options: ["en", "es", "de", "fr"],
      control: { type: "select" },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLocale: "en",
  },
};
