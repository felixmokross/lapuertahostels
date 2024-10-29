import { RoomListBlock } from "./room-list-block";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "blocks/Room List Block",
  component: RoomListBlock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RoomListBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blockType: "RoomList",
    rooms: [
      {
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
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
          {
            image: {
              id: "2",
              filename: "_DSC0337.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
          {
            image: {
              id: "3",
              filename: "_DSC0360.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
          {
            image: {
              id: "4",
              filename: "_DSC0334.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
        ],
        cta: {
          link: {
            label: "Reserve Now",
            type: "external",
            url: "http://example.com",
          },
        },
      },
      {
        heading: "Deluxe King Room",
        text: [
          {
            children: [
              {
                text: "Our deluxe king room is perfect for those who want to enjoy a little extra luxury. The room features a king-size bed, a private balcony, and a view of the garden.",
              },
            ],
          },
        ],
        images: [
          {
            image: {
              id: "1",
              filename: "_DSC0334.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
          {
            image: {
              id: "2",
              filename: "16.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
          {
            image: {
              id: "3",
              filename: "_dsc0989.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
        ],
        cta: {
          link: {
            label: "Reserve Now",
            type: "external",
            url: "http://example.com",
          },
        },
      },
      {
        heading: "Standard Room",
        text: [
          {
            children: [
              {
                text: "Our standard room is perfect for those who want to enjoy a comfortable stay. The room features a queen-size bed, a private bathroom, and a view of the garden.",
              },
            ],
          },
        ],
        images: [
          {
            image: {
              id: "1",
              filename: "_DSC0334.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
          {
            image: {
              id: "2",
              filename: "16.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
          {
            image: {
              id: "3",
              filename: "_dsc0989.jpg",
              createdAt: "2021-09-07T15:25:16.000Z",
              updatedAt: "2021-09-07T15:25:16.000Z",
            },
          },
        ],
        cta: {
          link: {
            label: "Reserve Now",
            type: "external",
            url: "http://example.com",
          },
        },
      },
    ],
  },
};
