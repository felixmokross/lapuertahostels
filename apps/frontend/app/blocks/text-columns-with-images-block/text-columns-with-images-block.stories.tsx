import type { Meta, StoryObj } from "@storybook/react";

import { TextColumnsWithImagesBlock } from "./text-columns-with-images-block";
import {
  callToAction,
  media,
  plainText,
  richText,
} from "~/common/cms-data.builders";
import { createId } from "@paralleldrive/cuid2";
import { bold, paragraph, text } from "@lapuertahostels/shared";

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
    heading: plainText("Our Services"),
    text: richText(
      paragraph(
        text("Our services are designed to "),
        bold("make your life easier."),
      ),
    ),
    numberOfColumns: 3,
    items: [
      {
        id: createId(),
        image: media("_DSC0299.jpg"),
        heading: plainText("Example Heading"),
        text: richText(
          paragraph(
            text("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
          ),
        ),
        cta: callToAction("Learn More"),
        size: "full",
      },
      {
        id: createId(),
        image: media("Tayrona 4.jpg"),
        heading: plainText("Another Service"),
        text: richText(
          paragraph(
            text(
              "Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
            ),
          ),
        ),
        cta: callToAction("Learn More"),
        size: "full",
      },
      {
        id: createId(),
        image: media("CP4.jpg"),
        heading: plainText("This is Interesting"),
        text: richText(
          paragraph(
            text(
              "In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. ",
            ),
          ),
        ),
        cta: callToAction("Learn More"),
        size: "full",
      },
      {
        id: createId(),
        image: media("Minca 5.png"),
        heading: plainText("This service"),
        text: richText(
          paragraph(
            text(
              " Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero.",
            ),
          ),
        ),
        cta: callToAction("Learn More"),
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
        ...(Default.args?.items && Default.args.items[0]),
        size: "small",
      },
      {
        ...(Default.args?.items && Default.args.items[2]),
        size: "full",
      },
      {
        ...(Default.args?.items && Default.args.items[1]),
        size: "medium",
      },
    ],
  },
};

export const WithoutHeadingAndText: Story = {
  args: {
    ...Default.args,
    heading: undefined,
    text: undefined,
  },
};
