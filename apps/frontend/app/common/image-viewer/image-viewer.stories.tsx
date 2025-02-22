import type { Meta, StoryObj } from "@storybook/react";

import { ImageViewer } from "./image-viewer";
import { allModes } from ".storybook/modes";

const meta = {
  title: "common/Image Viewer",
  component: ImageViewer,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
    chromatic: {
      modes: {
        "locale-es": allModes["locale-es"],
        "locale-de": allModes["locale-de"],
        "locale-fr": allModes["locale-fr"],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-[35rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: [
      {
        src: "/_DSC0358.jpg",
        alt: "",
        caption: "This is a caption",
        aspectRatio: 1.5,
      },
      {
        src: "/_DSC0337.jpg",
        alt: "",
        aspectRatio: 1.4234693878,
      },
      {
        src: "/_DSC0360.jpg",
        alt: "",
        aspectRatio: 1.5,
      },
      {
        src: "/_DSC0334.jpg",
        alt: "",
        aspectRatio: 1.4566326531,
      },
      {
        src: "/15.jpg",
        alt: "",
        aspectRatio: 0.5612244898,
      },
      {
        src: "/16.jpg",
        alt: "",
        aspectRatio: 1.7755102041,
      },
      {
        src: "/_dsc0989.jpg",
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
        src: "/_DSC0358.jpg",
        alt: "",
        caption: "This is a caption",
        aspectRatio: 1.5,
      },
      {
        src: "/_DSC0337.jpg",
        alt: "",
        aspectRatio: 1.4234693878,
      },
      {
        src: "/_DSC0360.jpg",
        alt: "",
        aspectRatio: 1.5,
      },
      {
        src: "/_DSC0334.jpg",
        alt: "",
        aspectRatio: 1.4566326531,
      },
      {
        src: "/15.jpg",
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
        src: "/_DSC0358.jpg",
        alt: "",
        caption: "This is a caption",
        aspectRatio: 1.5,
      },
      {
        src: "/_DSC0337.jpg",
        alt: "",
        aspectRatio: 1.4234693878,
      },
      {
        src: "/_DSC0360.jpg",
        alt: "",
        aspectRatio: 1.5,
      },
      {
        src: "/_DSC0334.jpg",
        alt: "",
        aspectRatio: 1.4566326531,
      },
    ],
  },
};
