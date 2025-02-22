import type { Meta, StoryObj } from "@storybook/react";

import { HeroHeadingBlock } from "./hero-heading-block";
import { media, plainText } from "~/common/cms-data.builders";

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
    heading: plainText("Hello, World!"),
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    image: media("IMG_6591.jpg"),
  },
};
