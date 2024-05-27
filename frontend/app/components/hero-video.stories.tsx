import type { Meta, StoryObj } from "@storybook/react";

import { HeroVideo } from "./hero-video";

const meta = {
  title: "HeroVideo",
  component: HeroVideo,
  argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed.mp4?updatedAt=1716840200792",
  },
};
