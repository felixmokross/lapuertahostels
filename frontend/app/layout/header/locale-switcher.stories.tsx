import type { Meta, StoryObj } from "@storybook/react";

import { LocaleSwitcher } from "./locale-switcher";
import { allModes } from ".storybook/modes";

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
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
        "locale-es": allModes["locale-es"],
        "locale-de": allModes["locale-de"],
        "locale-fr": allModes["locale-fr"],
      },
    },
  },
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLocale: "en",
  },
};
