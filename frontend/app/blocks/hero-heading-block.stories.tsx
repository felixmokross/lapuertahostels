import type { Meta, StoryObj } from "@storybook/react";

import { HeroHeadingBlock } from "./hero-heading-block";

const meta = {
  title: "blocks/Hero Heading Block",
  component: HeroHeadingBlock,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "HeroHeading",
    heading: "Hello, World!",
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    image: {
      show: true,
      url: "https://ik.imagekit.io/lapuertahostels/aqua/deluxe-con-terraza/IMG_6591.jpg?updatedAt=1717280340182",
    },
  },
};
