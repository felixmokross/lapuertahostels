import type { Meta, StoryObj } from "@storybook/react";

import { LocaleSwitcher } from "./locale-switcher";

const meta = {
  title: "layout/Navbar/Locale Switcher",
  component: LocaleSwitcher,
  argTypes: {
    currentLocale: {
      options: ["en", "es", "de", "fr"],
      control: { type: "select" },
    },
  },
  parameters: {
    layout: "centered",
    chromatic: {
      modes: {
        "viewport-small-mobile": { disable: true },
        "viewport-large-mobile": { disable: true },
      },
    },
  },
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLocale: "en",
    redirectTo: "/",
    publishedLocales: [
      { id: "en", displayLabel: "English" },
      { id: "es", displayLabel: "Español" },
      { id: "de", displayLabel: "Deutsch" },
      { id: "fr", displayLabel: "Français" },
    ],
  },
};
