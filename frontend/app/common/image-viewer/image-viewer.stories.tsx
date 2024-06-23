import type { Meta, StoryObj } from "@storybook/react";

import { ImageViewer } from "./image-viewer";
import { allModes } from ".storybook/modes";

const meta = {
  title: "common/Image Viewer",
  component: ImageViewer,
  argTypes: {},
  parameters: {
    chromatic: {
      modes: {
        "locale-es": allModes["locale-es"],
        "locale-de": allModes["locale-de"],
        "locale-fr": allModes["locale-fr"],
      },
    },
  },
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
        aspectRatio: 1.5,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0337.jpg?updatedAt=1714162350065",
        alt: "",
        aspectRatio: 1.4234693878,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0360.jpg?updatedAt=1714162349855",
        alt: "",
        aspectRatio: 1.5,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0334.jpg?updatedAt=1714162351642",
        alt: "",
        aspectRatio: 1.4566326531,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/15.jpg?updatedAt=1714162349358",
        alt: "",
        aspectRatio: 0.5612244898,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/16.jpg?updatedAt=1714162348090",
        alt: "",
        aspectRatio: 1.7755102041,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
        alt: "Private balcony",
        aspectRatio: 1.4742990654,
      },
    ],
  },
};

export const SlotsFilledExactly: Story = {
  args: {
    images: [
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
        alt: "",
        caption: "This is a caption",
        aspectRatio: 1.5,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0337.jpg?updatedAt=1714162350065",
        alt: "",
        aspectRatio: 1.4234693878,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0360.jpg?updatedAt=1714162349855",
        alt: "",
        aspectRatio: 1.5,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0334.jpg?updatedAt=1714162351642",
        alt: "",
        aspectRatio: 1.4566326531,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/15.jpg?updatedAt=1714162349358",
        alt: "",
        aspectRatio: 0.5612244898,
      },
    ],
  },
};

export const LessSlotsFilled: Story = {
  args: {
    images: [
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
        alt: "",
        caption: "This is a caption",
        aspectRatio: 1.5,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0337.jpg?updatedAt=1714162350065",
        alt: "",
        aspectRatio: 1.4234693878,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0360.jpg?updatedAt=1714162349855",
        alt: "",
        aspectRatio: 1.5,
      },
      {
        src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0334.jpg?updatedAt=1714162351642",
        alt: "",
        aspectRatio: 1.4566326531,
      },
    ],
  },
};
