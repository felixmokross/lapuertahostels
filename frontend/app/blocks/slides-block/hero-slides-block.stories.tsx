import type { Meta, StoryObj } from "@storybook/react";

import { HeroSlidesBlock } from "./hero-slides-block";
import { callToAction, media, richText } from "~/common/cms-data.builders";
import { plain, text } from "~/common/rich-text.builders";

const meta = {
  title: "blocks/Hero Slides Block",
  component: HeroSlidesBlock,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeroSlidesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "HeroSlides",
    slides: [
      {
        name: "Lost City",
        image: media("datingjungle-Vv4JB0SMfZ4-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Lost City"))),
          position: "top-right",
          cta: callToAction("Read More", "primary"),
        },
      },
      {
        name: "Parque Tayrona",
        image: media("azzedine-rouichi-gc5OYAll-rc-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Parque Tayrona"))),
          position: "bottom-left",
          cta: callToAction("Read More", "primary"),
        },
      },
      {
        name: "Santa Marta",
        image: media("david-hertle-3YCkAhD--Ic-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Santa Marta"))),
          position: "bottom-right",
          cta: callToAction("Read More", "primary"),
        },
      },
      {
        name: "Minca",
        image: media("denise-leisner-8eVV287ST0E-unsplash.jpg"),
        overlayTitle: {
          show: true,
          text: richText(plain(text("Minca"))),
          position: "top-left",
          cta: callToAction("Read More", "primary"),
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
