import type { Meta, StoryObj } from "@storybook/react";

import { Banner } from "./banner";

const meta = {
  title: "layout/Banner",
  component: Banner,
  argTypes: {},
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
