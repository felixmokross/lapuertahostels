import {
  media,
  plainText,
  requiredCallToAction,
  richText,
} from "~/common/cms-data.builders";
import { RoomListBlock } from "./room-list-block";
import { Meta, StoryObj } from "@storybook/react";
import { paragraph, text } from "~/common/rich-text.builders";

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
        heading: plainText("Standard Room with Terrace"),
        text: richText(
          paragraph(
            text(
              "Our standard room with terrace is perfect for those who want to enjoy the outdoors from the comfort of their own room. The room features a private terrace with a hammock and a view of the garden.",
            ),
          ),
        ),
        images: [
          {
            image: media("_DSC0358.jpg"),
          },
          {
            image: media("_DSC0337.jpg"),
          },
          {
            image: media("_DSC0360.jpg"),
          },
          {
            image: media("_DSC0334.jpg"),
          },
        ],
        cta: requiredCallToAction("Reserve Now"),
      },
      {
        heading: plainText("Deluxe King Room"),
        text: richText(
          paragraph(
            text(
              "Our deluxe king room is perfect for those who want to enjoy a little extra luxury. The room features a king-size bed, a private balcony, and a view of the garden.",
            ),
          ),
        ),
        images: [
          {
            image: media("_DSC0334.jpg"),
          },
          {
            image: media("16.jpg"),
          },
          {
            image: media("_dsc0989.jpg"),
          },
        ],
        cta: requiredCallToAction("Reserve Now"),
      },
      {
        heading: plainText("Standard Room"),
        text: richText(
          paragraph(
            text(
              "Our standard room is perfect for those who want to enjoy a comfortable stay. The room features a queen-size bed, a private bathroom, and a view of the garden.",
            ),
          ),
        ),
        images: [
          {
            image: media("_DSC0334.jpg"),
          },
          {
            image: media("16.jpg"),
          },
          {
            image: media("_dsc0989.jpg"),
          },
        ],
        cta: requiredCallToAction("Reserve Now"),
      },
    ],
  },
};
