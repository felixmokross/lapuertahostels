import { Meta, StoryObj } from "@storybook/react";
import { PreviewBar } from "./preview-bar";

const meta = {
  title: "layout/Preview Bar",
  component: PreviewBar,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-neutral-600">Content placeholder</p>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PreviewBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "absolute bottom-0 inset-x-0",
  },
};
