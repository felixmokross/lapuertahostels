import type { Meta, StoryObj } from "@storybook/react";

import { TextColumnsWithImagesBlock } from "./text-columns-with-images-block";
import { bold, plain, text } from "~/common/rich-text.builders";
import { media } from "~/common/media.builders";
import { Page } from "~/payload-types";

const meta = {
  title: "blocks/Text Columns with Images Block",
  component: TextColumnsWithImagesBlock,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TextColumnsWithImagesBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "TextColumnsWithImages",
    heading: "Our Services",
    text: [
      plain(
        text("Our services are designed to "),
        bold("make your life easier."),
      ),
    ],
    numberOfColumns: 3,
    items: [
      {
        id: "1",
        image: media("_DSC0299.jpg"),
        heading: "Example Heading",
        text: [
          plain(
            text("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
          ),
        ],
        cta: {
          show: true,
          link: {
            label: "Learn More",
            type: "internal",
            page: { url: "/services/example" } as Page,
          },
          variant: "secondary",
        },
        size: "full",
      },
      {
        id: "2",
        image: media("Tayrona 4.jpg"),
        heading: "Another Service",
        text: [
          plain(
            text(
              "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
            ),
          ),
        ],
        cta: {
          show: true,
          link: {
            label: "Learn More",
            type: "internal",
            page: { url: "/services/another-service" } as Page,
          },
          variant: "secondary",
        },
        size: "full",
      },
      {
        id: "3",
        image: media("CP4.jpg"),
        heading: "This is Interesting",
        text: [
          plain(
            text(
              "In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. ",
            ),
          ),
        ],
        cta: {
          show: true,
          link: {
            label: "Learn More",
            type: "internal",
            page: { url: "/services/interesting" } as Page,
          },
          variant: "secondary",
        },
        size: "full",
      },
      {
        id: "4",
        image: media("Minca 5.png"),
        heading: "This service",
        text: [
          plain(
            text(
              " Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero.",
            ),
          ),
        ],
        cta: {
          show: true,
          link: {
            label: "Learn More",
            type: "internal",
            page: { url: "/services/this" } as Page,
          },
          variant: "secondary",
        },
        size: "full",
      },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    ...Default.args,
    numberOfColumns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    ...Default.args,
    numberOfColumns: 4,
  },
};

export const WithDifferentSizes: Story = {
  args: {
    ...Default.args,
    items: [
      {
        ...Default.args.items[0],
        size: "small",
      },
      {
        ...Default.args.items[2],
        size: "full",
      },
      {
        ...Default.args.items[1],
        size: "medium",
      },
    ],
  },
};
