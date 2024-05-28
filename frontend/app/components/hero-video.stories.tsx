import type { Meta, StoryObj } from "@storybook/react";

import { HeroVideo } from "./hero-video";
import { HeadingHighlight } from "./heading";

const meta = {
  title: "HeroVideo",
  component: HeroVideo,
  argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    src: "https://ik.imagekit.io/lapuertahostels/experiences/tayrona/video-compressed.mp4?updatedAt=1716840200792",
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
