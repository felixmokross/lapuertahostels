import type { Meta, StoryObj } from "@storybook/react";
import { SeparatorBlock } from "./separator-block";

const meta = {
  title: "blocks/Separator Block",
  component: SeparatorBlock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SeparatorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
