import type { Meta, StoryObj } from "@storybook/react";

import { HeroVideoBlock } from "./hero-video-block";
import { HeadingHighlight } from "../components/heading";

const meta = {
  title: "HeroVideoBlock",
  component: HeroVideoBlock,
  argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    src: "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed.mp4?updatedAt=1716840200792",
    previewSrc:
      "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed-preview.png?updatedAt=1716908602638",
  },
};

export const WithOverlayTitle: Story = {
  args: {
    ...Simple.args,
    overlayTitle: {
      children: (
        <>
          Explore <HeadingHighlight>Tayrona</HeadingHighlight>
        </>
      ),
      overlay: "subtle",
      position: "top-right",
      cta: {
        to: "/tayrona",
        text: "Book Now",
      },
    },
  },
};
