import { allModes } from ".storybook/modes";
import { RoomListBlock } from "./room-list-block";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "blocks/Room List Block",
  component: RoomListBlock,
  parameters: {
    chromatic: {
      modes: {
        "brand-aqua": allModes["brand-aqua"],
        "brand-azul": allModes["brand-azul"],
      },
    },
    // layout: "centered",
  },
} satisfies Meta<typeof RoomListBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    roomCards: [
      {
        title: "Standard Room with Terrace",
        description:
          "Our standard room with terrace is perfect for those who want to enjoy the outdoors from the comfort of their own room. The room features a private terrace with a hammock and a view of the garden.",
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
        ],
      },
      {
        title: "Deluxe King Room",
        description:
          "Our deluxe king room is perfect for those who want to enjoy a little extra luxury. The room features a king-size bed, a private balcony, and a view of the garden.",
        images: [
          {
            src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0334.jpg?updatedAt=1714162351642",
            alt: "",
          },
          {
            src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/16.jpg?updatedAt=1714162348090",
            alt: "",
          },
          {
            src: "https://ik.imagekit.io/lapuertahostels/azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
            alt: "Private balcony",
          },
        ],
      },
      {
        title: "Standard Room",
        description:
          "Our standard room is perfect for those who want to enjoy a comfortable stay. The room features a queen-size bed, a private bathroom, and a view of the garden.",
        images: [
          {
            src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/_DSC0334.jpg?updatedAt=1714162351642",
            alt: "",
          },
          {
            src: "https://ik.imagekit.io/lapuertahostels/azul/standard%20with%20terrace/16.jpg?updatedAt=1714162348090",
            alt: "",
          },
          {
            src: "https://ik.imagekit.io/lapuertahostels/azul/delux%20king%20room%20with%20terrace/_dsc0989.jpg?updatedAt=1714162269331",
            alt: "Private balcony",
          },
        ],
      },
    ],
  },
};
