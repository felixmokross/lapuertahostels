import type { Meta, StoryObj } from "@storybook/react";

import { SlidesBlock } from "./slides-block";

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
        image: {
          id: "1",
          filename: "datingjungle-Vv4JB0SMfZ4-unsplash.jpg",
          alt: "Lost City",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Lost City" }] }],
          position: "top-right",
          cta: {
            show: true,
            link: {
              label: "Read More",
              type: "external",
              url: "http://example.com",
            },
          },
        },
      },
      {
        name: "Parque Tayrona",
        image: {
          id: "2",
          filename: "azzedine-rouichi-gc5OYAll-rc-unsplash.jpg",
          alt: "Parque Tayrona",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Parque Tayrona" }] }],
          position: "bottom-left",
          cta: {
            show: true,
            link: {
              label: "Read More",
              type: "external",
              url: "http://example.com",
            },
          },
        },
      },
      {
        name: "Santa Marta",
        image: {
          id: "3",
          filename: "david-hertle-3YCkAhD--Ic-unsplash.jpg",
          alt: "Santa Marta",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Santa Marta" }] }],
          position: "bottom-right",
          cta: {
            show: true,
            link: {
              label: "Read More",
              type: "external",
              url: "http://example.com",
            },
          },
        },
      },
      {
        name: "Minca",
        image: {
          id: "4",
          filename: "denise-leisner-8eVV287ST0E-unsplash.jpg",
          alt: "Minca",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        overlayTitle: {
          show: true,
          text: [{ children: [{ text: "Minca" }] }],
          position: "top-left",
          cta: {
            show: true,
            link: {
              label: "Read More",
              type: "external",
              url: "http://example.com",
            },
          },
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
