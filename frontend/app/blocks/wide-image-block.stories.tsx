import type { Meta, StoryObj } from "@storybook/react";
import { WideImageBlock } from "./wide-image-block";

const meta = {
  title: "blocks/Wide Image Block",
  component: WideImageBlock,
} satisfies Meta<typeof WideImageBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "WideImage",
    image: {
      url: "https://ik.imagekit.io/lapuertahostels/azzedine-rouichi-gc5OYAll-rc-unsplash.jpg?updatedAt=170328441717",
      alt: "Example image",
    },
  },
};

export const WithOverlayTextBox: Story = {
  args: {
    ...Default.args,
    overlayTextBox: {
      show: true,
      heading: "Example Heading",
      text: [
        {
          children: [
            { text: "Example text with " },
            { text: "bold text", bold: true },
            { text: "." },
          ],
        },
      ],
      position: "top-right",
      cta: {
        show: true,
        text: "Example CTA",
        url: "/example",
      },
    },
  },
};
