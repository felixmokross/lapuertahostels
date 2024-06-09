import type { Meta, StoryObj } from "@storybook/react";

import { ImageViewer } from "./image-viewer";

const meta = {
  title: "common/Image Viewer",
  component: ImageViewer,
  argTypes: {},
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: [
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
        alt: "",
        caption: "This is a caption",
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0337.jpg?updatedAt=1714162350065",
        alt: "",
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0360.jpg?updatedAt=1714162349855",
        alt: "",
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0334.jpg?updatedAt=1714162351642",
        alt: "",
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/15.jpg?updatedAt=1714162349358",
        alt: "",
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/16.jpg?updatedAt=1714162348090",
        alt: "",
      },
    ],
  },
};
