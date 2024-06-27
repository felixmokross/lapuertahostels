import type { Meta, StoryObj } from "@storybook/react";

import { Banner } from "./banner";
import { allModes } from ".storybook/modes";

const meta = {
  title: "layout/Banner",
  component: Banner,
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
        "locale-es": allModes["locale-es"],
        "locale-de": allModes["locale-de"],
        "locale-fr": allModes["locale-fr"],
      },
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Travel before 20 September and get 20% off!",
    cta: "Book now →",
    ctaTo: "/cta",
  },
};

export const WithoutCallToAction: Story = {
  args: {
    ...Default.args,
    cta: undefined,
    ctaTo: undefined,
  },
};
