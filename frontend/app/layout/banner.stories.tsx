import type { Meta, StoryObj } from "@storybook/react";

import { Banner } from "./banner";
import { allModes } from ".storybook/modes";
import { Page } from "~/payload-types";

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
    id: "1",
    createdAt: "2021-09-01T00:00:00Z",
    updatedAt: "2021-09-01T00:00:00Z",
    message: "Travel before 20 September and get 20% off!",
    cta: {
      show: true,
      link: {
        label: "Book now",
        type: "internal",
        page: { url: "/experiences/tayrona" } as Page,
      },
    },
  },
};

export const WithoutCallToAction: Story = {
  args: {
    ...Default.args,
    cta: undefined,
  },
};
