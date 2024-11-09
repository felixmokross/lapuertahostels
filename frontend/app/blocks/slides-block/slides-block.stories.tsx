import type { Meta, StoryObj } from "@storybook/react";

import { SlidesBlock } from "./slides-block";
import { callToAction, media, richText } from "~/common/cms-data.builders";
import { plain, text } from "~/common/rich-text.builders";

const meta = {
  title: "blocks/Slides Block",
  component: SlidesBlock,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SlidesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Slides",
    slides: [
      {
        name: "Lost City",
        image: media("datingjungle-Vv4JB0SMfZ4-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Lost City"))),
          position: "top-right",
          cta: callToAction("Read More"),
        },
      },
      {
        name: "Parque Tayrona",
        image: media("azzedine-rouichi-gc5OYAll-rc-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Parque Tayrona"))),
          position: "bottom-left",
          cta: callToAction("Read More"),
        },
      },
      {
        name: "Santa Marta",
        image: media("david-hertle-3YCkAhD--Ic-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Santa Marta"))),
          position: "bottom-right",
          cta: callToAction("Read More"),
        },
      },
      {
        name: "Minca",
        image: media("denise-leisner-8eVV287ST0E-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Minca"))),
          position: "top-left",
          cta: callToAction("Read More"),
        },
      },
    ],
  },
};

export const SingleSlide: Story = {
  args: {
    ...Default.args,
    slides: Default.args.slides.slice(0, 1),
  },
};
