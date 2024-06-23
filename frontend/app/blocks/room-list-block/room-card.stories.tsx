import { allModes } from ".storybook/modes";
import { RoomCard } from "./room-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "blocks/Room List Block/Room Card",
  component: RoomCard,
  parameters: {
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
      },
    },
    layout: "centered",
  },
} satisfies Meta<typeof RoomCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Standard Room with Terrace",
    text: [
      {
        children: [
          {
            text: "Our standard room with terrace is perfect for those who want to enjoy the outdoors from the comfort of their own room. The room features a private terrace with a hammock and a view of the garden.",
          },
        ],
      },
    ],
    images: [
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0358.jpg?updatedAt=1714162350043",
          alt: "",
          aspectRatio: 1.5,
        },
        caption: "This is a caption",
      },
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0337.jpg?updatedAt=1714162350065",
          alt: "",
          aspectRatio: 1.4234693878,
        },
      },
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0360.jpg?updatedAt=1714162349855",
          alt: "",
          aspectRatio: 1.5,
        },
      },
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0334.jpg?updatedAt=1714162351642",
          alt: "",
          aspectRatio: 1.4566326531,
        },
      },
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/15.jpg?updatedAt=1714162349358",
          alt: "",
          aspectRatio: 0.5612244898,
        },
      },
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/16.jpg?updatedAt=1714162348090",
          alt: "",
          aspectRatio: 1.7755102041,
        },
      },
      {
        image: {
          url: "https://ik.imagekit.io/lapuertahostels/azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
          alt: "Private balcony",
          aspectRatio: 1.4742990654,
        },
      },
    ],
    ctaTemplate: {
      show: true,
      text: "Reserve Now",
    },
    ctaUrl: "/book",
  },
};
