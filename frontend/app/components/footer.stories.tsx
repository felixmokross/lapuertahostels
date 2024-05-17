import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";

const meta = {
  title: "Footer",
  component: Footer,
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    content: {
      address: `La Puerta Hostels S.A.S.
Calle 18 #5-66
Santa Marta 470004
Colombia`,
      copyright: "La Puerta Hostels S.A.S. All rights reserved.",
    },
  },
};
