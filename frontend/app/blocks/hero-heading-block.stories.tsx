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
      id: "1",
      filename: "IMG_6591.jpg",
      alt: "Terrace with two chairs and a coffee table",
      createdAt: "2021-08-31T00:00:00.000Z",
      updatedAt: "2021-08-31T00:00:00.000Z",
    },
  },
};
