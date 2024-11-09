import { plain, text } from "~/common/rich-text.builders";
import { RoomCard } from "./room-card";
import { Meta, StoryObj } from "@storybook/react";
import {
  media,
  plainText,
  requiredCallToAction,
  richText,
} from "~/common/cms-data.builders";

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
    heading: plainText("Standard Room with Terrace"),
    text: richText(
      plain(
        text(
          "Our standard room with terrace is perfect for those who want to enjoy the outdoors from the comfort of their own room. The room features a private terrace with a hammock and a view of the garden.",
        ),
      ),
    ),
    images: [
      {
        image: media("_DSC0358.jpg"),
        caption: plainText("This is a caption"),
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
      {
        image: media("_DSC0325.jpg"),
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
};
