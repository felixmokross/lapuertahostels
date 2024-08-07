import type { Meta, StoryObj } from "@storybook/react";

import { HeroVideoBlock } from "./hero-video-block";

const meta = {
  title: "blocks/Hero Video Block",
  component: HeroVideoBlock,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "HeroVideo",
    videoUrl:
      "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed.mp4?updatedAt=1716840200792",
    previewImage: {
      url: "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed-preview.png?updatedAt=1716908602638",
      aspectRatio: undefined!,
    },
    overlayTitle: {
      show: true,
      text: [
        { children: [{ text: "Explore " }, { text: "Tayrona", bold: true }] },
      ],
      overlay: "subtle",
      position: "center",
      cta: {
        show: true,
        url: "/tayrona",
        text: "Book Now",
      },
    },
  },
};

export const WithoutOverlayTitle: Story = {
  args: {
    ...Default.args,
    overlayTitle: { show: false },
  },
};
