import type { Meta, StoryObj } from "@storybook/react";

import { MobileLocaleSwitcher } from "./mobile-locale-switcher";

const meta = {
  title: "layout/Navbar/Mobile Locale Switcher",
  component: MobileLocaleSwitcher,
  argTypes: {
    currentLocale: {
      options: ["en", "es", "de", "fr"],
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      modes: {
        "viewport-tablet": { disable: true },
        "viewport-desktop": { disable: true },
        "viewport-large-desktop": { disable: true },
      },
    },
  },
} satisfies Meta<typeof MobileLocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    currentLocale: "en",
    onClose: () => {},
    redirectTo: "/",
    publishedLocales: [
      { locale: "en", displayLabel: "English" },
      { locale: "es", displayLabel: "Español" },
      { locale: "de", displayLabel: "Deutsch" },
      { locale: "fr", displayLabel: "Français" },
    ],
  },
};
