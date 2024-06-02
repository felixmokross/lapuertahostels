import type { Meta, StoryObj } from "@storybook/react";

import { HeroVideoBlock } from "./hero-video-block";

const meta = {
  title: "blocks/Hero Video Block",
  component: HeroVideoBlock,
  argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    blockType: "HeroVideo",
    videoUrl:
      "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed.mp4?updatedAt=1716840200792",
    previewUrl:
      "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed-preview.png?updatedAt=1716908602638",
  },
};

export const WithOverlayTitle: Story = {
  args: {
    ...Simple.args,
    overlayTitle: {
      show: true,
      text: [
        { children: [{ text: "Expore " }, { text: "Tayrona", bold: true }] },
      ],
      overlay: "subtle",
      position: "top-right",
      cta: {
        show: true,
        url: "/tayrona",
        text: "Book Now",
      },
    },
  },
};
