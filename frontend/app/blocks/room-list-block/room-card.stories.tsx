import { RoomCard } from "./room-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "blocks/Room List Block/Room Card",
  component: RoomCard,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto my-36 flex flex-row flex-wrap justify-center gap-32">
        <Story />
      </div>
    ),
  ],
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
          id: "1",
          filename: "_DSC0358.jpg",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
        caption: "This is a caption",
      },
      {
        image: {
          id: "2",
          filename: "_DSC0337.jpg",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
      },
      {
        image: {
          id: "3",
          filename: "_DSC0360.jpg",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
      },
      {
        image: {
          id: "4",
          filename: "_DSC0334.jpg",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
      },
      {
        image: {
          id: "5",
          filename: "_DSC0325-12.jpg",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
      },
      {
        image: {
          id: "6",
          filename: "16.jpg",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
        },
      },
      {
        image: {
          id: "7",
          filename: "_dsc0989.jpg",
          createdAt: "2022-01-01T00:00:00Z",
          updatedAt: "2022-01-01T00:00:00Z",
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
