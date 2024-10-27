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
    video: {
      id: "1",
      filename: "video-compressed.mp4",
      alt: "Video of Tayrona",
      createdAt: "2021-09-01T00:00:00Z",
      updatedAt: "2021-09-01T00:00:00Z",
    },
    previewImage: {
      id: "1",
      filename: "video-compressed-preview.png",
      createdAt: "2021-09-01T00:00:00Z",
      updatedAt: "2021-09-01T00:00:00Z",
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
