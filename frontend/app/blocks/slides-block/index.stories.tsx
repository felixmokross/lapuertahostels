import type { Meta, StoryObj } from "@storybook/react";

import { SlidesBlock } from ".";

const meta = {
  title: "blocks/Slides Block/Slides Block",
  component: SlidesBlock,
  argTypes: {},
} satisfies Meta<typeof SlidesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "Slides",
    slides: [
      {
        name: "Lost City",
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/datingjungle-Vv4JB0SMfZ4-unsplash.jpg?updatedAt=1703284394843",
          alt: "Lost City",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Lost City" }] }],
          position: "top-right",
          cta: { show: true, text: "Read More", url: "#" },
        },
      },
      {
        name: "Parque Tayrona",
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717",
          alt: "Parque Tayrona",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Parque Tayrona" }] }],
          position: "bottom-left",
          cta: { show: true, text: "Read More", url: "#" },
        },
      },
      {
        name: "Santa Marta",
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/david-hertle-3YCkAhD--Ic-unsplash.jpg?updatedAt=1703468865964",
          alt: "Santa Marta",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Santa Marta" }] }],
          position: "bottom-right",
          cta: { show: true, text: "Read More", url: "#" },
        },
      },
      {
        name: "Minca",
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/denise-leisner-8eVV287ST0E-unsplash.jpg?updatedAt=1703369612704",
          alt: "Minca",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Minca" }] }],
          position: "top-left",
          cta: { show: true, text: "Read More", url: "#" },
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
