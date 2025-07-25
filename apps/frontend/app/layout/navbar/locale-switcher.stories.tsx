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
      { locale: "en", displayLabel: "English" },
      { locale: "es", displayLabel: "Español" },
      { locale: "de", displayLabel: "Deutsch" },
      { locale: "fr", displayLabel: "Français" },
    ],
  },
};
