import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./link";

const meta = {
  title: "Link",
  component: Link,
  argTypes: {},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    to: "my-page",
    children: "My Page",
  },
};
