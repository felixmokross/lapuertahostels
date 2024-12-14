import type { Meta, StoryObj } from "@storybook/react";

import { SlideImage } from "./slide-image";
import { media } from "~/common/cms-data.builders";

const meta = {
  component: SlideImage,
  title: "blocks/Hero Slides Block/Slide Image",
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SlideImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    media: media("azzedine-rouichi-gc5OYAll-rc-unsplash.jpg", "Example image"),
  },
};
