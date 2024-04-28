import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./page";

const meta = {
  title: "routes/experiences/tayrona/Page",
  component: Page,
  argTypes: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
