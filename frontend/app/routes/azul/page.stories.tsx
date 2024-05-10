import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./page";
import { BrandContext } from "~/brands";

const meta = {
  title: "routes/azul/Page",
  component: Page,
  argTypes: {},
  decorators: [
    // override the brand context, this is a Azul-only component
    (Story) => (
      <BrandContext.Provider value="azul">
        <Story />
      </BrandContext.Provider>
    ),
  ],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
