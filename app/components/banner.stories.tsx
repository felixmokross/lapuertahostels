import type { Meta, StoryObj } from "@storybook/react";

import { Banner } from "./banner";

const meta = {
  title: "Banner",
  component: Banner,
  argTypes: {},
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Travel before 20 September and get 20% off!",
    cta: "Book now →",
    ctaTo: "/cta",
  },
};
