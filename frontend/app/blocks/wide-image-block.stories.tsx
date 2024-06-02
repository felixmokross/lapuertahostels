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
    image: {
      url: "https://ik.imagekit.io/lapuertahostels/aqua/spaces/IMG_6303.jpg?updatedAt=1714161153434",
      alt: "Test",
    },
    overlayTextBox: {
      show: true,
      heading: "Feel at Home",
      text: [
        {
          children: [
            {
              text: "Experience ",
            },
            {
              text: "Colombian hospitality",
              bold: true,
            },
            {
              text: " in our boutique hostel's ",
            },
            {
              text: "inviting community areas",
              bold: true,
            },
            {
              text: ", perfect for ",
            },
            {
              text: "connecting ",
              bold: true,
            },
            {
              text: "and creating ",
            },
            {
              text: "unforgettable",
              bold: true,
            },
            {
              text: " memories.",
            },
          ],
        },
      ],
      cta: {
        show: true,
        text: "Discover More",
        url: "/discover",
        variant: "secondary",
      },
      position: "top-right",
    },
    id: "665cbd27ebb1f68ede783782",
    blockType: "WideImage",
  },
};

export const WithoutOverlayTextBox: Story = {
  args: {
    ...Default.args,
    overlayTextBox: undefined,
  },
};
